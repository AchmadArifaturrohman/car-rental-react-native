import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";

import { useSelector, useDispatch } from "react-redux";
import { selectOrder } from "@/redux/reducers/order/orderSlice";

export default function Ticket({ data }) {
  const colorScheme = useColorScheme();
  const bankOptions = [{ name: "BCA", transferName: "BCA Transfer" }];
  const { dataOrder } = useSelector(selectOrder);
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
    setImage(dataOrder.slip);
  }, []);
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.invoiceContainer}>
        <ThemedText style={styles.textHeader}>Invoice</ThemedText>
        <ThemedView style={styles.inputWrapper}>
          <ThemedText style={styles.inputText} type="label">
            INV/{dataOrder.UserId}/{dataOrder.CarId}-{dataOrder.id}/
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
        <ThemedView
          style={dataOrder.slip ? styles.imageUploaded : styles.imageUpload}
        >
          {dataOrder.slip ? (
            <Image
              source={{ uri: dataOrder.slip }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Ionicons color={"#3C3C3C"} name="image-outline" size={40} />
          )}
        </ThemedView>
        <ThemedText style={styles.textHeader}>
          Tunjukkan tiket ini ke petugas JBO di pos penjemputan Anda.
        </ThemedText>
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
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
