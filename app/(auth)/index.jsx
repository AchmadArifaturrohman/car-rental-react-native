import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  postAuthLogin,
  selectAuthLogin,
  closeModal,
} from "@/redux/reducers/auth/authSlice";
import * as Yup from "yup";
import { Formik } from "formik";

const SignupSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function Login() {
  const colorScheme = useColorScheme();

  const {
    user,
    isLoading,
    isError,
    errorMessage,
    isLoginSuccess,
    isModalVisible,
  } = useSelector(selectAuthLogin);

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    dispatch(postAuthLogin(values));
  };

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        dispatch(closeModal());
        if (!isError) {
          //saveUser(user);
          router.replace("../(tabs)");
        }
      }, 1000);
    }
  }, [isModalVisible]);

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
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={SignupSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label} type="label">
                Email
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="Contoh: achmad@gmail.com"
                keyboardType="email-address"
              />
              {errors.email && touched.email ? (
                <Text>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label} type="label">
                Password
              </Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  onChangeText={handleChange("password")}
                  placeholder="min 8 karakter"
                  secureTextEntry={!showPassword}
                  onBlur={handleBlur("password")}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={24}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && touched.password ? (
                <Text>{errors.password}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSubmit}
            >
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Link href="./Register" style={styles.signUpLink}>
            Sign Up for free
          </Link>
        </TouchableOpacity>
      </View>
      <ModalPopup visible={isModalVisible}>
        <View style={styles.modalBackground}>
          <Ionicons
            size={20}
            name={!isError ? "checkmark-circle" : "close-circle"}
            color={colorScheme === "dark" ? "white" : "black"}
            style={{ marginBottom: 10 }}
          />
          <Text>{!isError ? "Login Berhasil!" : errorMessage}</Text>
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
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderWidth: 0,
  },
  passwordToggle: {
    padding: 10,
  },
});
