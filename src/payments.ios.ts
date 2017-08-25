import { Failure } from './failure/failure';
import { Item } from './item/item';
import { Order } from './order/order';
import { OrderState } from './order/order.common';
import { _notify, EventContext, EventResult } from './payments.common';

export * from './payments.common';

let _productRequest: SKProductsRequest | null;
let _productRequestDelegate: SKProductRequestDelegateImpl | null;
let _paymentTransactionObserver: SKPaymentTransactionObserverImpl | null;

export function connect(): void {
    if ( !_paymentTransactionObserver ) {
        _notify(EventContext.CONNECTING_STORE, EventResult.STARTED, null);
        /* tslint:disable: no-use-before-declare */
        _paymentTransactionObserver = new SKPaymentTransactionObserverImpl();
        /* tslint:enable: no-use-before-declare */
        // Handle transactions already in queue
        _transactionHandler(SKPaymentQueue.defaultQueue(), SKPaymentQueue.defaultQueue().transactions);
        _notify(EventContext.CONNECTING_STORE, EventResult.PENDING, null);
        SKPaymentQueue.defaultQueue().addTransactionObserver(_paymentTransactionObserver);
        _notify(EventContext.CONNECTING_STORE, EventResult.SUCCESS, null);
    }
}

export function disconnect(): void {
    if ( _paymentTransactionObserver ) {
        SKPaymentQueue.defaultQueue().removeTransactionObserver(_paymentTransactionObserver);
    }
    _paymentTransactionObserver = null;
}

export function fetchItems(itemIds: Array<string>): void {
    _notify(EventContext.RETRIEVING_ITEMS, EventResult.STARTED, itemIds);
    const productIds: NSMutableSet<string> = NSMutableSet.alloc<string>().init();
    itemIds.forEach((value: string) => productIds.addObject(value));
    _productRequest = SKProductsRequest.alloc().initWithProductIdentifiers(productIds);
    /* tslint:disable: no-use-before-declare */
    _productRequestDelegate = new SKProductRequestDelegateImpl();
    /* tslint:enable: no-use-before-declare */
    _productRequest.delegate = _productRequestDelegate;
    _productRequest.start();
    _notify(EventContext.RETRIEVING_ITEMS, EventResult.PENDING, itemIds);
}

export function buyItem(item: Item,
                        userData?: string): void {
    const pendingCount = SKPaymentQueue.defaultQueue().transactions.count;
    if ( !pendingCount ) {
        _notify(EventContext.PROCESSING_ORDER, EventResult.PENDING, pendingCount + 1);
        const payment = SKMutablePayment.paymentWithProduct(<SKProduct>item.nativeValue);
        if ( userData ) {
            payment.applicationUsername = userData;
        }
        SKPaymentQueue.defaultQueue().addPayment(payment);
        _notify(EventContext.PROCESSING_ORDER, EventResult.STARTED, item);
    } else {
        _notify(EventContext.PROCESSING_ORDER, EventResult.PENDING, pendingCount);
    }
}

export function finalizeOrder(order: Order): void {
    _notify(EventContext.FINALIZING_ORDER, EventResult.STARTED, order);
    if ( order.state === OrderState.VALID && !order.restored ) {
        SKPaymentQueue.defaultQueue().finishTransaction(<SKPaymentTransaction>order.nativeValue);
        _notify(EventContext.FINALIZING_ORDER, EventResult.PENDING, order);
    } else {
        _notify(EventContext.FINALIZING_ORDER, EventResult.FAILURE, new Failure(999));
    }
}

export function restoreOrders(): void {
    _notify(EventContext.RESTORING_ORDERS, EventResult.STARTED, null);
    SKPaymentQueue.defaultQueue().restoreCompletedTransactions();
}

export function canMakePayments(): boolean { // TODO ?
    return SKPaymentQueue.canMakePayments();
}

