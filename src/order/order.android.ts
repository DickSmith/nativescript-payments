import { BaseOrder, OrderState } from './order.common';

type Purchase = com.android.billingclient.api.Purchase;

export { OrderState } from './order.common';

export class Order extends BaseOrder {
  public nativeValue: Purchase;

  constructor(nativeValue: Purchase, restored: boolean = false) {
    super(nativeValue, restored);

    const jsonObject: any = JSON.parse(nativeValue.getOriginalJson());
    switch (
      jsonObject.purchaseState // number or "number"?
    ) {
      case 0: // Purchased
        this.state = OrderState.VALID;
        break;
      case 1: // Canceled
      case 2: // Refunded
      default:
        this.state = OrderState.INVALID;
        break;
    }

    this.itemId = nativeValue.getSku();
    this.receiptToken = nativeValue.getPurchaseToken();
    this.dataSignature = nativeValue.getSignature();
    this.orderId = nativeValue.getOrderId();
    this.userData = jsonObject.developerPayload;
    this.orderDate = new Date(nativeValue.getPurchaseTime());
  }

  get debug(): string {
    return this.nativeValue.getOriginalJson();
  }
}
