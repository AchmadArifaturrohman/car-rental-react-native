import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { router } from "expo-router";
import Constants from "expo-constants";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getUser, deleteUser } from "@/components/GetUser";

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUser();
      if (user) {
        setUserData(JSON.parse(user));
      }
    }
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await deleteUser();
    setUserData(null);
    router.navigate("../(auth)");
  };

  const handleRegister = () => {
    router.navigate("../(auth)/Register");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="label">Akun</ThemedText>
      </ThemedView>
      {userData ? (
        <ThemedView style={styles.profile}>
          <ThemedView style={styles.profileImage}>
            <Image
              source={require("@/assets/images/img-photo.png")}
              style={styles.imageProfile}
            />
          </ThemedView>
          <ThemedText type="label">{userData.email}</ThemedText>
          <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
            <Text style={styles.logOutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </ThemedView>
      ) : (
        <ThemedView style={styles.profile}>
          <Image source={require("@/assets/images/park.png")} />
          <ThemedText type="label" style={styles.text}>
            Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di
            TMMIN Car Rental lebih mudah
          </ThemedText>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleRegister}
          >
            <Text style={styles.signInButtonText}>Register</Text>
          </TouchableOpacity>
        </ThemedView>
      )}
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
  profileImage: {
    marginBottom: 20,
  },
  imageProfile: {
    width: 200,
    height: 200,
  },
  logOutButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  logOutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
});
