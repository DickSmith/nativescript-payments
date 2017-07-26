import { Failure } from './failure/failure';
import { Item } from './item/item';
import { Order } from './order/order';

export * from './payments.common';
export declare type PaymentPayload =
    Failure
    | Item
    | Array<Item>
    | Order
    | Array<string>
    | number
    | null;
export declare type EventHandler = (eventResult: EventResult,
                                    payload: PaymentPayload) => void;

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

export declare function _notify(eventContext: EventContext,
                                eventResult: EventResult,
                                payload: PaymentPayload): void;

export declare function on(eventContext: EventContext,
                           handler: EventHandler): void;

export declare function off(eventContext: EventContext,
                            handler?: EventHandler): void;

export declare function connect(): void;

export declare function disconnect(): void;

export declare function fetchItems(itemIds: Array<string>): void;

export declare function buyItem(item: Item,
                                userData?: string): void;

export declare function finalizeOrder(order: Order): void;

export declare function restoreOrders(): void;

export declare function canMakePayments(): boolean;

// TODO Manage subscriptions
// TODO map subscriptions (Android)
