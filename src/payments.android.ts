import * as TnsApplication from 'tns-core-modules/application';
import { Failure } from './failure/failure';
import { Item } from './item/item';
import { Order } from './order/order';
import { EventContext, EventResult, _notify } from './payments.common';

// java
import ArrayList = java.util.ArrayList;
import List = java.util.List;
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
import SkuDetailsResult = com.android.billingclient.api.SkuDetails.SkuDetailsResult;
import BillingFlowParams = com.android.billingclient.api.BillingFlowParams;
import ConsumeResponseListener = com.android.billingclient.api.ConsumeResponseListener;

import PurchasesResult = com.android.billingclient.api.Purchase.PurchasesResult;
import { OrderState } from './order/order.common';


export * from './payments.common';

let _billingClient: BillingClient;

export function connect(): void {
    if ( !_billingClient ) {
        _notify(EventContext.CONNECTING_STORE, EventResult.STARTED, null);
        if ( TnsApplication.android && TnsApplication.android.context ) {
            _billingClient = new BillingClient.Builder(TnsApplication.android.context)
                .setListener(new PurchasesUpdatedListener({
                    onPurchasesUpdated(responseCode: number,
                                       purchases: List<Purchase>): void {
                        _purchaseHandler(responseCode, purchases);
                    },
                }))
                .build();
            _billingClient.startConnection(new BillingClientStateListener({
                onBillingSetupFinished(resultCode: number): void {
                    if ( resultCode === BillingResponse.OK ) {
                        // Handle transactions already in queue
                        const purchaseResult: PurchasesResult = _billingClient.queryPurchases(SkuType.INAPP); // TODO
                        _purchaseHandler(purchaseResult.getResponseCode(), purchaseResult.getPurchasesList());
                        _notify(EventContext.CONNECTING_STORE, EventResult.SUCCESS, null);
                    } else {
                        console.error(new Error('Connection failed with code: ' + resultCode));
                        _notify(EventContext.CONNECTING_STORE, EventResult.FAILURE, new Failure(resultCode));
                    }
                },
                onBillingServiceDisconnected(): void {
                    console.log('Billing Service disconnected.');
                    // .startConnection // TODO Handle retrying connection ?
                },
            }));
            _notify(EventContext.CONNECTING_STORE, EventResult.PENDING, null);
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
        _notify(EventContext.RETRIEVING_ITEMS, EventResult.STARTED, itemIds);
        const _skuList: ArrayList<string> = new ArrayList<string>();
        itemIds.forEach((value) => _skuList.add(value)); // TODO ?
        _billingClient.querySkuDetailsAsync(SkuType.INAPP, _skuList, new SkuDetailsResponseListener({
            onSkuDetailsResponse(result: SkuDetailsResult): void {
                const responseCode: number = result.getResponseCode();
                if ( responseCode === BillingResponse.OK ) {
                    const products: Array<Item> = [];
                    const skuDetailsList: List<SkuDetails> = result.getSkuDetailsList();
                    for ( let i = 0; i < skuDetailsList.size(); i++ ) {
                        products.push(new Item(skuDetailsList.get(i)));
                    }
                    _notify(EventContext.RETRIEVING_ITEMS, EventResult.SUCCESS, products);
                } else {
                    _notify(EventContext.RETRIEVING_ITEMS, EventResult.PENDING, new Failure(responseCode));
                }
            },
        }));
        _notify(EventContext.RETRIEVING_ITEMS, EventResult.PENDING, itemIds);
    } else {
        console.error(new Error('BillingClient missing.'));
    }
}

export function buyItem(item: Item,
                        userData?: string): void {
    if ( _billingClient ) {
        const pendingCount = _billingClient.queryPurchases(SkuType.INAPP).getPurchasesList().size(); // TODO inapp? safe?
        if ( !pendingCount ) {
            _notify(EventContext.PROCESSING_ORDER, EventResult.PENDING, pendingCount + 1); // TODO elsewhere ?
            const responseCode: number = _billingClient.launchBillingFlow(
                TnsApplication.android.foregroundActivity,
                new BillingFlowParams.Builder()
                    .setSku(item.itemId)
                    .setType(SkuType.INAPP)
                    .setAccountId(userData || null)
                    .build(),
            );
            if ( responseCode === BillingResponse.OK ) {
                _notify(EventContext.PROCESSING_ORDER, EventResult.STARTED, item);
            } else {
                _notify(EventContext.PROCESSING_ORDER, EventResult.FAILURE, new Failure(responseCode));
            }
        } else {
            _notify(EventContext.PROCESSING_ORDER, EventResult.PENDING, pendingCount);
        }
    } else {
        console.error(new Error('BillingClient missing.'));
    }
}

export function finalizeOrder(order: Order): void {
    if ( _billingClient ) {
        _notify(EventContext.FINALIZING_ORDER, EventResult.STARTED, order);
        if ( order.state === OrderState.VALID && !order.restored ) {
            _billingClient.consumeAsync(order.receiptToken, new ConsumeResponseListener({
                onConsumeResponse(purchaseToken: string,
                                  resultCode: number): void {
                    if ( resultCode === BillingResponse.OK ) {
                        _notify(EventContext.FINALIZING_ORDER, EventResult.SUCCESS, new Order(order));
                    } else {
                        _notify(EventContext.FINALIZING_ORDER, EventResult.FAILURE, new Failure(resultCode));
                    }
                    _notify(
                        EventContext.PROCESSING_ORDER,
                        EventResult.PENDING,
                        _billingClient.queryPurchases(SkuType.INAPP).getPurchasesList().size())
                    ; // TODO is it safe? elsewhere?
                },
            }));
            _notify(EventContext.FINALIZING_ORDER, EventResult.PENDING, order);
        } else {
            _notify(EventContext.FINALIZING_ORDER, EventResult.FAILURE, new Failure(8));
        }
    } else {
        console.error(new Error('BillingClient missing.'));
    }
}

export function restoreOrders(): void {
    if ( _billingClient ) {
        _notify(EventContext.RESTORING_ORDERS, EventResult.STARTED, null);
        _billingClient.queryPurchaseHistoryAsync(SkuType.INAPP, new PurchaseHistoryResponseListener({
            onPurchaseHistoryResponse(result: Purchase.PurchasesResult): void {
                const responseCode: number = result.getResponseCode();
                const purchases: List<Purchase> = result.getPurchasesList();
                if ( responseCode === BillingResponse.OK ) {
                    for ( let i = 0; i < purchases.size(); i++ ) {
                        _notify(EventContext.PROCESSING_ORDER, EventResult.SUCCESS, new Order(purchases.get(i), true));
                        _notify(EventContext.RESTORING_ORDERS, EventResult.PENDING, new Order(purchases.get(i), true));
                    }
                    _notify(EventContext.RESTORING_ORDERS, EventResult.SUCCESS, null);
                } else {
                    _notify(EventContext.RESTORING_ORDERS, EventResult.FAILURE, new Failure(responseCode));
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

function _purchaseHandler(responseCode: number,
                          purchases: List<Purchase>) {
    _notify(
        EventContext.PROCESSING_ORDER,
        EventResult.PENDING,
        _billingClient.queryPurchases(SkuType.INAPP).getPurchasesList().size(),
    );  // TODO is it safe? elsewhere?
    if ( responseCode === BillingResponse.OK ) {
        for ( let i = 0; i < purchases.size(); i++ ) {
            _notify(EventContext.PROCESSING_ORDER, EventResult.SUCCESS, new Order(purchases.get(i))); // TODO
        }
    } else {
        _notify(EventContext.PROCESSING_ORDER, EventResult.FAILURE, new Failure(responseCode));
    }
    _notify(
        EventContext.PROCESSING_ORDER,
        EventResult.PENDING,
        _billingClient.queryPurchases(SkuType.INAPP).getPurchasesList().size(),
    );  // TODO is it safe? elsewhere?
}
