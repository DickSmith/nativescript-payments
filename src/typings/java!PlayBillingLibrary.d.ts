/// <reference path="android-declarations.d.ts"/>

declare module com {
  export module android {
    export module billingclient {
      export class BuildConfig {
        public static class: java.lang.Class<com.android.billingclient.BuildConfig>;
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
          public static class: java.lang.Class<com.android.billingclient.api.BillingBroadcastManager>;
        }

        export module BillingBroadcastManager {
          export class BillingBroadcastReceiver {
            public static class: java.lang.Class<com.android.billingclient.api.BillingBroadcastManager.BillingBroadcastReceiver>;

            public onReceive(param0: globalAndroid.content.Context, param1: globalAndroid.content.Intent): void;

            public register(param0: globalAndroid.content.Context, param1: globalAndroid.content.IntentFilter): void;

            public unRegister(param0: globalAndroid.content.Context): void;
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
          public static class: java.lang.Class<com.android.billingclient.api.BillingClient>;

          public isReady(): boolean;

          public queryPurchases(param0: string): com.android.billingclient.api.Purchase.PurchasesResult;

          public endConnection(): void;

          public isFeatureSupported(param0: string): number;

          public querySkuDetailsAsync(param0: com.android.billingclient.api.SkuDetailsParams, param1: com.android.billingclient.api.SkuDetailsResponseListener): void;

          public consumeAsync(param0: string, param1: com.android.billingclient.api.ConsumeResponseListener): void;

          public queryPurchaseHistoryAsync(param0: string, param1: com.android.billingclient.api.PurchaseHistoryResponseListener): void;

          public static newBuilder(param0: globalAndroid.content.Context): com.android.billingclient.api.BillingClient.Builder;

          public setChildDirected(param0: number): void;

          public startConnection(param0: com.android.billingclient.api.BillingClientStateListener): void;

          public constructor();

          public launchBillingFlow(param0: globalAndroid.app.Activity, param1: com.android.billingclient.api.BillingFlowParams): number;

          public loadRewardedSku(param0: com.android.billingclient.api.RewardLoadParams, param1: com.android.billingclient.api.RewardResponseListener): void;

          public launchPriceChangeConfirmationFlow(param0: globalAndroid.app.Activity, param1: com.android.billingclient.api.PriceChangeFlowParams, param2: com.android.billingclient.api.PriceChangeConfirmationListener): void;
        }

        export module BillingClient {
          export class BillingResponse {
            public static class: java.lang.Class<com.android.billingclient.api.BillingClient.BillingResponse>;

