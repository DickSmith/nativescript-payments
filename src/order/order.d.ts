import { BaseOrder } from './order.common';
import Purchase = com.android.billingclient.api.Purchase;

export declare class Order extends BaseOrder {
    public readonly debug: string | null;

    constructor(
        nativeValue: Purchase | SKPaymentTransaction,
        restored?: boolean,
    );
}
