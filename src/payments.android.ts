import * as TnsApplication from 'tns-core-modules/application';
import { Failure } from './failure/failure';
import { Item } from './item/item';
import { Order } from './order/order';
import { OrderState } from './order/order.common';
import {
    _payments$,
    EventContext,
    EventResult,
} from './payments.common';
// java
import ArrayList = java.util.ArrayList;
import List = java.util.List;
// android
import Context = android.content.Context;
// android billing
import Purchase = com.android.billingclient.api.Purchase;
import BillingClient = com.android.billingclient.api.BillingClient;
import PurchasesUpdatedListener = com.android.billingclient.api.PurchasesUpdatedListener;
import BillingClientStateListener = com.android.billingclient.api.BillingClientStateListener;
import BillingResponse = com.android.billingclient.api.BillingClient.BillingResponse;
import SkuType = com.android.billingclient.api.BillingClient.SkuType;
import PurchaseHistoryResponseListener = com.android.billingclient.api.PurchaseHistoryResponseListener;
import SkuDetailsResponseListener = com.android.billingclient.api.SkuDetailsResponseListener;
import SkuDetails = com.android.billingclient.api.SkuDetails;
import BillingFlowParams = com.android.billingclient.api.BillingFlowParams;
import ConsumeResponseListener = com.android.billingclient.api.ConsumeResponseListener;
import PurchasesResult = com.android.billingclient.api.Purchase.PurchasesResult;
import SkuDetailsParams = com.android.billingclient.api.SkuDetailsParams;

export {
    EventContext,
    EventResult,
    EventPayload,
    IPaymentEvent,
    payments$,
} from './payments.common';

let _billingClient: BillingClient | null;

