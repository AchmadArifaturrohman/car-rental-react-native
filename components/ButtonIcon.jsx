import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ButtonIcon({ onPress, style, ...rest }) {
  return (
    <Pressable onPress={onPress} style={styles.box}>
      <Ionicons size={32} style={[style]} {...rest} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 8,
    backgroundColor: "#A43333",
    padding: 10,
  },
});
