/* tslint:disable:no-unused-variable no-internal-module no-namespace max-classes-per-file ban-types */
/* tslint:disable indent max-line-length member-ordering unified-signatures member-access semicolon trailing-comma */

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

            export module api {
                export class BillingBroadcastManager {
                }

                export module BillingBroadcastManager {
                    export class BillingBroadcastReceiver {
                        public onReceive(context: Context,
                                         intent: Intent): void;
                    }
                }

                export abstract class BillingClient {
                    public isReady(): boolean;

                    public querySkuDetailsAsync(skuType: string,
                                                skuList: List<string>,
                                                listener: SkuDetailsResponseListener): void;

                    public queryPurchases(skuType: string): Purchase.PurchasesResult;

                    public startConnection(listener: BillingClientStateListener): void;

                    public endConnection(): void;

                    public constructor();

                    public isFeatureSupported(feature: string): number;

                    public consumeAsync(purchaseToken: string,
                                        listener: ConsumeResponseListener): void;

                    public launchBillingFlow(activity: Activity,
                                             params: BillingFlowParams): number;

                    public queryPurchaseHistoryAsync(skuType: string,
                                                     listener: PurchaseHistoryResponseListener): void;
                }

                export module BillingClient {
                    export class BillingResponse {
                        /**
                         * Constructs a new instance of the BillingClient$BillingResponse interface with the provided implementation.
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

                        public constructor(context: Context);
                    }

                    export class FeatureType {
                        /**
                         * Constructs a new instance of the BillingClient$FeatureType interface with the provided implementation.
                         */
                        public constructor(implementation: {});

                        public static SUBSCRIPTIONS_ON_VR: string;
                        public static SUBSCRIPTIONS: string;
                        public static IN_APP_ITEMS_ON_VR: string;
                        public static SUBSCRIPTIONS_UPDATE: string;
                    }

                    export class SkuType {
                        /**
                         * Constructs a new instance of the BillingClient$SkuType interface with the provided implementation.
                         */
                        public constructor(implementation: {});

                        public static INAPP: string;
                        public static SUBS: string;
                    }
                }

                export class BillingClientImpl extends BillingClient {
                    public isReady(): boolean;

                    public querySkuDetailsAsync(skuType: string,
                                                skuList: List<string>,
                                                listener: SkuDetailsResponseListener): void;

                    public queryPurchases(skuType: string): Purchase.PurchasesResult;

                    public startConnection(listener: BillingClientStateListener): void;

                    public endConnection(): void;

                    public isFeatureSupported(feature: string): number;

                    public consumeAsync(param0: string,
                                        param1: ConsumeResponseListener): void;

                    public launchBillingFlow(activity: Activity,
                                             params: BillingFlowParams): number;

                    public queryPurchaseHistoryAsync(param0: string,
                                                     param1: PurchaseHistoryResponseListener): void;
                }

                export module BillingClientImpl {
                    export class BillingServiceConnection {
                        public onServiceConnected(param0: ComponentName,
                                                  param1: IBinder): void;

                        public onServiceDisconnected(param0: ComponentName): void;
                    }
                }

                export class BillingClientStateListener {
                    /**
                     * Constructs a new instance of the BillingClientStateListener interface with the provided implementation.
                     */
                    public constructor(implementation: {
                        onBillingSetupFinished(resultCode: number): void;
                        onBillingServiceDisconnected(): void;
                    });

                    public onBillingServiceDisconnected(): void;

                    public onBillingSetupFinished(resultCode: number): void;
                }

                export class BillingFlowParams {
                    public getVrPurchaseFlow(): boolean;

                    public constructor();

                    public getSku(): string;

                    public getOldSkus(): ArrayList<string>;

                    public getAccountId(): string;

                    public getReplaceSkusProration(): boolean;

                    public hasExtraParams(): boolean;

                    public getSkuType(): string;
                }

                export module BillingFlowParams {
                    export class Builder {
                        public constructor();

                        public setVrPurchaseFlow(isVrPurchaseFlow: boolean): BillingFlowParams.Builder;

                        public setAccountId(accountId: string): BillingFlowParams.Builder;

                        public build(): BillingFlowParams;

                        public setOldSkus(oldSkus: ArrayList<string>): BillingFlowParams.Builder;

                        public setType(type: string): BillingFlowParams.Builder;

                        public addOldSku(oldSku: string): BillingFlowParams.Builder;

                        public setReplaceSkusProration(bReplaceSkusProration: boolean): BillingFlowParams.Builder;

                        public setSku(sku: string): BillingFlowParams.Builder;
                    }
                }

                export class ConsumeResponseListener {
                    /**
                     * Constructs a new instance of the ConsumeResponseListener interface with the provided implementation.
                     */
                    public constructor(implementation: {
                        onConsumeResponse(purchaseToken: string,
                                          resultCode: number): void;
                    });

                    public onConsumeResponse(purchaseToken: string,
                                             resultCode: number): void;
                }

                export class Purchase {
                    public getOrderId(): string;

                    public getPurchaseState(): number;

                    public equals(o: Object): boolean;

                    public getPackageName(): string;

                    public getPurchaseToken(): string;

                    public constructor(jsonPurchaseInfo: string,
                                       signature: string);

                    public toString(): string;

                    public getSignature(): string;

                    public getPurchaseTime(): number;

                    public getOriginalJson(): string;

                    public getSku(): string;

                    public isAutoRenewing(): boolean;

                    public hashCode(): number;
                }

                export module Purchase {
                    export class PurchaseState {
                        /**
                         * Constructs a new instance of the Purchase$PurchaseState interface with the provided implementation.
                         */
                        public constructor(implementation: {});

                        public static PURCHASED: number;
                        public static REFUNDED: number;
                        public static CANCELED: number;
                    }

                    export class PurchasesResult {
                        public constructor(param0: List,
                                           param1: number);

                        public getResponseCode(): number;

                        public getPurchasesList(): List<Purchase>;
                    }
                }

                export class PurchaseHistoryResponseListener {
                    /**
                     * Constructs a new instance of the PurchaseHistoryResponseListener interface with the provided implementation.
                     */
                    public constructor(implementation: {
                        onPurchaseHistoryResponse(result: Purchase.PurchasesResult): void;
                    });

                    public onPurchaseHistoryResponse(result: Purchase.PurchasesResult): void;
                }

                export class PurchasesUpdatedListener {
                    /**
                     * Constructs a new instance of the PurchasesUpdatedListener interface with the provided implementation.
                     */
                    public constructor(implementation: {
                        onPurchasesUpdated(responseCode: number,
                                           purchases: List<Purchase>): void;
                    });

                    public onPurchasesUpdated(responseCode: number,
                                              purchases: List<Purchase>): void;
                }

                export class SkuDetails {
                    public getTitle(): string;

                    public toString(): string;

                    public constructor(param0: string);

                    public equals(param0: Object): boolean;

                    public getPriceAmountMicros(): number;

                    public getSku(): string;

                    public getPriceCurrencyCode(): string;

                    public getType(): string;

                    public getDescription(): string;

                    public hashCode(): number;

                    public getPrice(): string;
                }

                export module SkuDetails {
                    export class SkuDetailsResult {
                        public constructor(param0: List,
                                           param1: number);

                        public getResponseCode(): number;

                        public getSkuDetailsList(): List<SkuDetails>;
                    }
                }

                export class SkuDetailsResponseListener {
                    /**
                     * Constructs a new instance of the SkuDetailsResponseListener interface with the provided implementation.
                     */
                    public constructor(implementation: {
                        onSkuDetailsResponse(result: SkuDetails.SkuDetailsResult): void;
                    });

                    public onSkuDetailsResponse(result: SkuDetails.SkuDetailsResult): void;
                }
            }
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

                    public static getResponseCodeFromBundle(param0: Bundle,
                                                            param1: string): number;

                    public constructor();

                    public static logVerbose(param0: string,
                                             param1: string): void;

                    public static logWarn(param0: string,
                                          param1: string): void;

                    public static getResponseCodeFromIntent(param0: Intent,
                                                            param1: string): number;

                    public static extractPurchases(param0: Bundle): List;
                }

                export class ProxyBillingActivity {
                    public static RECEIVER_EXTRA: string;

                    public onActivityResult(param0: number,
                                            param1: number,
                                            param2: Intent): void;

                    public constructor();

                    public onCreate(param0: Bundle): void;
                }
            }
        }
    }
}

