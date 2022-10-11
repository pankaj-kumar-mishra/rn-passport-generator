import { FC } from "react";
import { StyleSheet, View, Image } from "react-native";
import { bg1, bg2 } from "../../assets";

interface Props {}

const randomNo = Math.floor(Math.random() * 10);

const Background: FC<Props> = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={randomNo >= 5 ? bg2 : bg1} style={styles.bgImg} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // position: "absolute",
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
    zIndex: -1,
    opacity: 0.2,
  },
  bgImg: {
    flex: 1,
  },
});

export default Background;
