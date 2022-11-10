import React from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home.js'
import SelectTime from './screens/SelectTime'
import SelectMood from './screens/SelectMood'
import SelectGenre from './screens/SelectGenre'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} 
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#FB6E6E',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
        <Stack.Screen name="SelectTime" component={SelectTime} 
          options={{
            title: 'Select Time',
            headerStyle: {
              backgroundColor: '#FB6E6E',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name="SelectMood" component={SelectMood} 
          options={{
            title: 'Select Mood',
            headerStyle: {
              backgroundColor: '#FB6E6E',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name="SelectGenre" component={SelectGenre} 
          options={{
            title: 'Select Genre',
            headerStyle: {
              backgroundColor: '#FB6E6E',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>  
  );
}


export default App;