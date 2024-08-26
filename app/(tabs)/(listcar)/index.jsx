import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import CarList from "@/components/CarList";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Constants from "expo-constants";
import { router } from "expo-router";

export default function ListCar() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    setLoading(true); //loading state
    const getData = async () => {
      try {
        const response = await fetch(
          "https://api-car-rental.binaracademy.org/customer/car",
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
      <ThemedView style={styles.header}>
        <ThemedText type="label">Daftar Mobil</ThemedText>
      </ThemedView>
      <ThemedView style={styles.listCar}>
        <FlatList
          data={cars}
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  header: {
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 2,
    padding: 20,
    marginBottom: 10,
  },
  listCar: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
