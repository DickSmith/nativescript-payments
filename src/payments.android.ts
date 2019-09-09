import * as TnsApplication from 'tns-core-modules/application';
import { Failure } from './failure';
import { Item } from './item';
import { Order, OrderState } from './order';
import { _payments$, EventContext, EventResult, PaymentEvent } from './payments.common';
// java
type List<T> = java.util.List<T>;
// android
type Context = android.content.Context;
// android billing
type Purchase = com.android.billingclient.api.Purchase;
type BillingClient = com.android.billingclient.api.BillingClient;
type SkuDetails = com.android.billingclient.api.SkuDetails;
type PurchasesResult = com.android.billingclient.api.Purchase.PurchasesResult;

export { EventContext, EventResult, IPaymentEvent, PaymentEvent, payments$ } from './payments.common';

let _billingClient: BillingClient | null;

export function init(): void {
  if (!_billingClient) {
    _payments$.next({
      context: PaymentEvent.Context.CONNECTING_STORE,
      result: PaymentEvent.Result.STARTED,
      payload: null,
    });
    if (TnsApplication.android && <Context>TnsApplication.android.context) {
      _billingClient = com.android.billingclient.api.BillingClient.newBuilder(TnsApplication.android.context)
        .setListener(
          new com.android.billingclient.api.PurchasesUpdatedListener({
            onPurchasesUpdated(responseCode: number, purchases: List<Purchase>): void {
              _purchaseHandler(responseCode, purchases);
            },
          }),
        )
        .build();
      _payments$.next({
        context: PaymentEvent.Context.CONNECTING_STORE,
        result: PaymentEvent.Result.PENDING,
        payload: null,
      });
      _billingClient.startConnection(
        new com.android.billingclient.api.BillingClientStateListener({
          onBillingSetupFinished(resultCode: number): void {
            if (_billingClient) {
              if (resultCode === com.android.billingclient.api.BillingClient.BillingResponse.OK) {
                // Handle transactions already in queue
                const purchaseResult: PurchasesResult = _billingClient.queryPurchases(
                  com.android.billingclient.api.BillingClient.SkuType.INAPP,
                ); // TODO
                _purchaseHandler(purchaseResult.getResponseCode(), purchaseResult.getPurchasesList());
                _payments$.next({
                  context: PaymentEvent.Context.CONNECTING_STORE,
                  result: PaymentEvent.Result.SUCCESS,
                  payload: null,
                });
              } else {
                console.error(new Error('Init failed with code: ' + resultCode));
                _payments$.next({
                  context: PaymentEvent.Context.CONNECTING_STORE,
                  result: PaymentEvent.Result.FAILURE,
                  payload: new Failure(resultCode),
                });
              }
            } else {
              console.error(new Error('BillingClient missing.'));
            }
          },
          onBillingServiceDisconnected(): void {
            console.log('Billing Service disconnected.');
            // .startConnection // TODO Handle retrying connection ?
          },
        }),
      );
    } else {
      console.error(new Error('Application context missing.'));
    }
  }
}

export function tearDown() {
  if (_billingClient) {
    _billingClient.endConnection();
  }
  _billingClient = null;
}

