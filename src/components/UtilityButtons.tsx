import { FC } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import FA5Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
  onPress?: () => void;
}

const Back: FC<Props> = ({ onPress }): JSX.Element => {
  return (
    <Pressable onPress={onPress} style={styles.btn}>
      <FA5Icon name="arrow-left" style={styles.icon} />
    </Pressable>
  );
};
const Save: FC<Props> = ({ onPress }): JSX.Element => {
  return (
    <View>
      <Pressable onPress={onPress} style={styles.btn}>
        <FA5Icon name="file-download" style={styles.icon} />
      </Pressable>
      <Text style={styles.btnTitle}>Save</Text>
    </View>
  );
};

type UtilityButtonsType = {
  Back: FC<Props>;
  Save: FC<Props>;
};

const UtilityButtons: UtilityButtonsType = { Back, Save };

const styles = StyleSheet.create({
  btn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#ffe",
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 20,
    color: "#6C9ADE",
  },
  btnTitle: {
    alignSelf: "center",
    color: "#6C9ADE",
  },
});

export default UtilityButtons;
