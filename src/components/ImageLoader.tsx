import { FC } from "react";
import LottieView from "lottie-react-native";
import { imgConverter } from "../assets";

interface Props {}

const ImageLoader: FC<Props> = (): JSX.Element | null => {
  return <LottieView source={imgConverter} autoPlay loop />;
};

export default ImageLoader;
