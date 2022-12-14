import { FC } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import UtilityButtons from "../UtilityButtons";
import { AppStackParamList } from "../../navigation/AppNavigator";

interface Props {
  onSavePress: () => void;
}

const Header: FC<Props> = ({ onSavePress }): JSX.Element => {
  //   const navigation = useNavigation();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <View style={styles.container}>
      <UtilityButtons.Back onPress={navigation.goBack} />
      <UtilityButtons.Save onPress={onSavePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
  },
});

export default Header;
