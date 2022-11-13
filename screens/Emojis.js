import * as React from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Linking,
  LogBox,
} from "react-native";
import getPlaylist from "../helperFunctions/Playlist.js";
import styles from "../styles.js";

function Emojis() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logoMood}
        source={require("../assets/wakifyText.png")}
      />
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={async () => {
            Linking.openURL(await getPlaylist("happy"));
          }}
        >
          <Image
            style={styles.emojis}
            source={require("../assets/happy.png")}
          />
        </TouchableOpacity>
        <View style={styles.emojiSpacing}></View>
        <TouchableOpacity
          onPress={async () => {
            Linking.openURL(await getPlaylist("coffee"));
          }}
        >
          <Image
            style={styles.emojis}
            source={require("../assets/neutral.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={async () => {
            Linking.openURL(await getPlaylist("sad"));
          }}
        >
          <Image
            style={styles.emojis}
            source={require("../assets/sad.png")}
          />
        </TouchableOpacity>
        <View style={styles.emojiSpacing}></View>
        <TouchableOpacity
          onPress={async () => {
            Linking.openURL(await getPlaylist("uplifting"));
          }}
        >
          <Image
            style={styles.emojis}
            source={require("../assets/distraught.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={async () => {
            Linking.openURL(await getPlaylist("feel good"));
          }}
        >
          <Image
            style={styles.emojis}
            source={require("../assets/angry.png")}
          />
        </TouchableOpacity>
        <View style={styles.emojiSpacing}></View>
        <TouchableOpacity
          onPress={async () => {
            Linking.openURL(await getPlaylist("night"));
          }}
        >
          <Image
            style={styles.emojis}
            source={require("../assets/tired.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={async () => {
            Linking.openURL(await getPlaylist("energy"));
          }}
        >
          <Image
            style={styles.emojis}
            source={require("../assets/active.png")}
          />
        </TouchableOpacity>
        <View style={styles.emojiSpacing}></View>
        <TouchableOpacity
          onPress={async () => {
            Linking.openURL(await getPlaylist("love"));
          }}
        >
          <Image
            style={styles.emojis}
            source={require("../assets/love.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.captionText}>Select Your Mood</Text>
    </View>
  );
}

export default Emojis;
