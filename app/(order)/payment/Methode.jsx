import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import CarList from "@/components/CarList";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { ThemedTextInput } from "@/components/ThemedTextInput";

import { useSelector, useDispatch } from "react-redux";
import { selectOrder, setStateByName } from "@/redux/reducers/order/orderSlice";
import ModalPopup from "@/components/Modal";
import { useColorScheme } from "react-native";

export default function Methode({ data }) {
  const colorScheme = useColorScheme();
  const [promoCode, setPromoCode] = useState(null);
  const { selectedBank, promo } = useSelector(selectOrder);
  const [ModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const promoCodeText = (text) => {
    setPromoCode(text);
  };
  const bankOptions = [
    {
      name: "BCA",
      transferName: "BCA Transfer",
      account: "1234567890",
      accountName: "John Doe",
    },
    {
      name: "BNI",
      transferName: "BNI Transfer",
      account: "1234567890",
      accountName: "John Doe",
    },
    {
      name: "Mandiri",
      transferName: "Mandiri Transfer",
      account: "1234567890",
      accountName: "John Doe",
    },
    {
      name: "BTN",
      transferName: "BTN Transfer",
      account: "1234567890",
      accountName: "John Doe",
    },
    {
      name: "Permata",
      transferName: "Permata Transfer",
      account: "1234567890",
      accountName: "John Doe",
    },
    {
      name: "BSI",
      transferName: "BSI Transfer",
      account: "1234567890",
      accountName: "John Doe",
    },
  ];

  const listPromo = [
    {
      name: "PROMO10",
      discount: 10,
    },
    {
      name: "PROMO20",
      discount: 20,
    },
    {
      name: "PROMO30",
      discount: 30,
    },
    {
      name: "PROMO40",
      discount: 40,
    },
    {
      name: "PROMO50",
      discount: 50,
    },
  ];

  const promoCodeDiscount = () => {
    dispatch(
      setStateByName({
        name: "promo",
        value:
          listPromo.find((promoName) => promoName.name === promoCode)
            ?.discount || null,
      })
    );
    setModalVisible(true);
  };

  useEffect(() => {
    if (ModalVisible) {
      setTimeout(() => {
        setModalVisible(false);
      }, 1500);
    }
  }, [ModalVisible]);

  useEffect(() => {
    console.log("selectedBank", selectedBank);
    console.log("promo", promo);
    console.log("data", data);
  }, [selectedBank, promo]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.listCar}>
        {data ? (
          <CarList
            key={data.id}
            image={{ uri: data.image }}
            carName={data.name}
            passenger={5}
            baggage={4}
            price={data.price}
          />
        ) : (
          <ThemedView>
            <ThemedText>No results</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
      <ThemedView style={styles.textPilihBank}>
        <ThemedText style={styles.pilihBankTitle}>
          Pilih Bank Transfer
        </ThemedText>
        <ThemedText style={styles.pilihBankDescription}>
          Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau
          Mobile Banking
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.pilihBank}>
        {bankOptions.map((bank, index) => (
          <TouchableOpacity
            key={index}
            style={styles.bankOption}
            onPress={() =>
              dispatch(setStateByName({ name: "selectedBank", value: bank }))
            }
          >
            <ThemedView style={styles.bankShape}>
              <ThemedText style={styles.bankName}>{bank.name}</ThemedText>
            </ThemedView>
            <ThemedText style={styles.transferName}>
              {bank.transferName}
            </ThemedText>
            {selectedBank?.name === bank.name && (
              <ThemedView style={styles.checkmark}>
                <Ionicons name="checkmark" size={16} color="white" />
              </ThemedView>
            )}
          </TouchableOpacity>
        ))}
      </ThemedView>
      <View style={styles.promoCodeShape}>
        <ThemedView style={styles.promoCodeContainer}>
          <ThemedText style={styles.promoCodeTitle}>
            % Pakai Kode Promo
          </ThemedText>
          <ThemedView style={styles.promoCodeInputContainer}>
            <ThemedTextInput
              style={styles.promoCodeInput}
              placeholder="Tulis catatanmu di sini"
              onChangeText={(text) => promoCodeText(text)}
            />
            <TouchableOpacity
              style={[
                styles.promoCodeButton,
                { backgroundColor: promoCode ? "#3D7B3F" : "#C9E7CA" },
              ]}
              onPress={promoCodeDiscount}
            >
              <ThemedText style={styles.promoCodeButtonText} type="label">
                Terapkan
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </View>
      <ModalPopup visible={ModalVisible}>
        <ThemedView style={styles.modalBackground}>
          <Ionicons
            size={20}
            name={promo ? "checkmark-circle" : "close-circle"}
            color={colorScheme === "dark" ? "white" : "black"}
            style={{ marginBottom: 10 }}
          />
          <ThemedText>
            {promo
              ? `Promo ${promo}% Berhasil Diterapkan!`
              : promoCode
              ? `Promo ${promoCode} tidak ditemukan`
              : "Tolong masukkan kode promo"}
          </ThemedText>
        </ThemedView>
      </ModalPopup>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  listCar: {
    flex: 1,
  },
  textPilihBank: {
    marginTop: 20,
    marginBottom: 10,
  },
  pilihBankTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  pilihBankDescription: {
    fontSize: 14,
  },
  pilihBank: {
    marginTop: 10,
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
  promoCodeShape: {
    marginTop: 20,
    borderWidth: 0.25,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 15,
  },
  promoCodeContainer: {},
  promoCodeTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  promoCodeInputContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "#e0e0e0",
    // borderRadius: 8,
  },
  promoCodeInput: {
    flex: 1,
    padding: 10,
    color: "#999",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  promoCodeButton: {
    padding: 10,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: "center",
  },
  promoCodeButtonText: {
    color: "#ffffff",
  },
  price: {
    fontSize: 16,
    marginBottom: 5,
  },
  footer: {
    position: "fixed",
    bottom: 0,
    paddingVertical: 10,
    width: "100%",
  },
  buttonBayar: {
    marginTop: 10,
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