export function fetchItems(itemIds: Array<string>): void {
  if (_billingClient) {
    _payments$.next({
      context: PaymentEvent.Context.RETRIEVING_ITEMS,
      result: PaymentEvent.Result.STARTED,
      payload: itemIds,
    });
    const _skuList: List<string> = new java.util.ArrayList<string>();
    itemIds.forEach((value: string) => _skuList.add(value)); // TODO ?
    const params = com.android.billingclient.api.SkuDetailsParams.newBuilder();
    params.setSkusList(_skuList).setType(com.android.billingclient.api.BillingClient.SkuType.INAPP);
    _billingClient.querySkuDetailsAsync(
      params.build(),
      new com.android.billingclient.api.SkuDetailsResponseListener({
        onSkuDetailsResponse(responseCode: number, skuDetailsList: List<SkuDetails>): void {
          if (responseCode === com.android.billingclient.api.BillingClient.BillingResponse.OK) {
            const products: Array<Item> = [];
            for (let i = 0; i < skuDetailsList.size(); i++) {
              products.push(new Item(skuDetailsList.get(i)));
            }
            _payments$.next({
              context: PaymentEvent.Context.RETRIEVING_ITEMS,
              result: PaymentEvent.Result.SUCCESS,
              payload: products,
            });
          } else {
            _payments$.next({
              context: PaymentEvent.Context.RETRIEVING_ITEMS,
              result: PaymentEvent.Result.FAILURE,
              payload: new Failure(responseCode),
            });
          }
        },
      }),
    );
    _payments$.next({
      context: PaymentEvent.Context.RETRIEVING_ITEMS,
      result: PaymentEvent.Result.PENDING,
      payload: itemIds,
    });
  } else {
    console.error(new Error('BillingClient missing.'));
  }
}

export function buyItem(item: Item, userData?: string): void {
  if (_billingClient) {
    const pendingCount = _billingClient
      .queryPurchases(com.android.billingclient.api.BillingClient.SkuType.INAPP)
      .getPurchasesList()
      .size(); // TODO inapp? safe?
    if (!pendingCount) {
      _payments$.next({
        context: PaymentEvent.Context.PROCESSING_ORDER,
        result: PaymentEvent.Result.PENDING,
        payload: pendingCount + 1,
      }); // TODO elsewhere ?
      const paramsBuilder = com.android.billingclient.api.BillingFlowParams.newBuilder()
        .setSku(item.itemId)
        .setType(com.android.billingclient.api.BillingClient.SkuType.INAPP);
      if (userData) {
        paramsBuilder.setAccountId(userData);
      }
      const responseCode: number = _billingClient.launchBillingFlow(
        TnsApplication.android.foregroundActivity,
        paramsBuilder.build(),
      );
      if (responseCode === com.android.billingclient.api.BillingClient.BillingResponse.OK) {
        _payments$.next({
          context: PaymentEvent.Context.PROCESSING_ORDER,
          result: PaymentEvent.Result.STARTED,
          payload: item,
        });
      } else {
        _payments$.next({
          context: PaymentEvent.Context.PROCESSING_ORDER,
          result: PaymentEvent.Result.FAILURE,
          payload: new Failure(responseCode),
        });
      }
    } else {
      _payments$.next({
        context: PaymentEvent.Context.PROCESSING_ORDER,
        result: PaymentEvent.Result.PENDING,
        payload: pendingCount,
      });
    }
  } else {
    console.error(new Error('BillingClient missing.'));
  }
}

export function finalizeOrder(order: Order): void {
  if (_billingClient) {
    _payments$.next({
      context: PaymentEvent.Context.FINALIZING_ORDER,
      result: PaymentEvent.Result.STARTED,
      payload: order,
    });
    if (order.state === OrderState.VALID && !order.restored) {
      _billingClient.consumeAsync(
        order.receiptToken,
        new com.android.billingclient.api.ConsumeResponseListener({
          onConsumeResponse(responseCode: number, purchaseToken: string): void {
            if (_billingClient) {
              if (responseCode === com.android.billingclient.api.BillingClient.BillingResponse.OK) {
                _payments$.next({
                  context: PaymentEvent.Context.FINALIZING_ORDER,
                  result: PaymentEvent.Result.SUCCESS,
                  payload: new Order(order.nativeValue),
                });
              } else {
                _payments$.next({
                  context: PaymentEvent.Context.FINALIZING_ORDER,
                  result: PaymentEvent.Result.FAILURE,
                  payload: new Failure(responseCode),
                });
              }
              const pending: List<Purchase> = _billingClient
                .queryPurchases(com.android.billingclient.api.BillingClient.SkuType.INAPP)
                .getPurchasesList();
              _payments$.next({
                context: PaymentEvent.Context.PROCESSING_ORDER,
                result: PaymentEvent.Result.PENDING,
                payload: pending ? pending.size() : 0,
              });
            } else {
              console.error(new Error('BillingClient missing.'));
            }
          },
        }),
      );
      _payments$.next({
        context: PaymentEvent.Context.FINALIZING_ORDER,
        result: PaymentEvent.Result.PENDING,
        payload: order,
      });
    } else {
      _payments$.next({
        context: PaymentEvent.Context.FINALIZING_ORDER,
        result: PaymentEvent.Result.FAILURE,
        payload: new Failure(8),
      });
    }
  } else {
    console.error(new Error('BillingClient missing.'));
  }
}

