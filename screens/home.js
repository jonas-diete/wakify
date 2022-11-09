import { Text, View, Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../src/utils/styles.js'
import registerForPushNotificationsAsync from '../src/utils/registerForPushNotifications';
import React, { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable.js';


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
      <Image
        style={styles.logo}
        source={require('../assets/wakify.png')}
      />
      <Pressable style={styles.button}
         onPress={() => navigation.navigate('SelectTime')}>
        <Text style={styles.text}>Notification Time</Text>
      </Pressable>
      <Pressable style={styles.button} 
        onPress={() => navigation.navigate('SelectMood')}>
        <Text style={styles.text}>Select Your Mood</Text>
      </Pressable>
      <Pressable style={styles.button} 
        onPress={() => navigation.navigate('SelectGenre')}>
        <Text style={styles.text}>Favourite Genres</Text>
      </Pressable>
    </View>
  );
}

  
export default Home;