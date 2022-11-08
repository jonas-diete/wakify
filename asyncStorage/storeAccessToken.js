import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenError } from 'expo-auth-session';

const storeAccessToken = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}

export default storeAccessToken;