import { Children, cloneElement, FC, isValidElement, ReactNode } from "react";
import { StyleSheet, Pressable, Text } from "react-native";

interface Props {
  title: string;
  onPress?: () => void;
  children?: ReactNode;
}

const SelectorButton: FC<Props> = ({
  title,
  onPress,
  children,
}): JSX.Element => {
  return (
    <Pressable onPress={onPress} style={styles.btn}>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return;
        return cloneElement(child, {
          ...child.props,
          style: { ...styles.btnIcon, ...child.props.style },
        });
      })}
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6C9ADE",
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
  },
  btnIcon: {
    color: "#fff",
    fontSize: 16,
    marginRight: 5,
  },
});

export default SelectorButton;
