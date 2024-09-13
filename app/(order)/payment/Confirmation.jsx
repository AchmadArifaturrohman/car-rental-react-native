import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import CountDown from "react-native-countdown-component-maintained";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  putOrderSlips,
  setStateByName,
  selectOrder,
} from "@/redux/reducers/order/orderSlice";
import { selectAuthLogin } from "@/redux/reducers/auth/authSlice";
import ModalPopup from "@/components/Modal";

export default function Confirmation({ visible, onClose }) {
  const colorScheme = useColorScheme();
  const [image, setImage] = useState(null);
  const { user } = useSelector(selectAuthLogin);
  const { dataOrder, status, errorMessage } = useSelector(selectOrder);
  const dispatch = useDispatch();
  const [ModalVisible, setModalVisible] = useState(false);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    if (!result.canceled) {
      setImage({
        uri: result.assets[0].uri,
        name: result.assets[0].fileName,
        type: result.assets[0].mimeType,
      });
    }
  };

  const handleUpload = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("slip", image);
      dispatch(
        putOrderSlips({ token: user.access_token, id: dataOrder.id, formData })
      );
      console.log("formData confirmation", formData);
    } else {
      setModalVisible(true);
    }
  };
  useEffect(() => {
    if (image && status === "upload-success") {
      setModalVisible(true);
    } else if (image && status === "upload-error") {
      setModalVisible(true);
    }
  }, [status]);

  useEffect(() => {
    if (ModalVisible) {
      setTimeout(() => {
        if (image && status === "upload-success") {
          dispatch(setStateByName({ name: "currentStep", value: 2 }));
        }
        setModalVisible(false);
        onClose();
      }, 1500);
    }
  }, [ModalVisible]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <ThemedView style={styles.container}>
          <ThemedView style={styles.header}>
            <ThemedText style={styles.title}>Konfirmasi Pembayaran</ThemedText>
            <ThemedText style={styles.message}>
              Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu
              akan segera kami cek tunggu kurang lebih 10 menit untuk
              mendapatkan konfirmasi.
            </ThemedText>
            <CountDown
              until={600}
              onFinish={() => alert("Waktu habis")}
              digitStyle={{ backgroundColor: "#FA2C5A" }}
              digitTxtStyle={{ color: "#fff" }}
              timeToShow={["M", "S"]}
              timeLabels={{ m: "Menit", s: "Detik" }}
              size={12}
              showSeparator={false}
              separatorStyle={{
                color: colorScheme === "dark" ? "#fff" : "#000",
              }}
            />
          </ThemedView>
          <ThemedView style={styles.upload}>
            <ThemedText style={styles.uploadTitle}>
              Upload Bukti Pembayaran
            </ThemedText>
            <ThemedText style={styles.uploadMessage}>
              Untuk membantu kami lebih cepat melakukan pengecekan. Kamu bisa
              upload bukti bayarmu
            </ThemedText>
            <TouchableOpacity
              style={image ? styles.imageUploaded : styles.imageUpload}
              onPress={pickImage}
            >
              {image ? (
                <Image source={{ uri: image.uri }} style={styles.image} />
              ) : (
                <Ionicons color={"#3C3C3C"} name="image-outline" size={40} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleUpload}
            >
              <ThemedText style={styles.uploadButtonText}>Upload</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orderListButton}>
              <ThemedText style={styles.orderListButtonText}>
                Lihat Daftar Pesanan
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        ></TouchableOpacity>
      </TouchableOpacity>
      <ModalPopup visible={ModalVisible}>
        <ThemedView style={styles.modalBackground}>
          <Ionicons
            size={20}
            name={
              image && status === "upload-success"
                ? "checkmark-circle"
                : image && status === "upload-error"
                ? "close-circle"
                : "image-outline"
            }
            color={colorScheme === "dark" ? "white" : "black"}
            style={{ marginBottom: 10 }}
          />
          <ThemedText>
            {image && status === "upload-success"
              ? `Berhasil mengupload bukti pembayaran`
              : image && status === "upload-error"
              ? `Gagal mengupload bukti pembayaran`
              : "Silahkan upload bukti pembayaran"}
          </ThemedText>
        </ThemedView>
      </ModalPopup>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
    padding: 20,
  },
  container: {
    padding: 20,
    borderRadius: 20,
  },
  header: {},
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    marginBottom: 10,
    textAlign: "center",
  },
  timer: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    alignSelf: "center",
    marginVertical: 10,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  uploadMessage: {
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
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
  imageIcon: {
    width: 40,
    height: 40,
  },
  uploadButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  uploadButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  orderListButton: {
    borderWidth: 1,
    borderColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  orderListButtonText: {
    color: "#4CAF50",
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