/* tslint:disable: max-classes-per-file */
class SKProductRequestDelegateImpl extends NSObject implements SKProductsRequestDelegate {
    /* tslint:disable: variable-name */
    public static ObjCProtocols = [SKProductsRequestDelegate];
    /* tslint:enable: variable-name */

    public productsRequestDidReceiveResponse(request: SKProductsRequest,
                                             response: SKProductsResponse) {
        const products: NSArray<SKProduct> = response.products;
        console.log('Invalid product identifiers: ' + JSON.stringify(
            response.invalidProductIdentifiers.componentsJoinedByString(', ')));
        const result: Array<Item> = [];
        for ( let i = 0; i < products.count; i++ ) {
            result.push(new Item(products.objectAtIndex(i)));
        }

        _notify(EventContext.RETRIEVING_ITEMS, EventResult.SUCCESS, result);
        this._cleanup();
    }

    public requestDidFailWithError(request: SKRequest,
                                   error: NSError) {
        _notify(EventContext.RETRIEVING_ITEMS, EventResult.FAILURE, new Failure(error.code));
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

    public paymentQueueUpdatedTransactions(queue: SKPaymentQueue,
                                           transactions: NSArray<SKPaymentTransaction>): void {
        _transactionHandler(queue, transactions);
    }

    public paymentQueueRestoreCompletedTransactionsFinished?(queue: SKPaymentQueue): void {
        _notify(EventContext.RESTORING_ORDERS, EventResult.SUCCESS, null);
    }

    public paymentQueueRestoreCompletedTransactionsFailedWithError?(queue: SKPaymentQueue,
                                                                    error: NSError): void {
        _notify(EventContext.RESTORING_ORDERS, EventResult.FAILURE, new Failure(error.code));
    }

    public paymentQueueRemovedTransactions?(queue: SKPaymentQueue,
                                            transactions: NSArray<SKPaymentTransaction>): void {
        for ( let i = 0; i < transactions.count; i++ ) {
            const transaction: SKPaymentTransaction = transactions.objectAtIndex(i);
            if ( transaction.transactionState === SKPaymentTransactionState.Purchased ) {
                _notify(EventContext.FINALIZING_ORDER, EventResult.SUCCESS, new Order(transaction));
            }
        }
        _notify(EventContext.PROCESSING_ORDER, EventResult.PENDING, queue.transactions.count);
    }
}

function _transactionHandler(queue: SKPaymentQueue,
                             transactions: NSArray<SKPaymentTransaction>): void {
    _notify(EventContext.PROCESSING_ORDER, EventResult.PENDING, queue.transactions.count);
    for ( let i = 0; i < transactions.count; i++ ) {
        const transaction: SKPaymentTransaction = transactions.objectAtIndex(i);

        switch ( transaction.transactionState ) {
            case SKPaymentTransactionState.Purchased:
                _notify(EventContext.PROCESSING_ORDER, EventResult.SUCCESS, new Order(transaction));
                break;
            case SKPaymentTransactionState.Failed:
                _notify(EventContext.PROCESSING_ORDER, EventResult.FAILURE, new Failure(transaction.error.code));
                queue.finishTransaction(transaction);
                break;
            case SKPaymentTransactionState.Restored:
                _notify(EventContext.PROCESSING_ORDER, EventResult.SUCCESS, new Order(transaction.originalTransaction, true));
                _notify(EventContext.RESTORING_ORDERS, EventResult.PENDING, new Order(transaction.originalTransaction, true));
                queue.finishTransaction(transaction);
                break;
            case SKPaymentTransactionState.Purchasing:
            case SKPaymentTransactionState.Deferred: // TODO ?
                break;
            default:
                console.error(new Error('Missing or unknown transaction state.'));
                break;
        }
    }
    _notify(EventContext.PROCESSING_ORDER, EventResult.PENDING, queue.transactions.count);
}
/* tslint:enable: max-classes-per-file */
