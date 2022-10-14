import { FC } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import fsModule from "../services/fsModule";

interface Props {}

// NOTE Remove "file:///" then it will work
// const imageUri =
//   "file:///storage/emulated/0/Android/data/com.passportgenerator/files/Pictures/010db963-9b74-4758-99ab-af993ec5cefc.jpg";

const imageUri =
  "storage/emulated/0/Android/data/com.passportgenerator/files/Pictures/010db963-9b74-4758-99ab-af993ec5cefc.jpg";

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

  const handleToGetImageSize = async () => {
    try {
      const size = await fsModule.getImageSize(imageUri);
      console.log(size);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Native Modules Demo Screen</Text>
      <Button title="Callback Call" onPress={triggerCallback} />
      <Button title="Promise Call" onPress={triggerPromise} />
      <Button title="Get Image Size" onPress={handleToGetImageSize} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default NMdemo;
