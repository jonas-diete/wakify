import * as Notifications from 'expo-notifications';

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Good Morning!",
      body: 'Tap to set your mood',
      data: { data: 'goes here' },
    },
    trigger: { 
      seconds: 10,
      // TODO update with correct time user has entered, e.g. 8:00am is this:
      // hour: 8,
      // minute: 0,
      // repeats: true
    },
  });
}

export default schedulePushNotification;