export function connect(): void {
    if ( !_billingClient ) {
        _payments$.next({
            context : EventContext.CONNECTING_STORE,
            result :  EventResult.STARTED,
            payload : null,
        });
        if ( TnsApplication.android && <Context>TnsApplication.android.context ) {
            _billingClient = BillingClient.newBuilder(TnsApplication.android.context)
                .setListener(new PurchasesUpdatedListener({
                    onPurchasesUpdated(
                        responseCode: number,
                        purchases: List<Purchase>,
                    ): void {
                        _purchaseHandler(responseCode, purchases);
                    },
                }))
                .build();
            _payments$.next({
                context : EventContext.CONNECTING_STORE,
                result :  EventResult.PENDING,
                payload : null,
            });
            _billingClient.startConnection(new BillingClientStateListener({
                onBillingSetupFinished(resultCode: number): void {
                    if ( _billingClient ) {
                        if ( resultCode === BillingResponse.OK ) {
                            // Handle transactions already in queue
                            const purchaseResult: PurchasesResult = _billingClient.queryPurchases(SkuType.INAPP); // TODO
                            _purchaseHandler(purchaseResult.getResponseCode(), purchaseResult.getPurchasesList());
                            _payments$.next({
                                context : EventContext.CONNECTING_STORE,
                                result :  EventResult.SUCCESS,
                                payload : null,
                            });
                        } else {
                            console.error(new Error('Connection failed with code: ' + resultCode));
                            _payments$.next({
                                context : EventContext.CONNECTING_STORE,
                                result :  EventResult.FAILURE,
                                payload : new Failure(resultCode),
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
            }));
        } else {
            console.error(new Error('Application context missing.'));
        }
    }
}

export function disconnect() {
    if ( _billingClient ) {
        _billingClient.endConnection();
    }
    _billingClient = null;
}

export function fetchItems(itemIds: Array<string>): void {
    if ( _billingClient ) {
        _payments$.next({
            context : EventContext.RETRIEVING_ITEMS,
            result :  EventResult.STARTED,
            payload : itemIds,
        });
        const _skuList: ArrayList<string> = new ArrayList<string>();
        itemIds.forEach((value: string) => _skuList.add(value)); // TODO ?
        const params: SkuDetailsParams.Builder = SkuDetailsParams.newBuilder();
        params.setSkusList(_skuList).setType(SkuType.INAPP);
        _billingClient.querySkuDetailsAsync(params.build(), new SkuDetailsResponseListener({
            onSkuDetailsResponse(responseCode: number, skuDetailsList: List<SkuDetails>): void {
                if ( responseCode === BillingResponse.OK ) {
                    const products: Array<Item> = [];
                    for ( let i = 0; i < skuDetailsList.size(); i++ ) {
                        products.push(new Item(skuDetailsList.get(i)));
                    }
                    _payments$.next({
                        context : EventContext.RETRIEVING_ITEMS,
                        result :  EventResult.SUCCESS,
                        payload : products,
                    });
                } else {
                    _payments$.next({
                        context : EventContext.RETRIEVING_ITEMS,
                        result :  EventResult.FAILURE,
                        payload : new Failure(responseCode),
                    });
                }
            },
        }));
        _payments$.next({
            context : EventContext.RETRIEVING_ITEMS,
            result :  EventResult.PENDING,
            payload : itemIds,
        });
    } else {
        console.error(new Error('BillingClient missing.'));
    }
}

export function buyItem(
    item: Item,
    userData?: string,
): void {
    if ( _billingClient ) {
        const pendingCount = _billingClient.queryPurchases(SkuType.INAPP).getPurchasesList().size(); // TODO inapp? safe?
        if ( !pendingCount ) {
            _payments$.next({
                context : EventContext.PROCESSING_ORDER,
                result :  EventResult.PENDING,
                payload : pendingCount + 1,
            }); // TODO elsewhere ?
            const paramsBuilder = BillingFlowParams.newBuilder()
                .setSku(item.itemId)
                .setType(SkuType.INAPP);
            if ( userData ) {
                paramsBuilder.setAccountId(userData);
            }
            const responseCode: number = _billingClient.launchBillingFlow(
                TnsApplication.android.foregroundActivity,
                paramsBuilder.build(),
            );
            if ( responseCode === BillingResponse.OK ) {
                _payments$.next({
                    context : EventContext.PROCESSING_ORDER,
                    result :  EventResult.STARTED,
                    payload : item,
                });
            } else {
                _payments$.next({
                    context : EventContext.PROCESSING_ORDER,
                    result :  EventResult.FAILURE,
                    payload : new Failure(responseCode),
                });
            }
        } else {
            _payments$.next({
                context : EventContext.PROCESSING_ORDER,
                result :  EventResult.PENDING,
                payload : pendingCount,
            });
        }
    } else {
        console.error(new Error('BillingClient missing.'));
    }
}

export function finalizeOrder(order: Order): void {
    if ( _billingClient ) {
        _payments$.next({
            context : EventContext.FINALIZING_ORDER,
            result :  EventResult.STARTED,
            payload : order,
        });
        if ( order.state === OrderState.VALID && !order.restored ) {
            _billingClient.consumeAsync(order.receiptToken, new ConsumeResponseListener({
                onConsumeResponse(
                    responseCode: number,
                    purchaseToken: string
                ): void {
                    if ( _billingClient ) {
                        if ( responseCode === BillingResponse.OK ) {
                            _payments$.next({
                                context : EventContext.FINALIZING_ORDER,
                                result :  EventResult.SUCCESS,
                                payload : new Order(order.nativeValue),
                            });
                        } else {
                            _payments$.next({
                                context : EventContext.FINALIZING_ORDER,
                                result :  EventResult.FAILURE,
                                payload : new Failure(responseCode),
                            });
                        }
                        const pending: List<Purchase> = _billingClient.queryPurchases(SkuType.INAPP).getPurchasesList();
                        _payments$.next({
                            context : EventContext.PROCESSING_ORDER,
                            result :  EventResult.PENDING,
                            payload : pending ? pending.size() : 0,
                        });
                    } else {
                        console.error(new Error('BillingClient missing.'));
                    }
                },
            }));
            _payments$.next({
                context : EventContext.FINALIZING_ORDER,
                result :  EventResult.PENDING,
                payload : order,
            });
        } else {
            _payments$.next({
                context : EventContext.FINALIZING_ORDER,
                result :  EventResult.FAILURE,
                payload : new Failure(8),
            });
        }
    } else {
        console.error(new Error('BillingClient missing.'));
    }
}

export function restoreOrders(): void {
    if ( _billingClient ) {
        _payments$.next({
            context : EventContext.RESTORING_ORDERS,
            result :  EventResult.STARTED,
            payload : null,
        });
        _billingClient.queryPurchaseHistoryAsync(SkuType.INAPP, new PurchaseHistoryResponseListener({
            onPurchaseHistoryResponse(responseCode: number, purchasesList: List<Purchase>): void {
                if ( responseCode === BillingResponse.OK ) {
                    for ( let i = 0; i < purchasesList.size(); i++ ) {
                        const purchase: Purchase = purchasesList.get(i);
                        if ( purchase ) {
                            _payments$.next({
                                context : EventContext.PROCESSING_ORDER,
                                result :  EventResult.SUCCESS,
                                payload : new Order(purchase, true),
                            });
                            _payments$.next({
                                context : EventContext.RESTORING_ORDERS,
                                result :  EventResult.PENDING,
                                payload : new Order(purchase, true),
                            });
                        }
                    }
                    _payments$.next({
                        context : EventContext.RESTORING_ORDERS,
                        result :  EventResult.SUCCESS,
                        payload : null,
                    });
                } else {
                    _payments$.next({
                        context : EventContext.RESTORING_ORDERS,
                        result :  EventResult.FAILURE,
                        payload : new Failure(responseCode),
                    });
                }
            },
        }));
    } else {
        console.error(new Error('BillingClient missing.'));
    }
}

export function canMakePayments(/*types*/): boolean {
    return true; // TODO isReady?
}

function _purchaseHandler(
    responseCode: number,
    purchases: List<Purchase>,
) {
    if ( _billingClient ) {
        let pending: List<Purchase>;
        pending = _billingClient.queryPurchases(SkuType.INAPP).getPurchasesList();
        _payments$.next({
            context : EventContext.PROCESSING_ORDER,
            result :  EventResult.PENDING,
            payload : pending ? pending.size() : 0,
        });
        if ( responseCode === BillingResponse.OK ) {
            for ( let i = 0; i < purchases.size(); i++ ) {
                const purchase: Purchase = purchases.get(i);
                if ( purchase ) {
                    _payments$.next({
                        context : EventContext.PROCESSING_ORDER,
                        result :  EventResult.SUCCESS,
                        payload : new Order(purchase),
                    });
                }
            }
        } else {
            _payments$.next({
                context : EventContext.PROCESSING_ORDER,
                result :  EventResult.FAILURE,
                payload : new Failure(responseCode),
            });
        }
        pending = _billingClient.queryPurchases(SkuType.INAPP).getPurchasesList();
        _payments$.next({
            context : EventContext.PROCESSING_ORDER,
            result :  EventResult.PENDING,
            payload : pending ? pending.size() : 0,
        });
    } else {
        console.error(new Error('BillingClient missing.'));
    }
}
