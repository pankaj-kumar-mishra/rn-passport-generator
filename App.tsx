import "react-native-gesture-handler";
import React, { FC } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { AppNavigator } from "./src/navigation";
import { Home } from "./src/screens";

interface Props {
  appName: string;
}

const App: FC<Props> = (props): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
