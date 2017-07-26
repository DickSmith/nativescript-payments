export abstract class BaseOrder {
    public nativeValue: any;
    public abstract readonly debug: string;

    public state: OrderState;
    public itemId: string;
    public orderId: string;
    public orderDate: Date;
    public receiptToken: string;
    public userData: string;
    public restored: boolean;
    /** Android only */
    public dataSignature: string;

    constructor(nativeValue: any,
                restored: boolean = false) {
        this.nativeValue = nativeValue;
        this.restored = restored;
    }
}

export enum OrderState {
    INVALID = 'INVALID',
    PROVISIONAL = 'PROVISIONAL',
    VALID = 'VALID',
}
