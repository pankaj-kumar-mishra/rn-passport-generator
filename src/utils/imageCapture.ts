import { Alert, PermissionsAndroid, Platform } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

// https://reactnative.dev/docs/permissionsandroid
const requestCameraPermission = async (): Promise<void> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Photo Generator App Camera Permission",
        message:
          "Photo Generator App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    const { NEVER_ASK_AGAIN, DENIED, GRANTED } = PermissionsAndroid.RESULTS;
    if (granted === NEVER_ASK_AGAIN)
      return Alert.alert(
        "Failed to open camera",
        "It looks like you disabled the camera permission for this app!. Please change the setting first."
      );
    if (granted === DENIED)
      return Alert.alert(
        "Failed to open camera",
        "Sorry but to use this feature, you have to accept the CAMERA PERMISSION!."
      );

    if (granted === GRANTED) {
      console.log("You can use the camera");
    }
  } catch (err) {
    console.log("Fail to open camera.(inside camera permission)", err);
  }
};

// https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
const selectAndCropImageFromCamera = async (
  width: number = 413,
  height: number = 531
): Promise<{ path: string; error: unknown }> => {
  try {
    if (Platform.OS === "android") {
      await requestCameraPermission();
    }
    // Open Camera
    const { path } = await ImagePicker.openCamera({
      width,
      height,
      cropping: true,
    });
    return { path, error: null };
  } catch (error) {
    return { path: "", error };
  }
};

const selectAndCropImageFromDevice = async (
  width: number = 413,
  height: number = 531
): Promise<{ path: string; error: unknown }> => {
  try {
    // Open Gallery
    const { path } = await ImagePicker.openPicker({
      width,
      height,
      cropping: true,
    });
    return { path, error: null };
  } catch (error) {
    return { path: "", error };
  }
};

export {
  requestCameraPermission,
  selectAndCropImageFromCamera,
  selectAndCropImageFromDevice,
};
