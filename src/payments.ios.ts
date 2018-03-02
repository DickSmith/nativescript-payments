import { Failure } from './failure';
import { Item } from './item';
import { Order } from './order';
import { OrderState } from './order/order.common';
import {
    _payments$,
    EventContext,
    EventResult,
} from './payments.common';

export {
    EventContext,
    EventResult,
    EventPayload,
    IPaymentEvent,
    payments$,
} from './payments.common';

let _productRequest: SKProductsRequest | null;
let _productRequestDelegate: SKProductRequestDelegateImpl | null;
let _paymentTransactionObserver: SKPaymentTransactionObserverImpl | null;

export function init(): void {
    if ( !_paymentTransactionObserver ) {
        _payments$.next({
            context : EventContext.CONNECTING_STORE,
            result :  EventResult.STARTED,
            payload : null,
        });
        /* tslint:disable: no-use-before-declare */
        _paymentTransactionObserver = new SKPaymentTransactionObserverImpl();
        /* tslint:enable: no-use-before-declare */
        _payments$.next({
            context : EventContext.CONNECTING_STORE,
            result :  EventResult.PENDING,
            payload : null,
        });
        try {
            SKPaymentQueue.defaultQueue().addTransactionObserver(_paymentTransactionObserver);
            _payments$.next({
                context : EventContext.CONNECTING_STORE,
                result :  EventResult.SUCCESS,
                payload : null,
            });
        } catch (e) {
            const errorPayload = typeof e === 'object' ? e.message : e;
            console.error(new Error(`Init failed: ${errorPayload}`));
            _payments$.next({
                context : EventContext.CONNECTING_STORE,
                result :  EventResult.FAILURE,
                payload : null,
            });
        }
    }
}

export function tearDown(): void {
    if ( _paymentTransactionObserver ) {
        SKPaymentQueue.defaultQueue().removeTransactionObserver(_paymentTransactionObserver);
    }
    _paymentTransactionObserver = null;
}

export function fetchItems(itemIds: Array<string>): void {
    _payments$.next({
        context : EventContext.RETRIEVING_ITEMS,
        result :  EventResult.STARTED,
        payload : itemIds,
    });
    const productIds: NSMutableSet<string> = NSMutableSet.alloc<string>().init();
    itemIds.forEach((value: string) => productIds.addObject(value));
    _productRequest = SKProductsRequest.alloc().initWithProductIdentifiers(productIds);
    /* tslint:disable: no-use-before-declare */
    _productRequestDelegate = new SKProductRequestDelegateImpl();
    /* tslint:enable: no-use-before-declare */
    _productRequest.delegate = _productRequestDelegate;
    _productRequest.start();
    _payments$.next({
        context : EventContext.RETRIEVING_ITEMS,
        result :  EventResult.PENDING,
        payload : itemIds,
    });
}

