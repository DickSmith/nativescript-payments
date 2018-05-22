/* tslint:disable */

declare module com {
  export module android {
    export module billingclient {
      export class BuildConfig {
        public static DEBUG: boolean;
        public static APPLICATION_ID: string;
        public static BUILD_TYPE: string;
        public static FLAVOR: string;
        public static VERSION_CODE: number;
        public static VERSION_NAME: string;

        public constructor();
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class BillingBroadcastManager {
        }

        export module BillingBroadcastManager {
          export class BillingBroadcastReceiver {
            public onReceive(context: Context, intent: Intent): void;

            public unRegister(param0: Context): void;

            public register(param0: Context, param1: IntentFilter): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export abstract class BillingClient {
          public isReady(): boolean;

          public queryPurchases(skuType: string): Purchase.PurchasesResult;

          public static newBuilder(context: Context): BillingClient.Builder;

          public startConnection(listener: BillingClientStateListener): void;

          public endConnection(): void;

          public constructor();

          public isFeatureSupported(feature: string): number;

          public querySkuDetailsAsync(params: SkuDetailsParams, listener: SkuDetailsResponseListener): void;

          public consumeAsync(purchaseToken: string, listener: ConsumeResponseListener): void;

          public launchBillingFlow(activity: Activity, params: BillingFlowParams): number;

          public queryPurchaseHistoryAsync(skuType: string, listener: PurchaseHistoryResponseListener): void;
        }

        export module BillingClient {
          export class BillingResponse {
            /**
             * Constructs a new instance of the com.android.billingclient.api.BillingClient$BillingResponse interface with the provided implementation.
             */
            public constructor(implementation: {});

            public static ITEM_UNAVAILABLE: number;
            public static ITEM_ALREADY_OWNED: number;
            public static USER_CANCELED: number;
            public static SERVICE_UNAVAILABLE: number;
            public static ERROR: number;
            public static OK: number;
            public static BILLING_UNAVAILABLE: number;
            public static FEATURE_NOT_SUPPORTED: number;
            public static SERVICE_DISCONNECTED: number;
            public static DEVELOPER_ERROR: number;
            public static ITEM_NOT_OWNED: number;
          }

          export class Builder {
            public build(): BillingClient;

            public setListener(listener: PurchasesUpdatedListener): BillingClient.Builder;
          }

          export class FeatureType {
            /**
             * Constructs a new instance of the com.android.billingclient.api.BillingClient$FeatureType interface with the provided implementation.
             */
            public constructor(implementation: {});

            public static SUBSCRIPTIONS_ON_VR: string;
            public static SUBSCRIPTIONS: string;
            public static IN_APP_ITEMS_ON_VR: string;
            public static SUBSCRIPTIONS_UPDATE: string;
          }

          export class SkuType {
            /**
             * Constructs a new instance of the com.android.billingclient.api.BillingClient$SkuType interface with the provided implementation.
             */
            public constructor(implementation: {});

            public static INAPP: string;
            public static SUBS: string;
          }
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class BillingClientImpl extends BillingClient {
          public isReady(): boolean;


          public queryPurchases(skuType: string): Purchase.PurchasesResult;

          public startConnection(listener: BillingClientStateListener): void;

          public endConnection(): void;

          public isFeatureSupported(feature: string): number;

          public querySkuDetailsAsync(params: SkuDetailsParams, listener: SkuDetailsResponseListener): void;

          public consumeAsync(purchaseToken: string, listener: ConsumeResponseListener): void;

          public launchBillingFlow(activity: Activity, params: BillingFlowParams): number;

          public queryPurchaseHistoryAsync(skuType: string, listener: PurchaseHistoryResponseListener): void;
        }

        export module BillingClientImpl {
          export class BillingServiceConnection {
            public onServiceConnected(param0: ComponentName, param1: IBinder): void;

            public onServiceDisconnected(param0: ComponentName): void;
          }

