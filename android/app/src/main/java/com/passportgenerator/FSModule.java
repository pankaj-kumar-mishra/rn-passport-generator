package com.passportgenerator;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

// To register this module we need to create another file name as package
public class FSModule extends ReactContextBaseJavaModule {
    FileOutputStream fos;
    Context context;

    public FSModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @NonNull
    @Override
    public String getName() {
        //  we can access this module 'FSModule' => const { FSModule } = ReactNative.NativeModules;
        return "fsModule";
    }

    @ReactMethod
    public void greetMe(String name, Callback cb) {
        Log.d("FSModule", "Welcome to Native Modules, " + name);
        cb.invoke("CB => Welcome to Native Modules, " + name);
    }

    @ReactMethod
    public void greetMe2(String name, Promise promise) {
        promise.resolve("Promise => Welcome to Native Modules, " + name);
    }

    //  Image functionality functions
    @ReactMethod
    public void getImageSize(String uri, Promise promise) {
        File file = new File(uri);
//        long size = file.length();
        // here we converting string to integer using "(int)"
        int size = (int) file.length();
        promise.resolve(size);
    }

    @ReactMethod
    public void compressImage(String imageUri, int compressValue, Promise promise) {
        try {
//        Set output directory to save compressed image
            File outputDir = context.getCacheDir();
//        EX passport_112313.jpg
            File outputFile = File.createTempFile("passport_", ".jpg", outputDir);
            fos = new FileOutputStream(outputFile);

//            Create a bitmap and save it as cache
            String filePath = new File(imageUri).getAbsolutePath();
            Bitmap bitmap = BitmapFactory.decodeFile(filePath);
            bitmap.compress(Bitmap.CompressFormat.JPEG, compressValue, fos);

//          Extract compressed file path and its size
            File file = new File(outputFile.getAbsolutePath());
            int compressedSize = (int) file.length();

//          Return object response => from java to react native
//          EX:- {size: newSize, uri: newUri}
            WritableMap result = Arguments.createMap();
            result.putString("uri", String.valueOf(outputFile));
            result.putInt("size", compressedSize);
//          using the above .put we can create any object or array

            promise.resolve(result);

//          close FileOutputStream
            fos.close();
        } catch (Exception e) {
            promise.reject(e);
        }
    }
}
