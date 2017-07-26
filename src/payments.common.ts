import { Failure } from './failure/failure';
import { Item } from './item/item';
import { Order } from './order/order';

export type PaymentPayload = Failure | Item | Array<Item> | Order | Array<string> | number | null;

export type EventHandler = (eventResult: EventResult,
                            payload: PaymentPayload) => void;

const _observers: { [eventContext: string]: Array<EventHandler> } = {};

export enum EventResult {
    STARTED = 'STARTED',
    PENDING = 'PENDING',
    FAILURE = 'FAILURE',
    SUCCESS = 'SUCCESS',
}

export enum EventContext {
    CONNECTING_STORE = 'CONNECTING_STORE',
    RETRIEVING_ITEMS = 'RETRIEVING_ITEMS',
    PROCESSING_ORDER = 'PROCESSING_ORDER',
    FINALIZING_ORDER = 'FINALIZING_ORDER',
    RESTORING_ORDERS = 'RESTORING_ORDERS',
}

export function _notify(eventContext: EventContext,
                        eventResult: EventResult,
                        payload: PaymentPayload): void {
    if ( _observers[eventContext] ) {
        _observers[eventContext].forEach((callback) => {
            callback(eventResult, payload);
        });
    }
}

export function on(eventContext: EventContext,
                   handler: EventHandler): void {
    if ( !_observers[eventContext] ) {
        _observers[eventContext] = [];
    }
    _observers[eventContext].push(handler);
}

export function off(eventContext: EventContext,
                    handler?: EventHandler): void {
    if ( _observers[eventContext] ) {
        if ( handler ) {
            const index = _observers[eventContext].indexOf(handler);
            if ( index !== -1 ) {
                _observers[eventContext].splice(index, 1);
            }
        } else {
            delete _observers[eventContext];
        }
    }
}
