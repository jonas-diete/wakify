import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from './src/utils/registerForPushNotifications';
import schedulePushNotification from './src/utils/schedulePushNotification';

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


