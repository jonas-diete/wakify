import * as React from "react";
import { Text, View, Button, Alert, TouchableOpacity, Image, Linking} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../src/utils/styles.js'
import SpotifyWebApi from "spotify-web-api-node";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useState } from 'react';

WebBrowser.maybeCompleteAuthSession();

const spotifyApi = new SpotifyWebApi({
  clientId: '7241615fa50c440dbf5d06ee41374ddb'
});

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const apiPrefix = 'https://api.spotify.com/v1';
const categoryId = "0JQ5DAqbMKFzHmL4tf05da";






function SelectMood({ navigation }) {
  const [access_Token, setAccess_Token] = useState('')
  
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "7241615fa50c440dbf5d06ee41374ddb",
      scopes: ["user-read-email", "playlist-modify-public", "playlist-modify-private", "playlist-read-private", 
      "app-remote-control","user-read-playback-state", "user-modify-playback-state", "user-read-recently-played"],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: "your.app",
      }),
      grant_type: "authorization_code",
      json: true,
    },
    discovery
  );
  
  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      access_token.toString
      // console.log(response)
      spotifyApi.setAccessToken(access_token)
      // console.log(access_token)
      setAccess_Token(access_token)
  
    }
  }, [response]);
  
  async function getPlaylist(mood) {
    let playlistUrl = ''
    await spotifyApi.getPlaylistsForCategory("0JQ5DAqbMKFzHmL4tf05da", {limit: 50}).then(
      function(data) {ç
        playlistUrl = findPlaylist(data.body.playlists.items, mood);
      },
      function(err) {
        console.error(err);
      }
      );
    return String(playlistUrl);
  }
  
  const findPlaylist = (playlistItems, mood) => { 
    let foundPlaylist = ''
    playlistItems.forEach((item) => {
      if (item.name.toLowerCase().includes(mood)) {
        foundPlaylist = item;
      }
    })
    return foundPlaylist.external_urls.spotify;
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Wakify</Text>
      <Button
        disabled={!request}
        title="Authorize Spotify"
        onPress={() => {
          promptAsync();
        }}
      />
      <Text>Select Your Mood:</Text>
      <View>
        <TouchableOpacity onPress={async () => {
          Linking.openURL(await getPlaylist("happy"))
          }
        }>
          <Image style={styles.button} source={require('../assets/happy.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => {
          Linking.openURL(await getPlaylist("coffee"))
          }}>
          <Image style={styles.button} source={require('../assets/neutral.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => {
          Linking.openURL(await getPlaylist("sad"))
          }}>
          <Image style={styles.button} source={require('../assets/sad.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => {
          Linking.openURL(await getPlaylist("sad"))
          }}>
          <Image style={styles.button} source={require('../assets/distraught.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => {
          Linking.openURL(await getPlaylist("feel good"))
          }}>
          <Image style={styles.button} source={require('../assets/angry.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => {
          Linking.openURL(await getPlaylist("night"))
          }}>
          <Image style={styles.button} source={require('../assets/tired.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => {
          Linking.openURL(await getPlaylist("energy"))
          }}>
          <Image style={styles.button} source={require('../assets/active.png')} />
        </TouchableOpacity>
      </View>

      <Button
        title="Go Back"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

export default SelectMood;