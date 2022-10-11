import { RouteProp, NavigationProp, EventArg } from "@react-navigation/native";
import { FC, useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Background,
  ConfirmModal,
  EditorTools,
  Header,
  SelectedImage,
} from "../components";
import { AppStackParamList } from "../navigation/AppNavigator";
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

const ImageEditor: FC<Props> = ({ route, navigation }): JSX.Element => {
  const { imageUri } = route.params;
  // BUG  Unable to handle typescript error
  const backActionRef = useRef<any>();
  const [selectedImage, setSelectedImage] = useState(imageUri);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  const handleImageSelectAnother = async (): Promise<void> => {
    const { path, error } = await selectAndCropImageFromDevice();
    if (error) return console.log(error);

    setSelectedImage(path);
  };

  const handleImageCaptureAnother = async (): Promise<void> => {
    const { path, error } = await selectAndCropImageFromCamera();
    if (error) return console.log(error);

    setSelectedImage(path);
  };

  return (
    <View style={styles.container}>
      <Background />
      <Header />
      <View style={styles.imageContainer}>
        <SelectedImage uri={selectedImage} />
      </View>
      <EditorTools
        onSelectAnother={handleImageSelectAnother}
        onCaptureAnother={handleImageCaptureAnother}
      />

      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure?"
        message="Are you sure, because this action will discard all your changes."
        onCancelPress={handleCancelModal}
        onDiscardPress={handleDiscardModal}
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
