import React, { useEffect, useRef } from 'react';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Button, Text, View, Alert, TouchableOpacity, Image  } from 'react-native';
import * as Notifications from 'expo-notifications';

const registerForPushNotificationsAsync = async () => {
    // we check if we have access to the notification permission
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      // if we dontt have access to it, we ask for it
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      // user doesnt allow us to access to the notifications
      alert('Failed to get push token for push notification!');
      return;
    }

  // some android configuration
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

}

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect( () => {
    // Register for push notification
    const token = registerForPushNotificationsAsync();

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      notificationCommonHandler(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification 
    // (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      notificationCommonHandler(response.notification);
      notificationNavigationHandler(response.notification.request.content);
    });

    // The listeners must be clear on app unmount
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const notificationCommonHandler = (notification) => {
    // save the notification to reac-redux store
    console.log('A notification has been received', notification)
  }

  const notificationNavigationHandler = ({ data }) => {
    // navigate to app screen
    console.log('A notification has been touched', data)
  }

  return (
    <View style={styles.container}>
      <Text>Wakify - matches your mood to a playlist</Text>
      <StatusBar style="auto" />
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
      <View>
        <TouchableOpacity onPress={() => Alert.alert("Happy Emoji pressed")}>
          <Image style={styles.button} source={require('./assets/happy.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Neutral Emoji pressed")}>
          <Image style={styles.button} source={require('./assets/neutral.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Sad Emoji pressed")}>
          <Image style={styles.button} source={require('./assets/sad.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Distraught Emoji pressed")}>
          <Image style={styles.button} source={require('./assets/distraught.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Angry Emoji pressed")}>
          <Image style={styles.button} source={require('./assets/angry.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Tired Emoji pressed")}>
          <Image style={styles.button} source={require('./assets/tired.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Active Emoji pressed")}>
          <Image style={styles.button} source={require('./assets/active.png')} />
        </TouchableOpacity>
      </View>
    </View>
    
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Good Morning!",
      body: 'Tap to set your mood',
      data: { data: 'goes here' },
    },
    trigger: { 
      seconds: 10,
      // hour: 8,
      // minute: 0,
      // repeats: true
    },
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
  }
});


