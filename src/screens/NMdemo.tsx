import { FC } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import fsModule from "../types/fsModule";

interface Props {}

// console.log("FSModule", fsModule);
// fsModule.greetMe("Pankaj", (message: string) => {
//   console.log(message);
// });

const NMdemo: FC<Props> = (): JSX.Element => {
  const triggerCallback = () => {
    fsModule.greetMe("Pankaj Kumar Mishra", (message: string) => {
      console.log(message);
    });
  };

  const triggerPromise = async () => {
    try {
      const message = await fsModule.greetMe2("Pankaj Kumar Mishra");
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Native Modules Demo Screen</Text>
      <Button title="Callback Call" onPress={triggerCallback} />
      <Button title="Promise Call" onPress={triggerPromise} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default NMdemo;
