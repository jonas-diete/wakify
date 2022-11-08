// import React from 'react';
import { Text, View, Button, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../src/utils/styles.js'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable.js';
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
      <Text style={logo.text}>Wakify</Text>
      <Text style={caption.text}>matches your mood to a playlist</Text>
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
        onPress={() => navigation.navigate('SelectGenre')}
      />
      <Pressable style={sty.button} 
        onPress={() => navigation.navigate('SelectTime')}>
        <Text style={sty.text}>Experiment</Text>
      </Pressable>
    </View>
  );
}

const sty = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#FB6E6E',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

const logo = StyleSheet.create({
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    paddingHorizontal: 32,
    fontSize: 50,
    lineHeight: 21,
    fontWeight: 'light',
    letterSpacing: 0.25,
    color: '#FB6E6E',
  },
});

const caption = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'light',
    letterSpacing: 0.25,
    color: '#FB6E6E',
  },
});
  
export default Home;