import Slider from "@react-native-community/slider";
import { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import FA5Icon from "react-native-vector-icons/FontAwesome5";

import SelectorButton from "./SelectorButton";

interface Props {
  onSelectAnother?: () => void;
  onCaptureAnother?: () => void;
}

const EditorTools: FC<Props> = ({
  onSelectAnother,
  onCaptureAnother,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <SelectorButton onPress={onSelectAnother} title="Select Another">
          <FA5Icon name="folder-open" />
        </SelectorButton>
        <SelectorButton onPress={onCaptureAnother} title="Capture Another">
          <FA5Icon name="camera" />
        </SelectorButton>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Compressed to: 50%</Text>
        <Text style={styles.infoText}>Image size: 50KB</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          maximumTrackTintColor="rgba(108,154,222, .8)"
          minimumTrackTintColor="rgb(108,154,222)"
          thumbTintColor="rgb(108,154,222)"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 10,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  infoText: {
    color: "#272727",
    fontSize: 16,
  },
  sliderContainer: {
    paddingVertical: 10,
  },
});

export default EditorTools;
