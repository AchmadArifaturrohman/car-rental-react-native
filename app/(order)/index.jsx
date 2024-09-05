import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { ProgressSteps, ProgressStep } from "react-native-progress-stepper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useLocalSearchParams } from "expo-router";
import Methode from "@/app/(order)/payment/Methode";
import Payment from "@/app/(order)/payment/Payment";
import Ticket from "@/app/(order)/payment/Ticket";
import FormatCurrency from "@/components/FormatCurrency";

import {
  selectCarDetails,
  getCarDetails,
} from "@/redux/reducers/car/carDetailsSlice";
import { selectOrder, setStateByName } from "@/redux/reducers/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";

const FooterMethode = ({ price, selectedBank, onPress }) => (
  <ThemedView style={stylesMethode.footer} isCard>
    <ThemedText label="title" style={stylesMethode.price}>
      <FormatCurrency amount={price} />
    </ThemedText>
    <ThemedView style={stylesMethode.buttonBayar}>
      <Button
        title="Bayar"
        color={selectedBank ? "#3D7B3F" : "#C9E7CA"}
        onPress={onPress}
      />
    </ThemedView>
  </ThemedView>
);

const FooterPayment = ({ onPress }) => (
  <ThemedView style={stylesPayment.footer} isCard>
    <ThemedText style={stylesPayment.textKonfirmasi} type="label">
      Klik konfirmasi pembayaran untuk mempercepat proses pengecekan
    </ThemedText>
    <ThemedView style={stylesPayment.buttonKonfirmasi}>
      <TouchableOpacity style={stylesPayment.button} onPress={onPress}>
        <ThemedText style={stylesPayment.buttonText}>
          Konfirmasi Pembayaran
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
    <ThemedView style={styles.buttonDaftarPesanan}>
      <TouchableOpacity
        style={[stylesPayment.button, stylesPayment.whiteButton]}
      >
        <ThemedText
          style={[stylesPayment.buttonText, stylesPayment.whiteButtonText]}
        >
          Daftar Pesanan
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  </ThemedView>
);

export default function Order() {
  const { data } = useSelector(selectCarDetails);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const [currenStep, setActiveStep] = useState(0);
  const { currentStep, selectedBank } = useSelector(selectOrder);

  useEffect(() => {
    setLoading(true);
    // console.log(currentStep);
    // console.log("activeStep", activeStep);
    // console.log("selectedBank", selectedBank);
  }, []);

  const progressStepStyle = {
    activeStepNumColor: "black",
    activeLabelColor: "black",
    disabledStepNumColor: "white",
    completedStepNumColor: "green",
  };

  return (
    <ThemedView style={styles.container}>
      <ProgressSteps activeStep={currentStep}>
        <ProgressStep label="Pilih Metode" removeBtnRow={true}>
          <ThemedView style={styles.pilihMetode}>
            <Methode data={data} loading={loading} />
          </ThemedView>
        </ProgressStep>
        <ProgressStep label="Bayar" removeBtnRow={true}>
          <ThemedView style={styles.bayar}>
            <Payment data={data} loading={loading} />
          </ThemedView>
        </ProgressStep>
        <ProgressStep label="Tiket">
          <ThemedView style={styles.tiket}>
            <ThemedText type="label">Tiket</ThemedText>
          </ThemedView>
        </ProgressStep>
      </ProgressSteps>
      {currentStep === 0 ? (
        <FooterMethode
          price={data?.price || 0}
          selectedBank={selectedBank}
          onPress={() =>
            dispatch(setStateByName({ name: "currentStep", value: 1 }))
          }
        />
      ) : currentStep === 1 ? (
        <FooterPayment
          onPress={() =>
            dispatch(setStateByName({ name: "currentStep", value: 2 }))
          }
        />
      ) : (
        <ThemedView>
          <ThemedText>Tiket</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  pilihMetode: {
    // alignItems: "center",
    // justifyContent: "center",
  },
  bayar: {
    // alignItems: "center",
    // justifyContent: "center",
  },
  tiket: {
    //   alignItems: "center",
    //   justifyContent: "center",
  },
});

const stylesMethode = StyleSheet.create({
  price: {
    fontSize: 14,
    marginBottom: 5,
  },
  footer: {
    position: "fixed",
    bottom: 0,
    paddingVertical: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  buttonBayar: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const stylesPayment = StyleSheet.create({
  textKonfirmasi: {
    fontSize: 14,
    marginBottom: 5,
  },
  footer: {
    position: "fixed",
    bottom: 0,
    paddingVertical: 10,
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 10,
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
    marginBottom: 10,
  },
  buttonDaftarPesanan: {
    marginTop: 20,
    marginBottom: 20,
  },
});
