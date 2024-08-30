import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import CarList from "@/components/CarList";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch from react-redux // useSelector untuk mengakses state dari store, useDispatch untuk mengirim action ke store
import { getCar, selectCar } from "@/redux/reducers/car/carSlice"; // Import getCar and selectCar from carSlice // getCar untuk mengambil data dari API, selectCar untuk mengakses state dari store

export default function ListCar() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isError, errorMessage } = useSelector(selectCar);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup
    setLoading(true); //loading state
    dispatch(getCar(signal));
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
