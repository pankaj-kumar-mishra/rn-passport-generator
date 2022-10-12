package com.passportgenerator;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

// To register this module we need to create another file name as package
public class FSModule extends ReactContextBaseJavaModule {
    public FSModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
    //  we can access this module 'FSModule' => const { FSModule } = ReactNative.NativeModules;
        return "fsModule";
    }

    @ReactMethod
    public void greetMe(String name, Callback cb) {
        Log.d("FSModule", "Welcome to Native Modules, "+ name);
        cb.invoke("CB => Welcome to Native Modules, "+ name);
    }

    @ReactMethod
    public void greetMe2(String name, Promise promise) {
        promise.resolve("Promise => Welcome to Native Modules, "+ name);
    }
}
