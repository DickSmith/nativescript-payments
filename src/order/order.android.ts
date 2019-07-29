import { BaseOrder, OrderState } from "./order.common";

type Purchase = com.android.billingclient.api.Purchase;

export { OrderState } from "./order.common";

export class Order extends BaseOrder {
  public nativeValue: Purchase;

  constructor(nativeValue: Purchase, restored: boolean = false) {
    super(nativeValue, restored);
    const jsonObject: any = JSON.parse(nativeValue.getOriginalJson());
    this.itemId = nativeValue.getSku();
    this.receiptToken = nativeValue.getPurchaseToken();
    this.dataSignature = nativeValue.getSignature();
    this.orderId = nativeValue.getOrderId();
    this.userData = jsonObject.developerPayload;
    this.isSubscription = jsonObject.autoRenewing;
    this.orderDate = new Date(nativeValue.getPurchaseTime());

    if (typeof jsonObject.purchaseState !== 'undefined') {
      switch (
        jsonObject.purchaseState // number or 'number'?
      ) {
        case 0: // Purchased
          this.state = OrderState.VALID;
          break;
        case 1: // Canceled
        case 2: // Refunded
        default:
          if (this.isSubscription) {
            // subscriptions can end up in weird state
            this.state = OrderState.VALID;
          } else {
            this.state = OrderState.INVALID;
          }
          break;
      }
    } else {
      // force it to be processed and consumed so it doesn't get stuck
      this.state = OrderState.VALID;
    }
  }

  get debug(): string {
    return this.nativeValue.getOriginalJson();
  }
}
