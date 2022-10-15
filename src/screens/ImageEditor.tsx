import { RouteProp, NavigationProp, EventArg } from "@react-navigation/native";
import { FC, useEffect, useState, useRef } from "react";
import { Linking, StyleSheet, View } from "react-native";
import {
  Background,
  ConfirmModal,
  DoneLoader,
  EditorTools,
  Header,
  ImageLoader,
  SelectedImage,
} from "../components";
import { AppStackParamList } from "../navigation/AppNavigator";
import fsModule from "../services/fsModule";
import { requestWritePermission } from "../utils/FileReadWrite";
import { convertSizeToKB } from "../utils/helper";
import {
  selectAndCropImageFromCamera,
  selectAndCropImageFromDevice,
} from "../utils/imageCapture";

interface Props {
  route: RouteProp<AppStackParamList, "ImageEditor">;
  navigation: NavigationProp<AppStackParamList, "ImageEditor">;
}

// const imageUri =
//   "file:///storage/emulated/0/Android/data/com.passportgenerator/files/Pictures/eba8ef39-e5f5-475f-be18-fb610d385f6b.jpg";

const imagePrefix = "file:///";

const ImageEditor: FC<Props> = ({ route, navigation }): JSX.Element => {
  const { imageUri } = route.params;
  // console.log(imageUri);
  // BUG  Unable to handle typescript error
  const backActionRef = useRef<any>();

  const [selectedImage, setSelectedImage] = useState(imageUri);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fileSize, setFileSize] = useState(0);

  const [compressValue, setCompressValue] = useState(1);
  const [compressedPercentage, setCompressedPercentage] = useState(100);
  const [compressedImage, setCompressedImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [showPermissionAlert, setShowPermissionAlert] = useState(false);

  const handleCancelPermissionModal = () => {
    setShowPermissionAlert(false);
  };

  const handleConfirmPermissionModal = () => {
    handleCancelPermissionModal();
    Linking.openSettings();
  };

  const getImageUriSize = async () => {
    try {
      const uri = selectedImage.split(imagePrefix)[1];
      const size = await fsModule.getImageSize(uri);
      console.log(size);
      setFileSize(convertSizeToKB(size));
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageCompress = async (value: number) => {
    try {
      setLoading(true);
      const tempCompressValue = Math.floor(value * 100);
      const uri = selectedImage.split(imagePrefix)[1];
      const result = await fsModule.compressImage(uri, tempCompressValue);
      // console.log(result);
      setCompressedPercentage(Math.round(value * 100));
      setFileSize(convertSizeToKB(result.size));
      setCompressedImage(imagePrefix + result.uri);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSlidingComplete = (value: number) => {
    console.log(value);
    setCompressValue(value);
  };

  const handleSave = async () => {
    try {
      const isWrite = await requestWritePermission();
      console.log(isWrite);
      if (!isWrite) {
        setShowPermissionAlert(true);
        return;
      }
      const tempCompressValue = Math.floor(compressValue * 100);
      const fileName = "pp-" + Date.now();
      const imageUri = compressedImage.split(imagePrefix)[1];
      const result = await fsModule.saveImageToDevice(
        imageUri,
        fileName,
        tempCompressValue
      );
      if (result === "Saved") {
        setTimeout(() => {
          setSaveLoading(true);
        }, 500);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImageUriSize();
  }, [selectedImage]);

  const displayConfirmModal = () => {
    setShowConfirmModal(true);
  };
  const handleCancelModal = () => {
    setShowConfirmModal(false);
  };
  const handleDiscardModal = () => {
    setShowConfirmModal(false);
    console.log(backActionRef.current);
    navigation.dispatch(backActionRef.current);
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      // console.log("onMount", e);
      e.preventDefault();
      displayConfirmModal();
      backActionRef.current = e.data.action;
    });
  }, []);

  const resetActivity = () => {
    setTimeout(() => {
      setCompressValue(1);
      setCompressedPercentage(100);
      setCompressedImage("");
    }, 0);
  };

  const handleImageSelectAnother = async (): Promise<void> => {
    const { path, error } = await selectAndCropImageFromDevice();
    if (error) return console.log(error);

    resetActivity();
    setSelectedImage(path);
  };

  const handleImageCaptureAnother = async (): Promise<void> => {
    const { path, error } = await selectAndCropImageFromCamera();
    if (error) return console.log(error);

    resetActivity();
    setSelectedImage(path);
  };

  return (
    <View style={styles.container}>
      <Background />
      <Header onSavePress={handleSave} />
      <View style={styles.imageContainer}>
        <SelectedImage uri={compressedImage || selectedImage}>
          {(loading || saveLoading) && (
            <>
              <ImageLoader loading={loading} />
              <DoneLoader
                loading={saveLoading}
                onAnimationFinish={() => setSaveLoading(false)}
              />
            </>
          )}
        </SelectedImage>
      </View>
      <EditorTools
        fileSize={fileSize}
        compressValue={compressValue}
        compressedPercentage={compressedPercentage}
        onSelectAnother={handleImageSelectAnother}
        onCaptureAnother={handleImageCaptureAnother}
        onSliderChange={handleImageCompress}
        onSlidingComplete={handleSlidingComplete}
      />

      <ConfirmModal
        visible={showConfirmModal}
        isDanger
        message="Are you sure, because this action will discard all your changes."
        confirmTitle="Discard"
        onCancelPress={handleCancelModal}
        onConfirmPress={handleDiscardModal}
      />

      {/* Confirm again for File write permission */}
      <ConfirmModal
        visible={showPermissionAlert}
        title="Required Write Permission!"
        message="This app need file write permission to save file, so you have to accept the permission!"
        confirmTitle="Open Settings"
        onCancelPress={handleCancelPermissionModal}
        onConfirmPress={handleConfirmPermissionModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ImageEditor;
