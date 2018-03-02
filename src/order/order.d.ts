import { BaseOrder } from './order.common';
export declare type Purchase = com.android.billingclient.api.Purchase;

export declare class Order extends BaseOrder {
    public readonly debug: string | null;

    constructor(
        nativeValue: Purchase | SKPaymentTransaction,
        restored?: boolean,
    );
}
