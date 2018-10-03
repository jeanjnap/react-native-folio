package com.reactfolio;

import android.support.v4.content.ContextCompat;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.folioreader.AppContext;
import com.folioreader.Config;
import com.folioreader.Constants;
import com.folioreader.FolioReader;

/**
 * Expose Java to JavaScript.
 */
class ActivityStarterModule extends ReactContextBaseJavaModule {

    private static DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter = null;

    ActivityStarterModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void initialize() {
        super.initialize();
        eventEmitter = getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }

    @Override
    public String getName() {
        return "ActivityStarter";
    }

    @ReactMethod
    void nativeFunction(String file) {

        FolioReader folioReader = FolioReader.get();
                /*
                .setOnHighlightListener(getReactApplicationContext())
                .setReadPositionListener(getReactApplicationContext())
                .setOnClosedListener(getReactApplicationContext());
*/

        Config config = new Config()
                .setAllowedDirection(Config.AllowedDirection.ONLY_VERTICAL)
                .setDirection(Config.Direction.HORIZONTAL)
                .setFont(Constants.FONT_LORA)
                .setFontSize(0)
                .setNightMode(true)
                .setThemeColorInt(ContextCompat.getColor(AppContext.get(), R.color.app_gray))
                .setShowTts(false)
                .setNightMode(false);

        config.setAllowedDirection(Config.AllowedDirection.ONLY_HORIZONTAL);

        folioReader.setConfig(config, true).openBook(file);

        //print(file);
    }

    public void print(String texto){
        Toast.makeText(getReactApplicationContext(), texto, Toast.LENGTH_SHORT).show();
    }
}
