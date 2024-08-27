import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Link, router } from "expo-router";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { ThemedTextInput as TextInput } from "@/components/ThemedTextInput";
import { Colors } from "@/constants/Colors";
import ModalPopup from "@/components/Modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { saveUser } from "@/components/GetUser";

export default function Login() {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (name, text) => {
    setFormData({
      ...formData,
      [name]: text,
    });
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.message || body[0].message || "Ada Kesalahan!");
      }
      saveUser(body);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        router.navigate("../(tabs)");
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setErrorMessage(null);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            colorScheme === "dark"
              ? Colors.dark.tmminLogoDark
              : Colors.light.tmminLogoLight
          }
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.navigate("../(tabs)")}
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title} type="title">
        Welcome Back!
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label} type="label">
          Email
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="Contoh: achmad@gmail.com"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label} type="label">
          Password
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange("password", text)}
          placeholder="6+ karakter"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => handleSubmit()}
      >
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Link href="./Register" style={styles.signUpLink}>
            Sign Up for free
          </Link>
        </TouchableOpacity>
      </View>
      <ModalPopup visible={modalVisible}>
        <View style={styles.modalBackground}>
          <Ionicons
            size={20}
            name={
              errorMessage == null || errorMessage == ""
                ? "checkmark-circle"
                : "close-circle"
            }
            color={colorScheme === "dark" ? "white" : "black"}
            style={{ marginBottom: 10 }}
          />
          <Text>
            {errorMessage == null || errorMessage == ""
              ? "Login Berhasil!"
              : errorMessage}
          </Text>
        </View>
      </ModalPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 32,
  },
  logo: {
    width: 200,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
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
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
  },
  signUpLink: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    fontWeight: "700",
  },
  modalBackground: {
    width: "90%",
    elevation: 20,
    padding: 25,
    borderRadius: 4,
    margin: 10,
    alignItems: "center",
    borderWidth: 0.2,
    shadowRadius: 10,
    shadowOpacity: 0.35,
    shadowOffset: { width: 3, height: 5 },
  },
});
