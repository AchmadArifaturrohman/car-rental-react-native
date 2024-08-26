import { StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import CarList from "@/components/CarList";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Constants from "expo-constants";
import { router } from "expo-router";

export default function ListCar() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="label">Akun</ThemedText>
      </ThemedView>
      <ThemedView style={styles.profile}>
        <Image source={require("@/assets/images/park.png")} />
        <ThemedText type="label" style={styles.text}>
          Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN
          Car Rental lebih mudah
        </ThemedText>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => router.navigate("../(auth)/Register")}
        >
          <Text style={styles.signInButtonText}>Register</Text>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  header: {
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 2,
    padding: 20,
    marginBottom: 10,
  },
  profile: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 10,
    textAlign: "center",
  },
  signInButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  signInButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
});
