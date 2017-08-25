import {
    BaseOrder,
    OrderState,
} from './order.common';
import Purchase = com.android.billingclient.api.Purchase;

export class Order extends BaseOrder {
    public nativeValue: Purchase;

    constructor(
        nativeValue: Purchase,
        restored: boolean = false,
    ) {
        super(nativeValue, restored);
        switch ( nativeValue.getPurchaseState() ) {
            case Purchase.PurchaseState.PURCHASED:
                this.state = OrderState.VALID;
                break;

            case Purchase.PurchaseState.CANCELED:
            case Purchase.PurchaseState.REFUNDED:
            default:
                this.state = OrderState.INVALID;
                break;
        }

        this.itemId = nativeValue.getSku();
        this.receiptToken = nativeValue.getPurchaseToken();
        this.dataSignature = nativeValue.getSignature();
        this.orderId = nativeValue.getOrderId();
        this.userData = <string>(<any>JSON.parse(nativeValue.getOriginalJson())).developerPayload;
        this.orderDate = new Date(nativeValue.getPurchaseTime());
    }

    get debug(): string {
        return this.nativeValue.getOriginalJson();
    }
}
