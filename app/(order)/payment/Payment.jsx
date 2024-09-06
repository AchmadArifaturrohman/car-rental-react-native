import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import CarList from "@/components/CarList";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import FormatCurrency from "@/components/FormatCurrency";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import CountDown from "react-native-countdown-component-maintained";
import * as Clipboard from "expo-clipboard";

import Confirmation from "./Confirmation";

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

export default function Payment({
  data,
  loading,
  setActiveStep,
  setConfirmationModalVisible,
}) {
  const colorScheme = useColorScheme();
  const [newLoading, setNewLoading] = useState(true);
  const [newData, setNewData] = useState(null);
  const { selectedBank, promo, dataOrder, currentStep } =
    useSelector(selectOrder);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
  };

  useEffect(() => {
    console.log("dataOrder", dataOrder);
  }, [dataOrder]);
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="label" style={styles.selesaikanPembayaran}>
          Selesaikan Pembayaran Sebelum{"     "}
        </ThemedText>
        <CountDown
          until={86400}
          onFinish={() => alert("Selesai")}
          digitStyle={{ backgroundColor: "#FA2C5A" }}
          digitTxtStyle={{ color: "#fff" }}
          timeToShow={["H", "M", "S"]}
          timeLabels={{ h: "Jam", m: "Menit", s: "Detik" }}
          size={12}
          showSeparator={false}
          separatorStyle={{
            color: colorScheme === "dark" ? "#fff" : "#000",
            justifyContent: "center",
          }}
        />
      </ThemedView>
      <ThemedText type="label" style={styles.tanggal}>
        {getDate24()} WIB
      </ThemedText>
      <ThemedView style={styles.listCar}>
        {data ? (
          <CarList
            key={data.id}
            image={{ uri: data.image }}
            carName={data.name}
            passenger={5}
            baggage={4}
            price={data?.price - (data?.price * promo) / 100}
            promo={promo}
            currentStep={currentStep}
          />
        ) : (
          <ThemedView>
            <ThemedText>No results</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
      <ThemedView style={styles.textPilihBank}>
        <ThemedText style={styles.pilihBankTitle} type="label">
          Lakukan Transfer ke
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.pilihBank}>
        <TouchableOpacity style={styles.bankOption} disabled={true}>
          <ThemedView style={styles.bankShape}>
            <ThemedText style={styles.bankName}>{selectedBank.name}</ThemedText>
          </ThemedView>
          <ThemedText style={styles.transferName}>
            {selectedBank.transferName}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.formRekening}>
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.inputLabel}>Nomor Rekening</ThemedText>
          <ThemedView style={styles.inputWrapper}>
            <ThemedText style={styles.inputText}>12779773</ThemedText>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => {
                copyToClipboard((12779773).toString());
              }}
            >
              <Ionicons
                name="copy-outline"
                size={20}
                color={colorScheme === "dark" ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.inputLabel}>
            Total Bayar{" "}
            {promo ? (
              <ThemedText type="label" style={{ color: "#5CB85F" }}>
                ( Dengan Promo {promo}%)
              </ThemedText>
            ) : null}
          </ThemedText>
          <ThemedView style={styles.inputWrapper}>
            <ThemedText style={styles.inputText}>
              <FormatCurrency
                amount={data?.price - (data?.price * promo) / 100}
              />
            </ThemedText>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => {
                Clipboard.setStringAsync(
                  (data?.price - (data?.price * promo) / 100).toString()
                );
              }}
            >
              <Ionicons
                name="copy-outline"
                size={20}
                color={colorScheme === "dark" ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 0,
  },
  selesaikanPembayaran: {
    fontSize: 14,
  },
  tanggal: {
    fontSize: 14,
  },
  listCar: {
    flex: 1,
  },
  textPilihBank: {
    marginTop: 20,
    marginBottom: 5,
  },
  pilihBankTitle: {
    fontSize: 16,
  },
  pilihBankDescription: {
    fontSize: 14,
  },
  pilihBank: {
    marginTop: 5,
  },
  bankOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.25,
    borderBottomColor: "#e0e0e0",
  },
  bankShape: {
    width: 80,
    height: 30,
    borderWidth: 0.25,
    borderColor: "#ccc",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  bankName: {
    fontSize: 16,
  },
  transferName: {
    fontSize: 14,
    flex: 1,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  formRekening: {
    marginTop: 5,
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
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
  textKonfirmasi: {
    fontSize: 16,
    marginBottom: 5,
  },
  footer: {
    position: "fixed",
    bottom: 0,
    paddingVertical: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#3D7B3F",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  whiteButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#3D7B3F",
  },
  whiteButtonText: {
    color: "#3D7B3F",
  },
  buttonKonfirmasi: {
    marginTop: 10,
  },
  buttonDaftarPesanan: {
    marginTop: 20,
  },
});
