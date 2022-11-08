import AsyncStorage from '@react-native-async-storage/async-storage';

const getAccessToken = async (token) => {
  try {
    const value = await AsyncStorage.getItem(token)
    if(value !== null) {
      // value previously stored
    }
    return value;
  } catch(e) {
    // error reading value
  }
}

export default getAccessToken;
