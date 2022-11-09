import * as React from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import getPlaylist from "./Playlist.js";
import styles from "./styles.js";
import { useState } from "react";

function Emojis() {
  return (
    <View>
      <Text>Select Your Mood:</Text>
      <TouchableOpacity
        onPress={async () => {
          Linking.openURL(await getPlaylist("happy"));
        }}
      >
        <Image
          style={styles.button}
          source={require("../../assets/happy.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          Linking.openURL(await getPlaylist("coffee"));
        }}
      >
        <Image
          style={styles.button}
          source={require("../../assets/neutral.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          Linking.openURL(await getPlaylist("sad"));
        }}
      >
        <Image style={styles.button} source={require("../../assets/sad.png")} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          Linking.openURL(await getPlaylist("sad"));
        }}
      >
        <Image
          style={styles.button}
          source={require("../../assets/distraught.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          Linking.openURL(await getPlaylist("feel good"));
        }}
      >
        <Image
          style={styles.button}
          source={require("../../assets/angry.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          Linking.openURL(await getPlaylist("night"));
        }}
      >
        <Image
          style={styles.button}
          source={require("../../assets/tired.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          Linking.openURL(await getPlaylist("energy"));
        }}
      >
        <Image
          style={styles.button}
          source={require("../../assets/active.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Emojis;
