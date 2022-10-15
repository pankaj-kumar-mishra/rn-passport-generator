import { FC } from "react";
import { StyleSheet, View, Text, Modal, Pressable } from "react-native";

interface Props {
  visible: boolean;
  isDanger?: boolean;
  title?: string;
  message: string;
  cancelTitle?: string;
  confirmTitle?: string;
  onCancelPress: () => void;
  onConfirmPress: () => void;
}

const ConfirmModal: FC<Props> = ({
  visible,
  isDanger,
  title = "Are you sure?",
  message,
  cancelTitle = "Cancel",
  confirmTitle = "Okay",
  onCancelPress,
  onConfirmPress,
}): JSX.Element => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalMessage}>{message}</Text>
          </View>
          <View style={styles.btnContainer}>
            <Pressable
              onPress={onCancelPress}
              style={[styles.btnCommon, styles.btnCancel]}
            >
              <Text>{cancelTitle}</Text>
            </Pressable>
            <Pressable
              onPress={onConfirmPress}
              style={[
                styles.btnCommon,
                { backgroundColor: isDanger ? "#F53649" : "#6C9ADE" },
              ]}
            >
              <Text style={{ color: "#fff" }}>{confirmTitle}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  modalTitle: {
    fontWeight: "500",
    fontSize: 16,
    color: "#6C9ADE",
    textAlign: "center",
    marginBottom: 10,
  },
  modalMessage: {
    color: "#272727",
    opacity: 0.8,
    lineHeight: 20,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  btnCommon: {
    height: 40,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 5,
  },
  btnCancel: {
    borderWidth: 1.5,
    borderColor: "#6C9ADE",
  },
});

export default ConfirmModal;
