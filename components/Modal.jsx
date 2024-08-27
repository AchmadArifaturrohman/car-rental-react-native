import { Modal } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";

export default function ModalPopup({ visible, children }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <ThemedView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        {children}
      </ThemedView>
    </Modal>
  );
}
