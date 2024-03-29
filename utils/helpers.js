import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  const token = AsyncStorage.getItem("authToken");
  return token ? token : null;
};

