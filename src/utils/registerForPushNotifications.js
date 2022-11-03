import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native'

const registerForPushNotificationsAsync = async () => {
  // check for notification permission
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    // if we dont have the permission we ask for it
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    // user didnt allow us to receive notifications
    alert('Failed to get push token for push notification!');
    return;
  }

  // android configuration
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#3432a8',
    });
  }
}

export default registerForPushNotificationsAsync;