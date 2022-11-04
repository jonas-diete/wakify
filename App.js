import React, { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from './src/utils/registerForPushNotifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home.js'
import DetailsScreen from './screens/details.js'
import SelectTime from './screens/SelectTime'
import SelectMood from './screens/SelectMood'

// sets the notifications to show up even when app is in foreground (mainly for testing - can be deleted later)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();

function App(){

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="SelectTime" component={SelectTime} />
        <Stack.Screen name="SelectMood" component={SelectMood} />
      </Stack.Navigator>
    </NavigationContainer>  
  );
}


export default App ;