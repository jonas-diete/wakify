import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from './src/utils/registerForPushNotifications';

// sets the notifications to show up even when app is in foreground (mainly for testing - can be deleted later)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const responseListener = useRef();

  useEffect( () => {
    // Register device for push notifications
    registerForPushNotificationsAsync();

    // Listening for user tapping/interacting with notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      notificationNavigationHandler(response.notification.request.content);
    });

    // removing listeners
    return () => {
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const notificationNavigationHandler = ({ data }) => {
    // add logic here to navigate to a specific app screen
    console.log('A notification has been tapped', data)
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
      // TODO update with correct time user has entered, e.g. 8:00am is this:
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
});


