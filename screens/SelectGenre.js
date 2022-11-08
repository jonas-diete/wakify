import React, { useEffect, useState } from 'react';
import { Text, View, Button} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../src/utils/styles.js'
import storeData from '../asyncStorage/storeData';
import getData from '../asyncStorage/getData';


function Home({ navigation }){
  const [genre, setGenre] = useState('Loading');
  useEffect(() => {
    async function fetchData() {
      setGenre(await getData('genre'));
    }
    fetchData();
  }, [])
  return(
  <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Choose your favourite genre</Text>
      <Button
        title="Rock"
        onPress={async () => {
          await storeData('genre', 'Rock');
          setGenre(await getData('genre'));
        }}
      />
      <Button
        title="Electronic / Dance Music"
        onPress={async () => {
          await storeData('genre', 'Electronic');
          setGenre(await getData('genre'));
        }}
      />
      <Button
        title="Hip-Hop"
        onPress={async () => {
          await storeData('genre', 'Hip-Hop');
          setGenre(await getData('genre'));
        }}
      />
      <Button
        title="Classical"
        onPress={async () => {
          await storeData('genre','Classical');
          setGenre(await getData('genre'));
        }}
      />
      <Button
        title="Dubstep"
        onPress={async () => {
          await storeData('genre', 'Dubstep');
          setGenre(await getData('genre'));
        }}
      />
      <Button
        title="Folk"
        onPress={async () => {
          await storeData('genre', 'Folk');
          setGenre(await getData('genre'));
        }}
      />
      <Button
        title="R&B"
        onPress={async () => {
          await storeData('genre', 'R&B');
          setGenre(await getData('genre'));
        }}
      />
      <Button
        title="Pop"
        onPress={async () => {
          await storeData('genre', 'Pop');
          setGenre(await getData('genre'));
        }}
      />
      <Button
        title="Jazz"
        onPress={async () => {
          await storeData('genre', 'Jazz');
          setGenre(await getData('genre'));
        }}
      />
      <Text>Your favourite Genre is: {genre ? genre : 'Not chosen'}</Text>
    </View>
  );
}

  
export default Home;
