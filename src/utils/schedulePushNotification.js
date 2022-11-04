import * as Notifications from 'expo-notifications';

async function schedulePushNotification(hour, minute) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Good Morning!",
      body: 'Tap to set your mood',
      // data: { data: 'goes here' },
    },
    trigger: { 
      hour: hour,
      minute: minute,
      repeats: true
    },
  });
}

export default schedulePushNotification;