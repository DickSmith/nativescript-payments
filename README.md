# Your Plugin Name

Add your plugin badges here. See [nativescript-urlhandler](https://github.com/hypery2k/nativescript-urlhandler) for example.

Then describe what's the purpose of your plugin. 

In case you develop UI plugin, this is where you can add some screenshots.

## (Optional) Prerequisites / Requirements

Describe the prerequisites that the user need to have installed before using your plugin. See [nativescript-firebase plugin](https://github.com/eddyverbruggen/nativescript-plugin-firebase) for example.

## Installation

Describe your plugin installation steps. Ideally it would be something like:

```javascript
tns plugin add <your-plugin-name>
```

## Usage 

Describe any usage specifics for your plugin. Give examples for Android, iOS, Angular if needed. See [nativescript-drop-down](https://www.npmjs.com/package/nativescript-drop-down) for example.
	
	```javascript
    Usage code snippets here
    ```)

## API

Describe your plugin methods and properties here. See [nativescript-feedback](https://github.com/EddyVerbruggen/nativescript-feedback) for example.
    
| Property | Default | Description |
| --- | --- | --- |
| some property | property default value | property description, default values, etc.. |
| another property | property default value | property description, default values, etc.. |
    
## License

Apache License Version 2.0, January 2004

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
