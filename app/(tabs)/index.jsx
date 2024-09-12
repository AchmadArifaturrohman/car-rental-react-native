import { Text, Image, StyleSheet, View, Button } from "react-native";
import Constants from "expo-constants";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Row, Column, Container } from "@/components/Grid";
import ButtonIcon from "@/components/ButtonIcon";
import CarList from "@/components/CarList";
import { useState, useEffect } from "react";
import ParallaxFlatList from "../../components/ParallaxFlatList";
import { router } from "expo-router";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch from react-redux // useSelector untuk mengakses state dari store, useDispatch untuk mengirim action ke store
import { getCar, selectCar } from "@/redux/reducers/car/carSlice"; // Import getCar and selectCar from carSlice // getCar untuk mengambil data dari API, selectCar untuk mengakses state dari store
import GeoLocation from "@/components/GeoLocation";

export default function HomeScreen() {
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
    <ParallaxFlatList
      headerBackgroundColor={{ light: "#A43333", dark: "#A43333" }}
      headerImage={
        <View style={styles.container}>
          <View>
            <Text style={[styles.titleText, { color: "white" }]}>Hi, Nama</Text>
            <GeoLocation style={styles.titleText} />
          </View>
          <View>
            <Image
              source={require("@/assets/images/img-photo.png")}
              style={styles.imageProfile}
            />
          </View>
        </View>
      }
      banner={
        <>
          <View style={styles.banner}>
            <View style={styles.bannerContainer}>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerText}>
                  Sewa Mobil Berkualitas di Kawasanmu
                </Text>
                <Button color="#4CAF50" title="Sewa Mobil"></Button>
              </View>
              <View>
                <Image source={require("@/assets/images/img-car.png")} />
              </View>
            </View>
          </View>
          <View>
            <Row justifyContent={"space-between"}>
              <Column
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <ButtonIcon name={"car-outline"} color={"#ffffff"} />
                <ThemedText type="label" style={{ fontSize: 13 }} marginTop={5}>
                  Sewa Mobil
                </ThemedText>
              </Column>
              <Column
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <ButtonIcon name={"cube-outline"} color={"#ffffff"} />
                <ThemedText type="label" style={{ fontSize: 13 }} marginTop={5}>
                  Oleh-Oleh
                </ThemedText>
              </Column>
              <Column
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <ButtonIcon name={"key-outline"} color={"#ffffff"} />
                <ThemedText type="label" style={{ fontSize: 13 }} marginTop={5}>
                  Penginapan
                </ThemedText>
              </Column>
              <Column
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <ButtonIcon name={"camera-outline"} color={"#ffffff"} />
                <ThemedText type="label" style={{ fontSize: 13 }} marginTop={5}>
                  Wisata
                </ThemedText>
              </Column>
            </Row>
            <ThemedView style={{ marginTop: 10 }}>
              <ThemedText type="label">Daftar Mobil Pilihan</ThemedText>
            </ThemedView>
          </View>
        </>
      }
      listHeaderComponent={
        <View style={{ paddingHorizontal: 20 }}>
          <ThemedText>Daftar Mobil Pilihan</ThemedText>
        </View>
      }
      loading={isLoading}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 20 }}>
          <CarList
            key={item.id}
            image={{ uri: item.image }}
            carName={item.name}
            passenger={5}
            baggage={4}
            price={item.price}
            onPress={() => router.navigate("(listcar)/details/" + item.id)}
          />
        </View>
      )}
      viewabilityConfig={{
        waitForInteraction: true,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  titleText: {
    fontFamily: "PoppinsBold",
  },
  imageProfile: {
    width: 35,
    height: 35,
  },
  banner: {
    backgroundColor: "#AF392F",
    marginTop: -100,
    overflow: "hidden",
    paddingTop: 20,
    borderRadius: 5,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bannerTextContainer: {
    width: "45%",
    padding: 10,
    paddingBottom: 25,
  },
  bannerText: {
    color: "#ffffff",
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
});