// import Parcel = android.os.Parcel;
// declare module com {
// 	export module android {
// 		export module vending {
// 			export module billing {
// 				export class IInAppBillingService {
// 					/**
// 					 * Constructs a new instance of the com.android.vending.billing.IInAppBillingService interface with the provided implementation.
// 					 */
// 					public constructor(implementation: {
// 						isBillingSupported(param0: number, param1: string, param2: string): number;
// 						getSkuDetails(param0: number, param1: string, param2: string, param3: Bundle): Bundle;
// 						getBuyIntent(param0: number, param1: string, param2: string, param3: string, param4: string): Bundle;
// 						getPurchases(param0: number, param1: string, param2: string, param3: string): Bundle;
// 						finalizeOrder(param0: number, param1: string, param2: string): number;
// 						stub(param0: number, param1: string, param2: string): number;
// 						getBuyIntentToReplaceSkus(param0: number, param1: string, param2: List, param3: string, param4: string, param5: string): Bundle;
// 						getBuyIntentExtraParams(param0: number, param1: string, param2: string, param3: string, param4: string, param5: Bundle): Bundle;
// 						getPurchaseHistory(param0: number, param1: string, param2: string, param3: string, param4: Bundle): Bundle;
// 						isBillingSupportedExtraParams(param0: number, param1: string, param2: string, param3: Bundle): number;
// 					});
// 					public getSkuDetails(param0: number, param1: string, param2: string, param3: Bundle): Bundle;
// 					public isBillingSupportedExtraParams(param0: number, param1: string, param2: string, param3: Bundle): number;
// 					public stub(param0: number, param1: string, param2: string): number;
// 					public getPurchases(param0: number, param1: string, param2: string, param3: string): Bundle;
// 					public finalizeOrder(param0: number, param1: string, param2: string): number;
// 					public isBillingSupported(param0: number, param1: string, param2: string): number;
// 					public getBuyIntentExtraParams(param0: number, param1: string, param2: string, param3: string, param4: string, param5: Bundle): Bundle;
// 					public getBuyIntent(param0: number, param1: string, param2: string, param3: string, param4: string): Bundle;
// 					public getBuyIntentToReplaceSkus(param0: number, param1: string, param2: List, param3: string, param4: string, param5: string): Bundle;
// 					public getPurchaseHistory(param0: number, param1: string, param2: string, param3: string, param4: Bundle): Bundle;
// 				}
// 				export module IInAppBillingService {
// 					export abstract class Stub {
// 						public constructor();
// 						public getBuyIntentToReplaceSkus(param0: number, param1: string, param2: List, param3: string, param4: string, param5: string): Bundle;
// 						public getPurchases(param0: number, param1: string, param2: string, param3: string): Bundle;
// 						public getBuyIntentExtraParams(param0: number, param1: string, param2: string, param3: string, param4: string, param5: Bundle): Bundle;
// 						public getSkuDetails(param0: number, param1: string, param2: string, param3: Bundle): Bundle;
// 						public asBinder(): IBinder;
// 						public stub(param0: number, param1: string, param2: string): number;
// 						public finalizeOrder(param0: number, param1: string, param2: string): number;
// 						public isBillingSupportedExtraParams(param0: number, param1: string, param2: string, param3: Bundle): number;
// 						public isBillingSupported(param0: number, param1: string, param2: string): number;
// 						public getBuyIntent(param0: number, param1: string, param2: string, param3: string, param4: string): Bundle;
// 						public static asInterface(param0: IBinder): com.android.vending.billing.IInAppBillingService;
// 						public getPurchaseHistory(param0: number, param1: string, param2: string, param3: string, param4: Bundle): Bundle;
// 						public onTransact(param0: number, param1: Parcel, param2: Parcel, param3: number): boolean;
// 					}
// 					export module Stub {
// 						export class Proxy {
// 							public getInterfaceDescriptor(): string;
// 							public asBinder(): IBinder;
// 							public finalizeOrder(param0: number, param1: string, param2: string): number;
// 							public stub(param0: number, param1: string, param2: string): number;
// 							public getSkuDetails(param0: number, param1: string, param2: string, param3: Bundle): Bundle;
// 							public isBillingSupported(param0: number, param1: string, param2: string): number;
// 							public getPurchases(param0: number, param1: string, param2: string, param3: string): Bundle;
// 							public getBuyIntent(param0: number, param1: string, param2: string, param3: string, param4: string): Bundle;
// 							public isBillingSupportedExtraParams(param0: number, param1: string, param2: string, param3: Bundle): number;
// 							public getBuyIntentExtraParams(param0: number, param1: string, param2: string, param3: string, param4: string, param5: Bundle): Bundle;
// 							public getBuyIntentToReplaceSkus(param0: number, param1: string, param2: List, param3: string, param4: string, param5: string): Bundle;
// 							public getPurchaseHistory(param0: number, param1: string, param2: string, param3: string, param4: Bundle): Bundle;
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// }