export function restoreOrders(): void {
  if (_billingClient) {
    _payments$.next({
      context: PaymentEvent.Context.RESTORING_ORDERS,
      result: PaymentEvent.Result.STARTED,
      payload: null,
    });
    _billingClient.queryPurchaseHistoryAsync(
      com.android.billingclient.api.BillingClient.SkuType.INAPP,
      new com.android.billingclient.api.PurchaseHistoryResponseListener({
        onPurchaseHistoryResponse(responseCode: number, purchasesList: List<Purchase>): void {
          if (responseCode === com.android.billingclient.api.BillingClient.BillingResponse.OK) {
            for (let i = 0; i < purchasesList.size(); i++) {
              const purchase: Purchase = purchasesList.get(i);
              if (purchase) {
                _payments$.next({
                  context: PaymentEvent.Context.PROCESSING_ORDER,
                  result: PaymentEvent.Result.SUCCESS,
                  payload: new Order(purchase, true),
                });
                _payments$.next({
                  context: PaymentEvent.Context.RESTORING_ORDERS,
                  result: PaymentEvent.Result.PENDING,
                  payload: new Order(purchase, true),
                });
              }
            }
            _payments$.next({
              context: PaymentEvent.Context.RESTORING_ORDERS,
              result: PaymentEvent.Result.SUCCESS,
              payload: null,
            });
          } else {
            _payments$.next({
              context: PaymentEvent.Context.RESTORING_ORDERS,
              result: PaymentEvent.Result.FAILURE,
              payload: new Failure(responseCode),
            });
          }
        },
      }),
    );
  } else {
    console.error(new Error('BillingClient missing.'));
  }
}

export function canMakePayments(/*types*/): boolean {
  return true; // TODO isReady?
}

function _purchaseHandler(responseCode: number, purchases: List<Purchase>) {
  if (_billingClient) {
    let pending: List<Purchase>;
    pending = _billingClient
      .queryPurchases(com.android.billingclient.api.BillingClient.SkuType.INAPP)
      .getPurchasesList();
    _payments$.next({
      context: PaymentEvent.Context.PROCESSING_ORDER,
      result: PaymentEvent.Result.PENDING,
      payload: pending ? pending.size() : 0,
    });
    if (responseCode === com.android.billingclient.api.BillingClient.BillingResponse.OK) {
      if (purchases && purchases.size()) {
        for (let i = 0; i < purchases.size(); i++) {
          const purchase: Purchase = purchases.get(i);
          if (purchase) {
            _payments$.next({
              context: PaymentEvent.Context.PROCESSING_ORDER,
              result: PaymentEvent.Result.SUCCESS,
              payload: new Order(purchase),
            });
          }
        }
      }
    } else {
      _payments$.next({
        context: PaymentEvent.Context.PROCESSING_ORDER,
        result: PaymentEvent.Result.FAILURE,
        payload: new Failure(responseCode),
      });
    }
    pending = _billingClient
      .queryPurchases(com.android.billingclient.api.BillingClient.SkuType.INAPP)
      .getPurchasesList();
    _payments$.next({
      context: PaymentEvent.Context.PROCESSING_ORDER,
      result: PaymentEvent.Result.PENDING,
      payload: pending ? pending.size() : 0,
    });
  } else {
    console.error(new Error('BillingClient missing.'));
  }
}
