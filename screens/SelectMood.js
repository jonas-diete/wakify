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
import Emojis from '../src/utils/Emojis.js';
import {useState, useEffect } from 'react';
import storeAccessToken from "../asyncStorage/storeAccessToken.js";


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


let access_token


function SelectMood({ navigation }) {
  const [access_Token, setAccess_Token] = useState('')
  // console.log(access_token)
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '7241615fa50c440dbf5d06ee41374ddb',
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
    discovery,
    // console.log(access_token)
  );

  
  React.useEffect(() => {
    if (response?.type === "success") {
      access_token = response.params.access_token;
      access_token.toString
      // console.log(response)
      spotifyApi.setAccessToken(access_token)
      // console.log(access_token)
      setAccess_Token(access_token)
      // storeAccessToken('access_token', access_token)
    }
  }, [response]);

  useEffect(() => {
    async function fetchData() {
      storeAccessToken(access_Token);
    }
    fetchData();
  }, [])

const TokenCheck = () => {
  if (access_Token !== '') {
    return ( <Emojis /> )
  } else {
    return (
      <View>
        <Text>You need to authorize Spotify to use Wakify</Text>
        <Button
          disabled={!request}
          title="Authorize Spotify"
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
    )
  }
}

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Wakify</Text>
      <TokenCheck />
    </View>
  );
}

export default SelectMood;