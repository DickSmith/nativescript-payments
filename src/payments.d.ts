import { Failure } from './failure/failure';
import { Item } from './item/item';
import { Order } from './order/order';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
/* tslint:disable: no-import-side-effect */
import 'rxjs/add/operator/publish';
/* tslint:enable: no-import-side-effect */

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

export declare const _payments$: ReplaySubject<IPaymentEvent>;
export declare const payments$: ConnectableObservable<IPaymentEvent>;

export declare function init(): void;

export declare function tearDown(): void;

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
