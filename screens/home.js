import { Text, View, Button} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../src/utils/styles.js'
import registerForPushNotificationsAsync from '../src/utils/registerForPushNotifications';
import React, { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';


function Home({ navigation }){
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
    navigation.navigate('SelectMood')
  }

  return(
  <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Wakify - matches your mood to a playlist</Text>
      <Button
        title="Select Time to Get Notifications"
        onPress={() => navigation.navigate('SelectTime')}
      />
      <Button
        title="Select Your Mood"
        onPress={() => navigation.navigate('SelectMood')}
      />
      <Button
        title="Select Your Favourite Genres"
      />
    </View>
  );
}

  
export default Home;