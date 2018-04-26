# NativeScript Payments

[![npm](https://img.shields.io/npm/v/nativescript-paymentssvg)](https://www.npmjs.com/package/nativescript-payments)
[![npm](https://img.shields.io/npm/dt/nativescript-payments.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-payments)

For payments via Google Play or iTunes utilizing RxJS.

## Installation

```bash
tns plugin add nativescript-payments
```

## Usage 

***TODO***

	```javascript
    Usage code snippets here
    ```)

## API

*** TODO ***
    
| Property | Default | Description |
| --- | --- | --- |
| some property | property default value | property description, default values, etc.. |
| another property | property default value | property description, default values, etc.. |
    
## License

MIT

## Dumping typings...
##### iOS
From `src/`:
```sh
pod repo update
TNS_TYPESCRIPT_DECLARATIONS_PATH="$(pwd)/typings" npm run demo.ios
cp typings/x86_64/objc\!Zendesk* typings/
```

##### Android
From project root:
```sh
cd android
./gradlew clean
./gradlew getDeps

cd lib
jar xf billing-1.0.aar
mv classes.jar used-billing.jar

rm -rf */
find . -type f ! -iname "used-*" -delete
cd ../..

rm -rf out/
java -jar ../android-dts-generator/dts-generator/build/libs/dts-generator.jar -input \
    android/lib/used-billing.jar \
    && mv out/android.d.ts src/typings/java\!PlayBillingLibrary.d.ts;
```
