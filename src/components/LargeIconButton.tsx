import { Children, cloneElement, FC, isValidElement, ReactNode } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  children?: ReactNode;
}

const LargeIconButton: FC<Props> = ({
  title,
  onPress,
  children,
}): JSX.Element => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.button}
        activeOpacity={0.8}
      >
        {Children.map(children, (child) => {
          if (!isValidElement(child)) return;
          return cloneElement(child, {
            ...child.props,
            style: { ...styles.icon, ...child.props.style },
          });
        })}
      </TouchableOpacity>
      <Text style={styles.btnLabel}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 120,
    height: 120,
    marginVertical: 25,
  },
  button: {
    width: "100%",
    height: "100%",
    borderWidth: 4,
    borderColor: "#6c91DE",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnLabel: {
    textAlign: "center",
    fontWeight: "500",
  },
  icon: {
    color: "#6c91DE",
    fontSize: 55,
  },
});

export default LargeIconButton;
