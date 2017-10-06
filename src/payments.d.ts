import { Failure } from './failure/failure';
import { Item } from './item/item';
import { Order } from './order/order';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export declare type EventPayload = Failure | Item | Order | Array<Item> | Array<string> | number | null;

export declare enum EventResult {
    STARTED = 'STARTED',
    PENDING = 'PENDING',
    FAILURE = 'FAILURE',
    SUCCESS = 'SUCCESS',
}

export declare enum EventContext {
    CONNECTING_STORE = 'CONNECTING_STORE',
    RETRIEVING_ITEMS = 'RETRIEVING_ITEMS',
    PROCESSING_ORDER = 'PROCESSING_ORDER',
    FINALIZING_ORDER = 'FINALIZING_ORDER',
    RESTORING_ORDERS = 'RESTORING_ORDERS',
}

export interface IPaymentEvent {
    context: EventContext;
    result: EventResult;
    payload: EventPayload;
}

export declare const _payments$: Subject<IPaymentEvent>;
export declare const payments$: Observable<IPaymentEvent>;

export declare function connect(): void;

export declare function disconnect(): void;

export declare function fetchItems(itemIds: Array<string>): void;

export declare function buyItem(
    item: Item,
    userData?: string,
): void;

export declare function finalizeOrder(order: Order): void;

export declare function restoreOrders(): void;

export declare function canMakePayments(): boolean;

// TODO Manage subscriptions
// TODO map subscriptions (Android)
