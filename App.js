import React, { useEffect, useRef } from 'react';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
// import { Expo } from 'expo-server-sdk';

let pushToken;
// let expo = new Expo();

const registerForPushNotificationsAsync = async () => {
  let token;

  if (Constants.isDevice) {
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

    // obtain the expo token
    token = (await Notifications.getExpoPushTokenAsync()).data;

    // log the expo token in order to play with it
    console.log(token);
  } else {

    // notifications only work on physcal devices
    alert('Must use physical device for Push Notifications');
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

  pushToken = token;
  return token;
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

  // // SENDING A PUSH NOTIFICATION
  // let messages = [];
  // messages.push({
  //   to: pushToken,
  //   sound: 'default',
  //   body: 'This is a test notification',
  //   data: { withSome: 'data' },
  // })

  // let chunks = expo.chunkPushNotifications(messages);
  // let tickets = [];
  // (async () => {
  //   // Send the chunks to the Expo push notification service. There are
  //   // different strategies you could use. A simple one is to send one chunk at a
  //   // time, which nicely spreads the load out over time:
  //   for (let chunk of chunks) {
  //     try {
  //       let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
  //       console.log(ticketChunk);
  //       tickets.push(...ticketChunk);
  //       // NOTE: If a ticket contains an error code in ticket.details.error, you
  //       // must handle it appropriately. The error codes are listed in the Expo
  //       // documentation:
  //       // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // })();

  return (
    <View style={styles.container}>
      <Text>Wakify - matches your mood to a playlist</Text>
      <StatusBar style="auto" />
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(pushToken);
        }}
      />
    </View>
  );
}

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',

    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
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


