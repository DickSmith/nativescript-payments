import { Failure } from './failure/failure';
import { Item } from './item/item';
import { Order } from './order/order';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export type EventPayload = Failure | Item | Order | Array<Item> | Array<string> | number | null;

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

export interface IPaymentEvent {
    context: EventContext;
    result: EventResult;
    payload: EventPayload;
}

export const _payments$: Subject<IPaymentEvent> = new Subject<IPaymentEvent>();
export const payments$: Observable<IPaymentEvent> = _payments$.asObservable();

// const _storeConnecting$: Subject<any> = new Subject<any>();
// const _itemsRetrieving$: Subject<any> = new Subject<any>();
// const _orderProcessing$: Subject<any> = new Subject<any>();
// const _orderFinalizing$: Subject<any> = new Subject<any>();
// const _ordersRestoring$: Subject<any> = new Subject<any>();
//
// export const storeConnecting$: Observable<any> = _storeConnecting$.asObservable();
// export const itemsRetrieving$: Observable<any> = _itemsRetrieving$.asObservable();
// export const orderProcessing$: Observable<any> = _orderProcessing$.asObservable();
// export const orderFinalizing$: Observable<any> = _orderFinalizing$.asObservable();
// export const ordersRestoring$: Observable<any> = _ordersRestoring$.asObservable();
