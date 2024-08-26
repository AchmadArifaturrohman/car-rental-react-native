import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import { ScrollView, StyleSheet, Image, Button, View } from "react-native";
import { useState, useEffect } from "react";
import { Row, Column } from "@/components/Grid";
import Ionicons from "@expo/vector-icons/Ionicons";
import ParallaxScrollView from "@/components/ParallaxScrollView";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function details() {
  const { id } = useLocalSearchParams();
  const [cars, setCars] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    setLoading(true); //loading state
    const getData = async () => {
      try {
        const response = await fetch(
          "https://api-car-rental.binaracademy.org/customer/car/" + id,
          { signal: signal } // UseEffect cleanup
        );
        const body = await response.json();
        setCars(body);
      } catch (e) {
        // Error Handling
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      }
    };
    getData();
    return () => {
      // cancel request sebelum component di close
      controller.abort();
    };
  }, []);
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={{ width: "100%", paddingHorizontal: 20 }}>
        <ThemedText style={{ textAlign: "center" }}>{cars.name}</ThemedText>
        <View style={{ alignItems: "center" }}>
          <Row alignItems="center" gap={10}>
            <Column style={styles.textIcon}>
              <Ionicons name="people-outline" size={12} color="#8A8A8A" />
              <ThemedText style={styles.capacityText}>{5}</ThemedText>
            </Column>
            <Column style={styles.textIcon}>
              <Ionicons name="bag-outline" size={12} color="#8A8A8A" />
              <ThemedText style={styles.capacityText}>{3}</ThemedText>
            </Column>
          </Row>
        </View>
        {cars.image && (
          <Image
            source={{ uri: cars.image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Tentang Paket</ThemedText>

          <ThemedText style={styles.sectionTitle}>Include</ThemedText>
          <Column gap={5}>
            <Row alignItems="flex-start">
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.bulletItem}>
                Apa saja yang termasuk dalam paket misal durasi max 12 jam
              </ThemedText>
            </Row>
            <Row alignItems="flex-start">
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.bulletItem}>
                Sudah termasuk bensin selama 12 jam
              </ThemedText>
            </Row>
            <Row alignItems="flex-start">
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.bulletItem}>
                Sudah termasuk Tiket Wisata
              </ThemedText>
            </Row>
            <Row alignItems="flex-start">
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.bulletItem}>
                Sudah termasuk pajak
              </ThemedText>
            </Row>
          </Column>

          <ThemedText style={styles.sectionTitle}>Exclude</ThemedText>
          <Column gap={5}>
            <Row alignItems="flex-start">
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.bulletItem}>
                Tidak termasuk biaya makan sopir Rp 75.000/hari
              </ThemedText>
            </Row>
            <Row alignItems="flex-start">
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.bulletItem}>
                Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                20.000/jam
              </ThemedText>
            </Row>
            <Row alignItems="flex-start">
              <ThemedText style={styles.bullet}>•</ThemedText>
              <ThemedText style={styles.bulletItem}>
                Tidak termasuk akomodasi penginapan
              </ThemedText>
            </Row>
          </Column>
        </ThemedView>
      </ScrollView>
      <ThemedView style={styles.footer} isCard>
        <ThemedText label="title" style={styles.price}>
          {formatCurrency.format(cars.price)}
        </ThemedText>
        <Button title="Lanjutkan Pembayaran" color="#3D7B3F" />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: "center",
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
    marginBottom: 30,
    width: "100%",
  },
  image: {
    marginVertical: 10,
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  price: {
    fontSize: 16,
    marginBottom: 5,
  },
  footer: {
    position: "fixed",
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
  },
  capacityText: {
    color: "#8A8A8A",
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  bullet: {
    width: 20,
    fontSize: 14,
    lineHeight: 20,
  },
  bulletItem: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
});
