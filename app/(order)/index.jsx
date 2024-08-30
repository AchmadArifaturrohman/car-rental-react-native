import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ProgressSteps, ProgressStep } from "react-native-progress-stepper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Order() {
  return (
    <ThemedView style={styles.container}>
      <ProgressSteps style={styles.progressSteps}>
        <ProgressStep label="Pilih Metode" style={styles.progressStep}>
          <ThemedView style={styles.pilihMetode}>
            <ThemedText type="label">Pilih Metode</ThemedText>
          </ThemedView>
        </ProgressStep>
        <ProgressStep label="Bayar">
          <ThemedView style={styles.bayar}>
            <ThemedText type="label">Bayar</ThemedText>
          </ThemedView>
        </ProgressStep>
        <ProgressStep label="Tiket">
          <ThemedView style={styles.tiket}>
            <ThemedText type="label">Tiket</ThemedText>
          </ThemedView>
        </ProgressStep>
      </ProgressSteps>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  progressSteps: {
    marginTop: 0,
  },
  progressStep: {
    color: "red",
  },
  pilihMetode: {
    alignItems: "center",
    justifyContent: "center",
  },
  bayar: {
    alignItems: "center",
    justifyContent: "center",
  },
  tiket: {
    alignItems: "center",
    justifyContent: "center",
  },
});
