import { FC, ReactNode } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

interface Props {
  uri: string;
  children?: ReactNode;
}

const SelectedImage: FC<Props> = ({ uri, children }): JSX.Element => {
  return (
    <View style={styles.container}>
      {children || <Image source={{ uri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 206,
    height: 265,
    backgroundColor: "#fff",
    elevation: 10,
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default SelectedImage;
