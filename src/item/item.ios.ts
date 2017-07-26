import { BaseItem } from './item.common';

export class Item extends BaseItem {
    constructor(nativeValue: SKProduct) {
        super(nativeValue);

        const formatter = NSNumberFormatter.alloc().init();
        formatter.numberStyle = NSNumberFormatterStyle.CurrencyStyle;
        formatter.locale = nativeValue.priceLocale;

        this.itemId = nativeValue.productIdentifier;
        this.localizedDescription = nativeValue.localizedDescription;
        this.localizedTitle = nativeValue.localizedTitle;
        this.priceAmount = nativeValue.price.doubleValue;
        this.priceFormatted = formatter.stringFromNumber(nativeValue.price as any);
        this.priceCurrencyCode = nativeValue.priceLocale.objectForKey(NSLocaleCurrencyCode);
    }

    public get debug(): string {
        if ( this.nativeValue ) {
            const temp = {};
            for ( const i in this.nativeValue ) {
                if ( this.nativeValue[i] != null ) {
                    temp[i] = this.nativeValue[i];
                }
            }

            return JSON.stringify(temp);
        } else {
            return null;
        }
    }
}
