# Keep Twilio classes
-keep class com.twilio.** { *; }

# Keep WebRTC classes
-keep class org.webrtc.** { *; }

# Keep React Native classes
-keep class com.facebook.react.** { *; }

# Keep Hermes classes
-keep class com.facebook.hermes.** { *; }

# Keep JNI classes
-keep class com.facebook.jni.** { *; }

# Keep Expo classes
-keep class expo.** { *; }

# Keep JavaScript interface methods
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep annotations
-keepattributes *Annotation*

# Keep serializable classes
-keepnames class * implements java.io.Serializable
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }
