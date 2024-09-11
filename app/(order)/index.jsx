import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { ProgressSteps, ProgressStep } from "react-native-progress-stepper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Methode from "@/app/(order)/payment/Methode";
import Payment from "@/app/(order)/payment/Payment";
import Confirmation from "@/app/(order)/payment/Confirmation";
import Ticket from "@/app/(order)/payment/Ticket";
import FormatCurrency from "@/components/FormatCurrency";
import { useColorScheme } from "react-native";
import moment from "moment";

import {
  selectCarDetails,
  getCarDetails,
} from "@/redux/reducers/car/carDetailsSlice";
import {
  postOrders,
  putOrderSlips,
  selectOrder,
  setCarId,
  resetState,
  setStateByName,
} from "@/redux/reducers/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthLogin } from "@/redux/reducers/auth/authSlice";

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

const FooterPayment = ({ onPress, colorScheme }) => (
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
        style={[
          stylesPayment.button,
          stylesPayment.whiteButton,
          colorScheme === "dark"
            ? { backgroundColor: "#000" }
            : { backgroundColor: "#fff" },
        ]}
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

const FooterTicket = ({ onPress, colorScheme }) => (
  <ThemedView style={stylesTicket.footer} isCard>
    <ThemedView style={styles.buttonDaftarPesanan}>
      <TouchableOpacity
        style={[
          stylesTicket.button,
          stylesTicket.whiteButton,
          colorScheme === "dark"
            ? { backgroundColor: "#000" }
            : { backgroundColor: "#fff" },
        ]}
      >
        <ThemedText
          style={[stylesTicket.buttonText, stylesTicket.whiteButtonText]}
        >
          Daftar Pesanan
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  </ThemedView>
);
export default function Order() {
  const colorScheme = useColorScheme();
  const { data } = useSelector(selectCarDetails);
  const dispatch = useDispatch();
  const { currentStep, selectedBank, dataOrder, status, errorMessage } =
    useSelector(selectOrder);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  const user = useSelector(selectAuthLogin);

  const formData = {
    carId: data.id,
    startRentAt: moment().format("YYYY-MM-DD"),
    finishRentAt: moment().add(1, "days").format("YYYY-MM-DD"),
  };

  const handleBayar = async () => {
    dispatch(setCarId(data.id));
    dispatch(postOrders({ token: user.user.access_token, formData }));
  };

  const handleKonfirmasiBayar = async () => {
    setConfirmationModalVisible(true);
    //dispatch(setStateByName({ name: "currentStep", value: 2 }));
  };

  const progressStepStyle = {
    activeStepNumColor: "black",
    activeLabelColor: "black",
    disabledStepNumColor: "white",
    completedStepNumColor: "green",
  };

  useEffect(() => {
    if (status === "success") {
      dispatch(setStateByName({ name: "currentStep", value: 1 }));
    } else if (status === "error") {
      console.log("errorMessage", errorMessage);
    }
  }, [status]);

  return (
    <ThemedView style={styles.container}>
      <ProgressSteps activeStep={currentStep}>
        <ProgressStep label="Pilih Metode" removeBtnRow={true}>
          <ThemedView style={styles.pilihMetode}>
            <Methode data={data} />
          </ThemedView>
        </ProgressStep>
        <ProgressStep label="Bayar" removeBtnRow={true}>
          <ThemedView style={styles.bayar}>
            <Payment
              data={data}
              setConfirmationModalVisible={confirmationModalVisible}
            />
          </ThemedView>
        </ProgressStep>
        <ProgressStep label="Tiket" removeBtnRow={true}>
          <ThemedView style={styles.tiket}>
            <Ticket />
          </ThemedView>
        </ProgressStep>
      </ProgressSteps>
      {currentStep === 0 ? (
        <FooterMethode
          price={data?.price || 0}
          selectedBank={selectedBank}
          onPress={() => {
            handleBayar();
          }}
        />
      ) : currentStep === 1 ? (
        <FooterPayment
          onPress={() => handleKonfirmasiBayar()}
          colorScheme={colorScheme}
        />
      ) : (
        currentStep === 2 && (
          <FooterTicket
            onPress={() =>
              dispatch(setStateByName({ name: "currentStep", value: 3 }))
            }
            colorScheme={colorScheme}
          />
        )
      )}
      <Confirmation
        visible={confirmationModalVisible}
        onClose={() => setConfirmationModalVisible(false)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pilihMetode: {},
  bayar: {},
  tiket: {},
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

const stylesTicket = StyleSheet.create({
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
