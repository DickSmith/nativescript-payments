import { BaseOrder } from './order.common';
declare type Purchase = com.android.billingclient.api.Purchase;

export { OrderState } from './order.common';

export declare class Order extends BaseOrder {
  public readonly debug: string | null;

  constructor(nativeValue: Purchase | SKPaymentTransaction, restored?: boolean);
}
