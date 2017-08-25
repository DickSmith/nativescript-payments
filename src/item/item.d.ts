import { BaseItem } from './item.common';
import SkuDetails = com.android.billingclient.api.SkuDetails;

export declare class Item extends BaseItem {
    public readonly debug: string | null;

    constructor(nativeValue: SkuDetails | SKProduct);
}
