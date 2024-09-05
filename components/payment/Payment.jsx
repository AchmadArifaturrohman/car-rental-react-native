import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import CarList from "../../../components/CarList";
import { useSelector, useDispatch } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import {
  selectCarDetails,
  getCarDetails,
} from "@/redux/reducers/car/carDetailsSlice";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedText } from "../../../components/ThemedText";

export default function Payment() {
  return (
    <ThemedView style={styles.listCar}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              style={{ marginTop: 30 }}
              animating={true}
              size="large"
              color="#00ff00"
            />
          ) : (
            <ThemedView>
              <ThemedText>0 results</ThemedText>
            </ThemedView>
          )
        }
        renderItem={({ item }) => (
          <CarList
            key={item.id}
            image={{ uri: item.image }}
            carName={item.name}
            passenger={5}
            baggage={4}
            price={item.price}
            onPress={() => router.navigate("details/" + item.id)}
          />
        )}
        viewabilityConfig={{
          waitForInteraction: true,
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listCar: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
