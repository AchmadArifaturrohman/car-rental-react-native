import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import CarList from "@/components/CarList";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import FormatCurrency from "@/components/FormatCurrency";
import { ThemedTextInput } from "@/components/ThemedTextInput";

import { useSelector, useDispatch } from "react-redux";
import { selectOrder, setStateByName } from "@/redux/reducers/order/orderSlice";

export default function Methode({ data }) {
  // const [selectedBank, setSelectedBank] = useState(null);
  const [promoCode, setPromoCode] = useState(null);
  const { selectedBank, promo } = useSelector(selectOrder);
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
  useEffect(() => {
    //setNewData(data);
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
            >
              <ThemedText
                style={styles.promoCodeButtonText}
                type="label"
                onPress={() =>
                  dispatch(setStateByName({ name: "promo", value: promoCode }))
                }
              >
                Terapkan
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </View>
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
});
