import * as SecureStore from "expo-secure-store";

export function getUser() {
  const user = SecureStore.getItem("user");
  return user;
}

export function deleteUser() {
  return SecureStore.deleteItemAsync("user");
}

export async function saveUser(user) {
  return await SecureStore.setItem("user", JSON.stringify(user));
}
