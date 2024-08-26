import { View, Text, StyleSheet } from "react-native";
import React from "react";

export function Container({ children, style }) {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
}

export function Row({ children, alignItems, justifyContent, gap, style }) {
  return (
    <View
      style={{
        ...styles.row,
        alignItems: alignItems ? alignItems : "baseline",
        justifyContent: justifyContent ? justifyContent : "flex-start",
        gap: gap ? gap : 0,
        ...style,
      }}
    >
      {children}
    </View>
  );
}

export function Column({ children, style }) {
  return <View style={{ ...styles.column, ...style }}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
});
