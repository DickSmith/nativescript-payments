export abstract class BaseFailure {
    protected _type: FailureTypes;
    protected _description: string;
    protected _nativeCode: number;

    constructor(errorCode: number) {
        this._nativeCode = errorCode;
    }

    public get type(): FailureTypes {
        return this._type;
    }

    public get description(): string {
        return this._description;
    }

    public get nativeCode(): number {
        return this._nativeCode;
    }
}

export enum FailureTypes {
    PRODUCT_UNAVAILABLE = 'PRODUCT_UNAVAILABLE',
    DEVELOPER_USAGE = 'DEVELOPER_USAGE',
    PRODUCT_ALREADY_OWNED = 'PRODUCT_ALREADY_OWNED',
    PRODUCT_NOT_OWNED = 'PRODUCT_NOT_OWNED',
    USER_CANCELLED = 'USER_CANCELLED',
    NETWORK_AVAILABILITY = 'NETWORK_AVAILABILITY',
    BILLING_AVAILABILITY = 'BILLING_AVAILABILITY',
    UNSPECIFIED = 'UNSPECIFIED',
}

