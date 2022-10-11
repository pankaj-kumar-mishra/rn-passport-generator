import { FC } from "react";
import { StyleSheet, View, Text, Modal, Pressable } from "react-native";

interface Props {
  visible: boolean;
  title: string;
  message: string;
  onCancelPress: () => void;
  onDiscardPress: () => void;
}

const ConfirmModal: FC<Props> = ({
  visible,
  title,
  message,
  onCancelPress,
  onDiscardPress,
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
              <Text>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={onDiscardPress}
              style={[styles.btnCommon, styles.btnDiscard]}
            >
              <Text style={{ color: "#fff" }}>Discard</Text>
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
  btnDiscard: {
    backgroundColor: "#F53649",
  },
});

export default ConfirmModal;
