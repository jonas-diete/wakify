import React from 'react';
import { Text, View, Button, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../src/utils/styles.js'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable.js';

function Home({ navigation }){
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