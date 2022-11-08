import React from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home.js'
import DetailsScreen from './screens/details.js'
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
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="SelectTime" component={SelectTime} />
        <Stack.Screen name="SelectMood" component={SelectMood} />
        <Stack.Screen name="SelectGenre" component={SelectGenre} />
      </Stack.Navigator>
    </NavigationContainer>  
  );
}


export default App;