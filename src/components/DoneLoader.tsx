import { FC } from "react";
import LottieView from "lottie-react-native";
import { done } from "../assets";

interface Props {
  loading: boolean;
  onAnimationFinish: () => void;
}

const DoneLoader: FC<Props> = ({
  loading,
  onAnimationFinish,
}): JSX.Element | null => {
  if (!loading) return null;

  return (
    <LottieView
      source={done}
      autoPlay
      loop={false}
      onAnimationFinish={onAnimationFinish}
    />
  );
};

export default DoneLoader;
