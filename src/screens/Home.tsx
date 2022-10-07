import { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import FA5Icon from "react-native-vector-icons/FontAwesome5";

import { LargeIconButton } from "../components";
import {
  selectAndCropImageFromCamera,
  selectAndCropImageFromDevice,
} from "../utils/imageCapture";

// file:///storage/emulated/0/Android/data/com.passportgenerator/files/Pictures/eba8ef39-e5f5-475f-be18-fb610d385f6b.jpg

interface Props {}

const Home: FC<Props> = (): JSX.Element => {
  const handleImageCapture = async (): Promise<void> => {
    const { path, error } = await selectAndCropImageFromCamera();
    if (error) return console.log(error);

    console.log(path);
  };

  const handleImageSelect = async (): Promise<void> => {
    const { path, error } = await selectAndCropImageFromDevice();
    if (error) return console.log(error);

    console.log(path);
  };

  return (
    <View style={styles.container}>
      {/* TITLE */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Choose Your Image</Text>
        <Text style={styles.subTitle}>
          You can select your image using one of these option which you want to
          convert to passport size.
        </Text>
      </View>
      {/* IMAGE CAPTURE */}
      <LargeIconButton onPress={handleImageCapture} title="Capture">
        <FA5Icon name="camera" />
        {/* <FA5Icon name="camera" style={{ color: "red" }} /> */}
      </LargeIconButton>
      {/* IMAGE SELECT */}
      <LargeIconButton onPress={handleImageSelect} title="Select">
        <FA5Icon name="folder-open" />
      </LargeIconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    position: "absolute",
    top: 10,
  },
  title: {
    fontSize: 25,
    color: "#272727",
    fontWeight: "600",
    textAlign: "center",
  },
  subTitle: {
    color: "#272727",
    textAlign: "center",
    opacity: 0.5,
    lineHeight: 20,
    paddingTop: 10,
  },
});

export default Home;
