import { FC } from "react";
import LottieView from "lottie-react-native";
import { imgConverter } from "../assets";

interface Props {
  loading: boolean;
}

const ImageLoader: FC<Props> = ({ loading }): JSX.Element | null => {
  if (!loading) return null;

  return <LottieView source={imgConverter} autoPlay loop />;
};

export default ImageLoader;
