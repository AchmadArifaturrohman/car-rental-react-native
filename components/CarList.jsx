import { Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Row, Column } from "./Grid";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import FormatCurrency from "./FormatCurrency";

export default function CarList({
  image,
  carName,
  passenger,
  baggage,
  price,
  onPress,
  style,
}) {
  return (
    <Pressable onPress={onPress}>
      <ThemedView style={{ ...styles.card, ...style }}>
        <Row alignItems="center" gap={20}>
          <Column>
            <Image source={image} style={styles.image} />
          </Column>
          <Column>
            <ThemedText style={styles.carName}>{carName}</ThemedText>
            <Row style={{ gap: 5 }}>
              <Column style={styles.textIcon}>
                <Ionicons name="people-outline" size={12} color="#8A8A8A" />
                <ThemedText style={styles.capacityText}>{passenger}</ThemedText>
              </Column>
              <Column style={styles.textIcon}>
                <Ionicons name="bag-outline" size={12} color="#8A8A8A" />
                <ThemedText style={styles.capacityText}>{baggage}</ThemedText>
              </Column>
            </Row>
            <ThemedText style={styles.price}>
              <FormatCurrency amount={price} />
            </ThemedText>
          </Column>
        </Row>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    borderRadius: 2,
    borderWidth: 0.15,
    padding: 20,
    marginTop: 20,
    //ios
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
  },
  image: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },
  carName: {
    fontSize: 14,
  },
  capacityText: {
    color: "#8A8A8A",
  },
  price: {
    color: "#5CB85F",
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
