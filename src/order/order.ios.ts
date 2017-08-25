import {
    BaseOrder,
    OrderState,
} from './order.common';

export class Order extends BaseOrder {
    public nativeValue: SKPaymentTransaction;

    constructor(
        nativeValue: SKPaymentTransaction,
        restored: boolean = false,
    ) {
        super(nativeValue, restored);

        switch ( nativeValue.transactionState ) {
            case SKPaymentTransactionState.Purchased:
                this.state = OrderState.VALID;
                break;

            case SKPaymentTransactionState.Deferred:
            case SKPaymentTransactionState.Purchasing:
            case SKPaymentTransactionState.Restored:
                this.state = OrderState.PROVISIONAL;
                break;

            case SKPaymentTransactionState.Failed:
            default:
                this.state = OrderState.INVALID;
                break;
        }

        this.itemId = nativeValue.payment.productIdentifier;
        this.orderId = nativeValue.transactionIdentifier;
        this.orderDate = nativeValue.transactionDate;
        this.receiptToken = nativeValue.transactionReceipt
                                       .base64EncodedStringWithOptions(NSDataBase64EncodingOptions.Encoding64CharacterLineLength);
        this.userData = nativeValue.payment.applicationUsername;

    }

    get debug(): string | null {
        if ( this.nativeValue ) {
            const temp: any = {};
            for ( const i in this.nativeValue ) {
                if ( (<any>this.nativeValue)[i] != null ) {
                    temp[i] = (<any>this.nativeValue)[i];
                }
            }

            return JSON.stringify(temp);
        } else {
            return null;
        }
    }
}
