import * as React from "react";
import { Text, View, Button, TouchableOpacity, Image, Linking, LogBox} from 'react-native';
import getPlaylist from './Playlist.js';
import styles from './styles.js';
import { useState } from "react";



function Emojis() {
  return (
    <View >
      <Text style={styles.captionText}>Select Your Mood:</Text>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={async () => {
          Linking.openURL(await getPlaylist("happy"))
          }}>
          <Image style={styles.emojis} source={require('../../assets/happy.png')} />
        </TouchableOpacity>
        <View style={styles.emojiSpacing}></View>
        <TouchableOpacity onPress={async () => {
          Linking.openURL(await getPlaylist("coffee"))
          }}>
          <Image style={styles.emojis} source={require('../../assets/neutral.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={async () => {
          Linking.openURL(await getPlaylist("sad"))
          }}>
          <Image style={styles.emojis} source={require('../../assets/sad.png')} />
        </TouchableOpacity>
        <View style={styles.emojiSpacing}></View>
        <TouchableOpacity onPress={async () => {
          Linking.openURL(await getPlaylist("sad"))
          }}>
          <Image style={styles.emojis} source={require('../../assets/distraught.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={async () => {
          Linking.openURL(await getPlaylist("feel good"))
          }}>
          <Image style={styles.emojis} source={require('../../assets/angry.png')} />
        </TouchableOpacity>
        <View style={styles.emojiSpacing}></View>
        <TouchableOpacity onPress={async () => {
          Linking.openURL(await getPlaylist("night"))
          }}>
          <Image style={styles.emojis} source={require('../../assets/tired.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={async () => {
          Linking.openURL(await getPlaylist("energy"))
          }}>
          <Image style={styles.emojis} source={require('../../assets/active.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}


export default Emojis;