          export class ClientState {
            /**
             * Constructs a new instance of the BillingClientImpl$ClientState interface with the provided implementation.
             */
            public constructor(implementation: {});

            public static CONNECTED: number;
            public static DISCONNECTED: number;
            public static CLOSED: number;
            public static CONNECTING: number;
          }
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class BillingClientStateListener {
          /**
           * Constructs a new instance of the BillingClientStateListener interface with the provided implementation.
           */
          public constructor(implementation: {
            onBillingSetupFinished(resultCode: number): void; onBillingServiceDisconnected(): void;
          });

          public onBillingServiceDisconnected(): void;

          public onBillingSetupFinished(resultCode: number): void;
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class BillingFlowParams {
          public getVrPurchaseFlow(): boolean;

          public constructor();

          public getReplaceSkusProrationMode(): number;

          public getSku(): string;

          public getOldSku(): string;

          public getOldSkus(): ArrayList<string>;

          public getAccountId(): string;

          public static newBuilder(): BillingFlowParams.Builder;

          public hasExtraParams(): boolean;

          public getSkuType(): string;
        }

        export module BillingFlowParams {
          export class Builder {
            public setVrPurchaseFlow(isVrPurchaseFlow: boolean): BillingFlowParams.Builder;

            public setAccountId(accountId: string): BillingFlowParams.Builder;

            public setReplaceSkusProrationMode(replaceSkusProrationMode: number): BillingFlowParams.Builder;

            public build(): BillingFlowParams;

            public setOldSkus(oldSkus: ArrayList<string>): BillingFlowParams.Builder;

            public setType(type: string): BillingFlowParams.Builder;

            public addOldSku(oldSku: string): BillingFlowParams.Builder;

            public setSku(sku: string): BillingFlowParams.Builder;

            public setOldSku(oldSku: string): BillingFlowParams.Builder;
          }

          export class ProrationMode {
            /**
             * Constructs a new instance of the BillingFlowParams$ProrationMode interface with the provided implementation.
             */
            public constructor(implementation: {});

            public static IMMEDIATE_WITH_TIME_PRORATION: number;
            public static UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY: number;
            public static IMMEDIATE_AND_CHARGE_PRORATED_PRICE: number;
            public static IMMEDIATE_WITHOUT_PRORATION: number;
          }
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class ConsumeResponseListener {
          /**
           * Constructs a new instance of the ConsumeResponseListener interface with the provided implementation.
           */
          public constructor(implementation: {
            onConsumeResponse(responseCode: number, purchaseToken: string): void;
          });

          public onConsumeResponse(responseCode: number, purchaseToken: string): void;
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class LocalBroadcastManager {
          public static getInstance(param0: Context): LocalBroadcastManager;

          public unregisterReceiver(param0: BroadcastReceiver): void;

          public sendBroadcastSync(param0: Intent): void;

          public sendBroadcast(param0: Intent): boolean;

          public registerReceiver(param0: BroadcastReceiver, param1: IntentFilter): void;
        }

        export module LocalBroadcastManager {
          export class BroadcastRecord {
          }

          export class ReceiverRecord {
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class Purchase {
          public constructor(param0: string, param1: string);

          public getOrderId(): string;

          public toString(): string;

          public getSignature(): string;

          public equals(param0: java.lang.Object): boolean;

          public getPackageName(): string;

          public getPurchaseTime(): number;

          public getOriginalJson(): string;

          public getSku(): string;

          public isAutoRenewing(): boolean;

          public hashCode(): number;

          public getPurchaseToken(): string;
        }

        export module Purchase {
          export class PurchasesResult {
            public getResponseCode(): number;

            public getPurchasesList(): List<Purchase>;
          }
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class PurchaseHistoryResponseListener {
          /**
           * Constructs a new instance of the PurchaseHistoryResponseListener interface with the provided implementation.
           */
          public constructor(implementation: {
            onPurchaseHistoryResponse(responseCode: number, purchasesList: List<Purchase>): void;
          });

          public onPurchaseHistoryResponse(responseCode: number, purchasesList: List<Purchase>): void;
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class PurchasesUpdatedListener {
          /**
           * Constructs a new instance of the PurchasesUpdatedListener interface with the provided implementation.
           */
          public constructor(implementation: {
            onPurchasesUpdated(responseCode: number, purchases: List<Purchase>): void;
          });

          public onPurchasesUpdated(responseCode: number, purchases: List<Purchase>): void;
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class SkuDetails {
          public getTitle(): string;

          public getIntroductoryPriceCycles(): string;

          public constructor(param0: string);

          public equals(param0: java.lang.Object): boolean;

          public getIntroductoryPriceAmountMicros(): string;

          public getPriceCurrencyCode(): string;

          public toString(): string;

          public getSubscriptionPeriod(): string;

          public getIntroductoryPrice(): string;

          public getPriceAmountMicros(): number;

          public getSku(): string;

          public getIntroductoryPricePeriod(): string;

          public getType(): string;

          public getDescription(): string;

          public hashCode(): number;

          public getPrice(): string;

          public getFreeTrialPeriod(): string;
        }

        export module SkuDetails {
          export class SkuDetailsResult {
          }
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class SkuDetailsParams {
          public constructor();

          public getSkusList(): List;

          public static newBuilder(): com.android.billingclient.api.SkuDetailsParams.Builder;

          public getSkuType(): string;
        }

        export module SkuDetailsParams {
          export class Builder {
            public setType(param0: string): com.android.billingclient.api.SkuDetailsParams.Builder;

            public setSkusList(param0: List): com.android.billingclient.api.SkuDetailsParams.Builder;

            public build(): com.android.billingclient.api.SkuDetailsParams;
          }
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class SkuDetailsResponseListener {
          /**
           * Constructs a new instance of the SkuDetailsResponseListener interface with the provided implementation.
           */
          public constructor(implementation: {
            onSkuDetailsResponse(responseCode: number, skuDetailsList: List<SkuDetails>): void;
          });

          public onSkuDetailsResponse(responseCode: number, skuDetailsList: List<SkuDetails>): void;
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module util {
        export class BillingHelper {
          public static RESPONSE_CODE: string;
          public static RESPONSE_GET_SKU_DETAILS_LIST: string;
          public static RESPONSE_BUY_INTENT: string;
          public static RESPONSE_INAPP_ITEM_LIST: string;
          public static RESPONSE_INAPP_PURCHASE_DATA_LIST: string;
          public static RESPONSE_INAPP_SIGNATURE_LIST: string;
          public static INAPP_CONTINUATION_TOKEN: string;
          public static NUMBER_OF_CORES: number;

          public static getResponseCodeFromBundle(param0: Bundle, param1: string): number;

          public constructor();

          public static logVerbose(param0: string, param1: string): void;

          public static logWarn(param0: string, param1: string): void;

          public static getResponseCodeFromIntent(param0: Intent, param1: string): number;

          public static extractPurchases(param0: Bundle): List;
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class ProxyBillingActivity {
          public onActivityResult(param0: number, param1: number, param2: Intent): void;

          public constructor();

          public onCreate(param0: Bundle): void;
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module vending {
      export module billing {
        export class IInAppBillingService {
          /**
           * Constructs a new instance of the com.android.vending.billing.IInAppBillingService interface with the provided implementation.
           */
          public constructor(implementation: {
            isBillingSupported(param0: number, param1: string, param2: string): number; getSkuDetails(param0: number, param1: string, param2: string, param3: Bundle): Bundle; getBuyIntent(param0: number, param1: string, param2: string, param3: string, param4: string): Bundle; getPurchases(param0: number, param1: string, param2: string, param3: string): Bundle; consumePurchase(param0: number, param1: string, param2: string): number; stub(param0: number, param1: string, param2: string): number; getBuyIntentToReplaceSkus(param0: number, param1: string, param2: List, param3: string, param4: string, param5: string): Bundle; getBuyIntentExtraParams(param0: number, param1: string, param2: string, param3: string, param4: string, param5: Bundle): Bundle; getPurchaseHistory(param0: number, param1: string, param2: string, param3: string, param4: Bundle): Bundle; isBillingSupportedExtraParams(param0: number, param1: string, param2: string, param3: Bundle): number;
          });

          public getSkuDetails(param0: number, param1: string, param2: string, param3: Bundle): Bundle;

          public isBillingSupportedExtraParams(param0: number, param1: string, param2: string, param3: Bundle): number;

          public stub(param0: number, param1: string, param2: string): number;

          public getPurchases(param0: number, param1: string, param2: string, param3: string): Bundle;

          public consumePurchase(param0: number, param1: string, param2: string): number;

          public isBillingSupported(param0: number, param1: string, param2: string): number;

          public getBuyIntentExtraParams(param0: number, param1: string, param2: string, param3: string, param4: string, param5: Bundle): Bundle;

          public getBuyIntent(param0: number, param1: string, param2: string, param3: string, param4: string): Bundle;

          public getBuyIntentToReplaceSkus(param0: number, param1: string, param2: List, param3: string, param4: string, param5: string): Bundle;

          public getPurchaseHistory(param0: number, param1: string, param2: string, param3: string, param4: Bundle): Bundle;
        }

        export module IInAppBillingService {
          export abstract class Stub {
            public constructor();

            public getBuyIntentToReplaceSkus(param0: number, param1: string, param2: List, param3: string, param4: string, param5: string): Bundle;

            public getPurchases(param0: number, param1: string, param2: string, param3: string): Bundle;

            public getBuyIntentExtraParams(param0: number, param1: string, param2: string, param3: string, param4: string, param5: Bundle): Bundle;

            public getSkuDetails(param0: number, param1: string, param2: string, param3: Bundle): Bundle;

            public asBinder(): IBinder;

            public stub(param0: number, param1: string, param2: string): number;

            public consumePurchase(param0: number, param1: string, param2: string): number;

            public isBillingSupportedExtraParams(param0: number, param1: string, param2: string, param3: Bundle): number;

            public isBillingSupported(param0: number, param1: string, param2: string): number;

            public getBuyIntent(param0: number, param1: string, param2: string, param3: string, param4: string): Bundle;

            public static asInterface(param0: IBinder): com.android.vending.billing.IInAppBillingService;

            public getPurchaseHistory(param0: number, param1: string, param2: string, param3: string, param4: Bundle): Bundle;

            public onTransact(param0: number, param1: Parcel, param2: Parcel, param3: number): boolean;
          }

          export module Stub {
            export class Proxy {
              public getInterfaceDescriptor(): string;

              public asBinder(): IBinder;

              public consumePurchase(param0: number, param1: string, param2: string): number;

              public stub(param0: number, param1: string, param2: string): number;

              public getSkuDetails(param0: number, param1: string, param2: string, param3: Bundle): Bundle;

              public isBillingSupported(param0: number, param1: string, param2: string): number;

              public getPurchases(param0: number, param1: string, param2: string, param3: string): Bundle;

              public getBuyIntent(param0: number, param1: string, param2: string, param3: string, param4: string): Bundle;

              public isBillingSupportedExtraParams(param0: number, param1: string, param2: string, param3: Bundle): number;

              public getBuyIntentExtraParams(param0: number, param1: string, param2: string, param3: string, param4: string, param5: Bundle): Bundle;

              public getBuyIntentToReplaceSkus(param0: number, param1: string, param2: List, param3: string, param4: string, param5: string): Bundle;

              public getPurchaseHistory(param0: number, param1: string, param2: string, param3: string, param4: Bundle): Bundle;
            }
          }
        }
      }
    }
  }
}