export function buyItem(
    item: Item,
    userData?: string,
): void {
    if (SKPaymentQueue.defaultQueue().transactions) {
        const pendingCount = SKPaymentQueue.defaultQueue().transactions.count;
        if ( !pendingCount ) {
            _payments$.next({
                context : EventContext.PROCESSING_ORDER,
                result :  EventResult.PENDING,
                payload : pendingCount + 1,
            });
            const payment = SKMutablePayment.paymentWithProduct(<SKProduct>item.nativeValue);
            if ( userData ) {
                payment.applicationUsername = userData;
            }
            try {
                SKPaymentQueue.defaultQueue().addPayment(payment);
                _payments$.next({
                    context : EventContext.PROCESSING_ORDER,
                    result :  EventResult.STARTED,
                    payload : item,
                });
            } catch (e) {
                const errorPayload = typeof e === 'object' ? e.message : e;
                console.error(new Error(`Error while adding payment: ${errorPayload}`));
                _payments$.next({
                    context : EventContext.PROCESSING_ORDER,
                    result :  EventResult.FAILURE,
                    payload : null,
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
        console.error(new Error('SKPaymentQueue.defaultQueue().transactions missing.'));
    }
}

export function finalizeOrder(order: Order): void {
    _payments$.next({
        context : EventContext.FINALIZING_ORDER,
        result :  EventResult.STARTED,
        payload : order,
    });
    if ( order.state === OrderState.VALID && !order.restored ) {
        try {
            SKPaymentQueue.defaultQueue().finishTransaction(<SKPaymentTransaction>order.nativeValue);
            _payments$.next({
                context : EventContext.FINALIZING_ORDER,
                result :  EventResult.PENDING,
                payload : order,
            });
        } catch (e) {
            const errorPayload = typeof e === 'object' ? e.message : e;
            console.error(new Error(`Error while finalizing order: ${errorPayload}`));
            _payments$.next({
                context : EventContext.FINALIZING_ORDER,
                result :  EventResult.FAILURE,
                payload : null,
            });
        }
    } else {
        _payments$.next({
            context : EventContext.FINALIZING_ORDER,
            result :  EventResult.FAILURE,
            payload : new Failure(999),
        });
    }
}

export function restoreOrders(): void {
    _payments$.next({
        context : EventContext.RESTORING_ORDERS,
        result :  EventResult.STARTED,
        payload : null,
    });
    try {
        SKPaymentQueue.defaultQueue().restoreCompletedTransactions();
    } catch (e) {
        const errorPayload = typeof e === 'object' ? e.message : e;
        console.error(new Error(`Error while restoring order: ${errorPayload}`));
        _payments$.next({
            context : EventContext.RESTORING_ORDERS,
            result :  EventResult.FAILURE,
            payload : null,
        });
    }
}

export function canMakePayments(): boolean { // TODO ?
    return SKPaymentQueue.canMakePayments();
}

/* tslint:disable: max-classes-per-file */
class SKProductRequestDelegateImpl extends NSObject implements SKProductsRequestDelegate {
    /* tslint:disable: variable-name */
    public static ObjCProtocols = [SKProductsRequestDelegate];

    /* tslint:enable: variable-name */

    public productsRequestDidReceiveResponse(
        request: SKProductsRequest,
        response: SKProductsResponse,
    ) {
        const products: NSArray<SKProduct> = response.products;
        console.log('Invalid product identifiers: ' + JSON.stringify(
            response.invalidProductIdentifiers.componentsJoinedByString(', ')));
        const result: Array<Item> = [];
        for ( let i = 0; i < products.count; i++ ) {
            result.push(new Item(products.objectAtIndex(i)));
        }

        _payments$.next({
            context : EventContext.RETRIEVING_ITEMS,
            result :  EventResult.SUCCESS,
            payload : result,
        });
        this._cleanup();
    }

    public requestDidFailWithError(
        request: SKRequest,
        error: NSError,
    ) {
        _payments$.next({
            context : EventContext.RETRIEVING_ITEMS,
            result :  EventResult.FAILURE,
            payload : new Failure(error.code),
        });
        this._cleanup();
    }

    private _cleanup() {
        _productRequestDelegate = null;
        _productRequest = null;
    }
}

class SKPaymentTransactionObserverImpl extends NSObject implements SKPaymentTransactionObserver {
    /* tslint:disable: variable-name */
    public static ObjCProtocols = [SKPaymentTransactionObserver];

    /* tslint:enable: variable-name */

    public paymentQueueUpdatedTransactions(
        queue: SKPaymentQueue,
        transactions: NSArray<SKPaymentTransaction>,
    ): void {
        _transactionHandler(queue, transactions);
    }

    public paymentQueueRestoreCompletedTransactionsFinished(queue: SKPaymentQueue): void {
        _payments$.next({
            context : EventContext.RESTORING_ORDERS,
            result :  EventResult.SUCCESS,
            payload : null,
        });
    }

    public paymentQueueRestoreCompletedTransactionsFailedWithError(
        queue: SKPaymentQueue,
        error: NSError,
    ): void {
        _payments$.next({
            context : EventContext.RESTORING_ORDERS,
            result :  EventResult.FAILURE,
            payload : new Failure(error.code),
        });
    }

    public paymentQueueRemovedTransactions(
        queue: SKPaymentQueue,
        transactions: NSArray<SKPaymentTransaction>,
    ): void {
        if (transactions && transactions.count) {
            for ( let i = 0; i < transactions.count; i++ ) {
                const transaction: SKPaymentTransaction = transactions.objectAtIndex(i);
                if ( transaction.transactionState === SKPaymentTransactionState.Purchased ) {
                    _payments$.next({
                        context : EventContext.FINALIZING_ORDER,
                        result :  EventResult.SUCCESS,
                        payload : new Order(transaction),
                    });
                }
            }
        }
        _payments$.next({
            context : EventContext.PROCESSING_ORDER,
            result :  EventResult.PENDING,
            payload : queue.transactions ? queue.transactions.count : 0,
        });
    }

    public paymentQueueShouldAddStorePaymentForProduct(
        queue: SKPaymentQueue,
        payment: SKPayment,
        product: SKProduct
    ): boolean {
        return true;
    }

    public paymentQueueUpdatedDownloads(
        queue: SKPaymentQueue,
        downloads: NSArray<SKDownload>
    ): void {
        console.log('paymentQueueUpdatedDownloads called. Not implemented.');
    }
}

function _transactionHandler(
    queue: SKPaymentQueue,
    transactions: NSArray<SKPaymentTransaction>,
): void {
    _payments$.next({
        context : EventContext.PROCESSING_ORDER,
        result :  EventResult.PENDING,
        payload : queue.transactions ? queue.transactions.count : 0,
    });
    if (transactions && transactions.count) {
        for ( let i = 0; i < transactions.count; i++ ) {
            const transaction: SKPaymentTransaction = transactions.objectAtIndex(i);

            switch ( transaction.transactionState ) {
                case SKPaymentTransactionState.Purchased:
                    _payments$.next({
                        context : EventContext.PROCESSING_ORDER,
                        result :  EventResult.SUCCESS,
                        payload : new Order(transaction),
                    });
                    break;
                case SKPaymentTransactionState.Failed:
                    _payments$.next({
                        context : EventContext.PROCESSING_ORDER,
                        result :  EventResult.FAILURE,
                        payload : new Failure(transaction.error.code),
                    });
                    try {
                        queue.finishTransaction(transaction);
                    } catch (e) {
                        const errorPayload = typeof e === 'object' ? e.message : e;
                        console.error(new Error(`Error while finalizing failed order: ${errorPayload}`));
                    }
                    break;
                case SKPaymentTransactionState.Restored:
                    _payments$.next({
                        context : EventContext.PROCESSING_ORDER,
                        result :  EventResult.SUCCESS,
                        payload : new Order(transaction.originalTransaction, true),
                    });
                    _payments$.next({
                        context : EventContext.RESTORING_ORDERS,
                        result :  EventResult.PENDING,
                        payload : new Order(transaction.originalTransaction, true),
                    });
                    try {
                        queue.finishTransaction(transaction);
                    } catch (e) {
                        const errorPayload = typeof e === 'object' ? e.message : e;
                        console.error(new Error(`Error while finalizing restored order: ${errorPayload}`));
                    }
                    break;
                case SKPaymentTransactionState.Purchasing:
                case SKPaymentTransactionState.Deferred: // TODO ?
                    break;
                default:
                    console.error(new Error('Missing or unknown transaction state.'));
                    break;
            }
        }
    }
    _payments$.next({
        context : EventContext.PROCESSING_ORDER,
        result :  EventResult.PENDING,
        payload : queue.transactions ? queue.transactions.count : 0,
    });
}

/* tslint:enable: max-classes-per-file */
