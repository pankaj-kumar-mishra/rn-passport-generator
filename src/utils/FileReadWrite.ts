import { PermissionsAndroid } from "react-native";

const requestReadAndWritePermissions = async () => {
  const result = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ]);

  const readPermission = result["android.permission.READ_EXTERNAL_STORAGE"];
  const writePermission = result["android.permission.WRITE_EXTERNAL_STORAGE"];

  if (readPermission === "granted" && writePermission === "granted") {
    return true;
  } else {
    return false;
  }
};

const requestReadPermission = async () => {
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
  );

  return result === "granted";
};

const requestWritePermission = async () => {
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  );

  return result === "granted";
};

export {
  requestReadAndWritePermissions,
  requestReadPermission,
  requestWritePermission,
};
