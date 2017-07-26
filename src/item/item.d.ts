import { BaseItem } from './item.common';
import SkuDetails = com.android.billingclient.api.SkuDetails;

export declare class Item extends BaseItem {
    constructor(nativeValue: SkuDetails | SKProduct);

    readonly debug: string;
}
