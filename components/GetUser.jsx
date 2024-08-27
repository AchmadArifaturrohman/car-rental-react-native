import * as SecureStore from "expo-secure-store";

export function getUser() {
  return SecureStore.getItem("user");
}

export function deleteUser() {
  return SecureStore.deleteItemAsync("user");
}

export async function saveUser(user) {
  return await SecureStore.setItem("user", JSON.stringify(user));
}
