import { Item } from './item';
import { Order } from './order';

export {
  EventContext,
  EventResult,
  EventPayload,
  IPaymentEvent,
  payments$,
} from './payments.common';

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
