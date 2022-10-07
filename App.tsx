import React, { FC } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Home } from "./src/screens";

interface Props {
  appName: string;
}

const App: FC<Props> = (props): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