            /**
             * Constructs a new instance of the com.android.billingclient.api.BillingClient$BillingResponse interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();

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
            public static class: java.lang.Class<com.android.billingclient.api.BillingClient.Builder>;

            public build(): com.android.billingclient.api.BillingClient;

            public setListener(param0: com.android.billingclient.api.PurchasesUpdatedListener): com.android.billingclient.api.BillingClient.Builder;
          }

          export class ChildDirected {
            public static class: java.lang.Class<com.android.billingclient.api.BillingClient.ChildDirected>;

            /**
             * Constructs a new instance of the com.android.billingclient.api.BillingClient$ChildDirected interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();

            public static UNSPECIFIED: number;
            public static CHILD_DIRECTED: number;
            public static NOT_CHILD_DIRECTED: number;
          }

          export class FeatureType {
            public static class: java.lang.Class<com.android.billingclient.api.BillingClient.FeatureType>;

            /**
             * Constructs a new instance of the com.android.billingclient.api.BillingClient$FeatureType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();

            public static SUBSCRIPTIONS_ON_VR: string;
            public static SUBSCRIPTIONS: string;
            public static IN_APP_ITEMS_ON_VR: string;
            public static SUBSCRIPTIONS_UPDATE: string;
            public static PRICE_CHANGE_CONFIRMATION: string;
          }

          export class SkuType {
            public static class: java.lang.Class<com.android.billingclient.api.BillingClient.SkuType>;

            /**
             * Constructs a new instance of the com.android.billingclient.api.BillingClient$SkuType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();

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
        export class BillingClientImpl extends com.android.billingclient.api.BillingClient {
          public static class: java.lang.Class<com.android.billingclient.api.BillingClientImpl>;

          public isReady(): boolean;

          public queryPurchases(param0: string): com.android.billingclient.api.Purchase.PurchasesResult;

          public setChildDirected(param0: number): void;

          public startConnection(param0: com.android.billingclient.api.BillingClientStateListener): void;

          public endConnection(): void;

          public isFeatureSupported(param0: string): number;

          public launchBillingFlow(param0: globalAndroid.app.Activity, param1: com.android.billingclient.api.BillingFlowParams): number;

          public querySkuDetailsAsync(param0: com.android.billingclient.api.SkuDetailsParams, param1: com.android.billingclient.api.SkuDetailsResponseListener): void;

          public consumeAsync(param0: string, param1: com.android.billingclient.api.ConsumeResponseListener): void;

          public loadRewardedSku(param0: com.android.billingclient.api.RewardLoadParams, param1: com.android.billingclient.api.RewardResponseListener): void;

          public launchPriceChangeConfirmationFlow(param0: globalAndroid.app.Activity, param1: com.android.billingclient.api.PriceChangeFlowParams, param2: com.android.billingclient.api.PriceChangeConfirmationListener): void;

          public queryPurchaseHistoryAsync(param0: string, param1: com.android.billingclient.api.PurchaseHistoryResponseListener): void;
        }

        export module BillingClientImpl {
          export class BillingServiceConnection {
            public static class: java.lang.Class<com.android.billingclient.api.BillingClientImpl.BillingServiceConnection>;

            public onServiceConnected(param0: globalAndroid.content.ComponentName, param1: globalAndroid.os.IBinder): void;

            public onServiceDisconnected(param0: globalAndroid.content.ComponentName): void;
          }

          export class ClientState {
            public static class: java.lang.Class<com.android.billingclient.api.BillingClientImpl.ClientState>;

            /**
             * Constructs a new instance of the com.android.billingclient.api.BillingClientImpl$ClientState interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();

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
          public static class: java.lang.Class<com.android.billingclient.api.BillingClientStateListener>;

          /**
           * Constructs a new instance of the com.android.billingclient.api.BillingClientStateListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onBillingSetupFinished(param0: number): void;
            onBillingServiceDisconnected(): void;
          });
          public constructor();

          public onBillingServiceDisconnected(): void;

          public onBillingSetupFinished(param0: number): void;
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
          public static class: java.lang.Class<com.android.billingclient.api.BillingFlowParams>;

          public getVrPurchaseFlow(): boolean;

          public constructor();

          public getSkuDetails(): com.android.billingclient.api.SkuDetails;

          public getReplaceSkusProrationMode(): number;

          public getSku(): string;

          public getOldSku(): string;

          public getAccountId(): string;

          public static newBuilder(): com.android.billingclient.api.BillingFlowParams.Builder;

          public getOldSkus(): java.util.ArrayList<string>;

          public hasExtraParams(): boolean;

          public getSkuType(): string;
        }

        export module BillingFlowParams {
          export class Builder {
            public static class: java.lang.Class<com.android.billingclient.api.BillingFlowParams.Builder>;

            public setVrPurchaseFlow(param0: boolean): com.android.billingclient.api.BillingFlowParams.Builder;

            public setOldSkus(param0: java.util.ArrayList<string>): com.android.billingclient.api.BillingFlowParams.Builder;

            public setSkuDetails(param0: com.android.billingclient.api.SkuDetails): com.android.billingclient.api.BillingFlowParams.Builder;

            public setAccountId(param0: string): com.android.billingclient.api.BillingFlowParams.Builder;

            public setReplaceSkusProrationMode(param0: number): com.android.billingclient.api.BillingFlowParams.Builder;

            public build(): com.android.billingclient.api.BillingFlowParams;

            public setType(param0: string): com.android.billingclient.api.BillingFlowParams.Builder;

            public addOldSku(param0: string): com.android.billingclient.api.BillingFlowParams.Builder;

            public setSku(param0: string): com.android.billingclient.api.BillingFlowParams.Builder;

            public setOldSku(param0: string): com.android.billingclient.api.BillingFlowParams.Builder;
          }

          export class ProrationMode {
            public static class: java.lang.Class<com.android.billingclient.api.BillingFlowParams.ProrationMode>;

            /**
             * Constructs a new instance of the com.android.billingclient.api.BillingFlowParams$ProrationMode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();

            public static IMMEDIATE_WITH_TIME_PRORATION: number;
            public static DEFERRED: number;
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
          public static class: java.lang.Class<com.android.billingclient.api.ConsumeResponseListener>;

          /**
           * Constructs a new instance of the com.android.billingclient.api.ConsumeResponseListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onConsumeResponse(param0: number, param1: string): void;
          });
          public constructor();

          public onConsumeResponse(param0: number, param1: string): void;
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class PriceChangeConfirmationListener {
          public static class: java.lang.Class<com.android.billingclient.api.PriceChangeConfirmationListener>;

          /**
           * Constructs a new instance of the com.android.billingclient.api.PriceChangeConfirmationListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onPriceChangeConfirmationResult(param0: number): void;
          });
          public constructor();

          public onPriceChangeConfirmationResult(param0: number): void;
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class PriceChangeFlowParams {
          public static class: java.lang.Class<com.android.billingclient.api.PriceChangeFlowParams>;

          public constructor();

          public getSkuDetails(): com.android.billingclient.api.SkuDetails;

          public static newBuilder(): com.android.billingclient.api.PriceChangeFlowParams.Builder;
        }

        export module PriceChangeFlowParams {
          export class Builder {
            public static class: java.lang.Class<com.android.billingclient.api.PriceChangeFlowParams.Builder>;

            public build(): com.android.billingclient.api.PriceChangeFlowParams;

            public constructor();

            public setSkuDetails(param0: com.android.billingclient.api.SkuDetails): com.android.billingclient.api.PriceChangeFlowParams.Builder;
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
        export class ProxyBillingActivity {
          public static class: java.lang.Class<com.android.billingclient.api.ProxyBillingActivity>;

          public onActivityResult(param0: number, param1: number, param2: globalAndroid.content.Intent): void;

          public onCreate(param0: globalAndroid.os.Bundle): void;

          public constructor();
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
          public static class: java.lang.Class<com.android.billingclient.api.Purchase>;

          public constructor(param0: string, param1: string);

          public getOrderId(): string;

          public equals(param0: any): boolean;

          public toString(): string;

          public getSignature(): string;

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
            public static class: java.lang.Class<com.android.billingclient.api.Purchase.PurchasesResult>;

            public getResponseCode(): number;

            public getPurchasesList(): java.util.List<com.android.billingclient.api.Purchase>;
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
          public static class: java.lang.Class<com.android.billingclient.api.PurchaseHistoryResponseListener>;

          /**
           * Constructs a new instance of the com.android.billingclient.api.PurchaseHistoryResponseListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onPurchaseHistoryResponse(param0: number, param1: java.util.List<com.android.billingclient.api.Purchase>): void;
          });
          public constructor();

          public onPurchaseHistoryResponse(param0: number, param1: java.util.List<com.android.billingclient.api.Purchase>): void;
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
          public static class: java.lang.Class<com.android.billingclient.api.PurchasesUpdatedListener>;

          /**
           * Constructs a new instance of the com.android.billingclient.api.PurchasesUpdatedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onPurchasesUpdated(param0: number, param1: java.util.List<com.android.billingclient.api.Purchase>): void;
          });
          public constructor();

          public onPurchasesUpdated(param0: number, param1: java.util.List<com.android.billingclient.api.Purchase>): void;
        }
      }
    }
  }
}

declare module com {
  export module android {
    export module billingclient {
      export module api {
        export class RewardLoadParams {
          public static class: java.lang.Class<com.android.billingclient.api.RewardLoadParams>;

          public constructor();

          public getSkuDetails(): com.android.billingclient.api.SkuDetails;

          public static newBuilder(): com.android.billingclient.api.RewardLoadParams.Builder;
        }

        export module RewardLoadParams {
          export class Builder {
            public static class: java.lang.Class<com.android.billingclient.api.RewardLoadParams.Builder>;

            public constructor();

            public setSkuDetails(param0: com.android.billingclient.api.SkuDetails): com.android.billingclient.api.RewardLoadParams.Builder;

            public build(): com.android.billingclient.api.RewardLoadParams;
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
        export class RewardResponseListener {
          public static class: java.lang.Class<com.android.billingclient.api.RewardResponseListener>;

          /**
           * Constructs a new instance of the com.android.billingclient.api.RewardResponseListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onRewardResponse(param0: number): void;
          });
          public constructor();

          public onRewardResponse(param0: number): void;
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
          public static class: java.lang.Class<com.android.billingclient.api.SkuDetails>;

          public getTitle(): string;

          public getIntroductoryPriceCycles(): string;

          public isRewarded(): boolean;

          public constructor(param0: string);

          public getIntroductoryPriceAmountMicros(): string;

          public getPriceCurrencyCode(): string;

          public equals(param0: any): boolean;

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
            public static class: java.lang.Class<com.android.billingclient.api.SkuDetails.SkuDetailsResult>;
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
          public static class: java.lang.Class<com.android.billingclient.api.SkuDetailsParams>;

          public getSkusList(): java.util.List<string>;

          public constructor();

          public static newBuilder(): com.android.billingclient.api.SkuDetailsParams.Builder;

          public getSkuType(): string;
        }

        export module SkuDetailsParams {
          export class Builder {
            public static class: java.lang.Class<com.android.billingclient.api.SkuDetailsParams.Builder>;

            public setType(param0: string): com.android.billingclient.api.SkuDetailsParams.Builder;

            public setSkusList(param0: java.util.List<string>): com.android.billingclient.api.SkuDetailsParams.Builder;

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
          public static class: java.lang.Class<com.android.billingclient.api.SkuDetailsResponseListener>;

          /**
           * Constructs a new instance of the com.android.billingclient.api.SkuDetailsResponseListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onSkuDetailsResponse(param0: number, param1: java.util.List<com.android.billingclient.api.SkuDetails>): void;
          });
          public constructor();

          public onSkuDetailsResponse(param0: number, param1: java.util.List<com.android.billingclient.api.SkuDetails>): void;
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
          public static class: java.lang.Class<com.android.billingclient.util.BillingHelper>;
          public static RESPONSE_CODE: string;
          public static RESPONSE_GET_SKU_DETAILS_LIST: string;
          public static RESPONSE_BUY_INTENT_KEY: string;
          public static RESPONSE_SUBS_MANAGEMENT_INTENT_KEY: string;
          public static RESPONSE_INAPP_ITEM_LIST: string;
          public static RESPONSE_INAPP_PURCHASE_DATA_LIST: string;
          public static RESPONSE_INAPP_SIGNATURE_LIST: string;
          public static INAPP_CONTINUATION_TOKEN: string;
          public static LIBRARY_VERSION_KEY: string;
          public static EXTRA_PARAM_KEY_SUBS_PRICE_CHANGE: string;
          public static NUMBER_OF_CORES: number;

          public static getResponseCodeFromBundle(param0: globalAndroid.os.Bundle, param1: string): number;

          public constructor();

          public static logVerbose(param0: string, param1: string): void;

          public static getResponseCodeFromIntent(param0: globalAndroid.content.Intent, param1: string): number;

          public static logWarn(param0: string, param1: string): void;

          public static extractPurchases(param0: globalAndroid.os.Bundle): java.util.List<com.android.billingclient.api.Purchase>;
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
          public static class: java.lang.Class<com.android.vending.billing.IInAppBillingService>;

          /**
           * Constructs a new instance of the com.android.vending.billing.IInAppBillingService interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            isBillingSupported(param0: number, param1: string, param2: string): number;
            getSkuDetails(param0: number, param1: string, param2: string, param3: globalAndroid.os.Bundle): globalAndroid.os.Bundle;
            getBuyIntent(param0: number, param1: string, param2: string, param3: string, param4: string): globalAndroid.os.Bundle;
            getPurchases(param0: number, param1: string, param2: string, param3: string): globalAndroid.os.Bundle;
            consumePurchase(param0: number, param1: string, param2: string): number;
            stub(param0: number, param1: string, param2: string): number;
            getBuyIntentToReplaceSkus(param0: number, param1: string, param2: java.util.List<string>, param3: string, param4: string, param5: string): globalAndroid.os.Bundle;
            getBuyIntentExtraParams(param0: number, param1: string, param2: string, param3: string, param4: string, param5: globalAndroid.os.Bundle): globalAndroid.os.Bundle;
            getPurchaseHistory(param0: number, param1: string, param2: string, param3: string, param4: globalAndroid.os.Bundle): globalAndroid.os.Bundle;
            isBillingSupportedExtraParams(param0: number, param1: string, param2: string, param3: globalAndroid.os.Bundle): number;
            getSubscriptionManagementIntent(param0: number, param1: string, param2: string, param3: string, param4: globalAndroid.os.Bundle): globalAndroid.os.Bundle;
          });
          public constructor();

          public getPurchases(param0: number, param1: string, param2: string, param3: string): globalAndroid.os.Bundle;

          public getSkuDetails(param0: number, param1: string, param2: string, param3: globalAndroid.os.Bundle): globalAndroid.os.Bundle;

          public getPurchaseHistory(param0: number, param1: string, param2: string, param3: string, param4: globalAndroid.os.Bundle): globalAndroid.os.Bundle;

          public getBuyIntentToReplaceSkus(param0: number, param1: string, param2: java.util.List<string>, param3: string, param4: string, param5: string): globalAndroid.os.Bundle;

          public getSubscriptionManagementIntent(param0: number, param1: string, param2: string, param3: string, param4: globalAndroid.os.Bundle): globalAndroid.os.Bundle;

          public stub(param0: number, param1: string, param2: string): number;

          public consumePurchase(param0: number, param1: string, param2: string): number;

          public isBillingSupportedExtraParams(param0: number, param1: string, param2: string, param3: globalAndroid.os.Bundle): number;

          public isBillingSupported(param0: number, param1: string, param2: string): number;

          public getBuyIntentExtraParams(param0: number, param1: string, param2: string, param3: string, param4: string, param5: globalAndroid.os.Bundle): globalAndroid.os.Bundle;

          public getBuyIntent(param0: number, param1: string, param2: string, param3: string, param4: string): globalAndroid.os.Bundle;
        }

        export module IInAppBillingService {
          export abstract class Stub implements com.android.vending.billing.IInAppBillingService {
            public static class: java.lang.Class<com.android.vending.billing.IInAppBillingService.Stub>;

            public constructor();

            public getBuyIntentExtraParams(param0: number, param1: string, param2: string, param3: string, param4: string, param5: globalAndroid.os.Bundle): globalAndroid.os.Bundle;

            public getBuyIntentToReplaceSkus(param0: number, param1: string, param2: java.util.List<string>, param3: string, param4: string, param5: string): globalAndroid.os.Bundle;

            public getPurchaseHistory(param0: number, param1: string, param2: string, param3: string, param4: globalAndroid.os.Bundle): globalAndroid.os.Bundle;

            public getSubscriptionManagementIntent(param0: number, param1: string, param2: string, param3: string, param4: globalAndroid.os.Bundle): globalAndroid.os.Bundle;

            public getPurchases(param0: number, param1: string, param2: string, param3: string): globalAndroid.os.Bundle;

            public getSkuDetails(param0: number, param1: string, param2: string, param3: globalAndroid.os.Bundle): globalAndroid.os.Bundle;

            public static asInterface(param0: globalAndroid.os.IBinder): com.android.vending.billing.IInAppBillingService;

            public stub(param0: number, param1: string, param2: string): number;

            public consumePurchase(param0: number, param1: string, param2: string): number;

            public isBillingSupported(param0: number, param1: string, param2: string): number;

            public onTransact(param0: number, param1: globalAndroid.os.Parcel, param2: globalAndroid.os.Parcel, param3: number): boolean;

            public getBuyIntent(param0: number, param1: string, param2: string, param3: string, param4: string): globalAndroid.os.Bundle;

            public asBinder(): globalAndroid.os.IBinder;

            public isBillingSupportedExtraParams(param0: number, param1: string, param2: string, param3: globalAndroid.os.Bundle): number;
          }

          export module Stub {
            export class Proxy extends com.android.vending.billing.IInAppBillingService {
              public static class: java.lang.Class<com.android.vending.billing.IInAppBillingService.Stub.Proxy>;

              public getBuyIntentToReplaceSkus(param0: number, param1: string, param2: java.util.List<string>, param3: string, param4: string, param5: string): globalAndroid.os.Bundle;

              public consumePurchase(param0: number, param1: string, param2: string): number;

              public stub(param0: number, param1: string, param2: string): number;

              public getSubscriptionManagementIntent(param0: number, param1: string, param2: string, param3: string, param4: globalAndroid.os.Bundle): globalAndroid.os.Bundle;

              public getBuyIntentExtraParams(param0: number, param1: string, param2: string, param3: string, param4: string, param5: globalAndroid.os.Bundle): globalAndroid.os.Bundle;

              public isBillingSupported(param0: number, param1: string, param2: string): number;

              public getPurchases(param0: number, param1: string, param2: string, param3: string): globalAndroid.os.Bundle;

              public getSkuDetails(param0: number, param1: string, param2: string, param3: globalAndroid.os.Bundle): globalAndroid.os.Bundle;

              public getBuyIntent(param0: number, param1: string, param2: string, param3: string, param4: string): globalAndroid.os.Bundle;

              public getInterfaceDescriptor(): string;

              public asBinder(): globalAndroid.os.IBinder;

              public isBillingSupportedExtraParams(param0: number, param1: string, param2: string, param3: globalAndroid.os.Bundle): number;

              public getPurchaseHistory(param0: number, param1: string, param2: string, param3: string, param4: globalAndroid.os.Bundle): globalAndroid.os.Bundle;
            }
          }
        }
      }
    }
  }
}

//Generics information:

