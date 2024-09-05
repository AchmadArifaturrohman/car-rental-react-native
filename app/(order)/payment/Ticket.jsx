import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import CarList from "@/components/CarList";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";

import { useSelector, useDispatch } from "react-redux";
import { selectOrder, setStateByName } from "@/redux/reducers/order/orderSlice";

function getDate24() {
  const date24 = new Date();
  date24.setHours(date24.getHours() + 24);
  return date24.toLocaleString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export default function Ticket({
  data,
  loading,
  setActiveStep,
  setConfirmationModalVisible,
}) {
  const colorScheme = useColorScheme();
  const [newLoading, setNewLoading] = useState(true);
  const [newData, setNewData] = useState(null);
  // const [selectedBank, setSelectedBank] = useState(null);
  const bankOptions = [{ name: "BCA", transferName: "BCA Transfer" }];
  const { selectedBank, promo } = useSelector(selectOrder);
  const dispatch = useDispatch();
  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  useEffect(() => {
    setNewData(data);
  }, []);
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.invoiceContainer}>
        <ThemedText style={styles.textHeader}>Invoice</ThemedText>
        <ThemedView style={styles.inputWrapper}>
          <ThemedText style={styles.inputText} type="label">
            INV/XX/XX-XXXX/
          </ThemedText>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => {
              copyToClipboard((12779773).toString());
            }}
          >
            <Ionicons
              name="download-outline"
              size={20}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      <ThemedView>
        <ThemedText style={styles.textHeader}>E-Ticket</ThemedText>
        <TouchableOpacity
          style={image ? styles.imageUploaded : styles.imageUpload}
          onPress={pickImage}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Ionicons color={"#3C3C3C"} name="image-outline" size={40} />
          )}
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  invoiceContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  textHeader: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    borderWidth: 0,
  },
  copyButton: {
    padding: 4,
  },
  imageUpload: {
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "dashed",
    borderRadius: 5,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 5,
  },
  imageUploaded: {
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "dashed",
    borderRadius: 5,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 5,
  },
});
