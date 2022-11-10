import * as React from "react";
import { Text, View, Pressable, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "../src/utils/styles.js";
import SpotifyWebApi from "spotify-web-api-node";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import Emojis from "../src/utils/Emojis.js";
import { useState } from "react";
import storeAccessToken from "../asyncStorage/storeAccessToken.js";

const clientId = "b8f36ad160674b8a981244939798c1f7";

WebBrowser.maybeCompleteAuthSession();

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
});

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

let access_token = "";

function SelectMood({ navigation }) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: clientId,
      scopes: [
        "user-read-email",
        "playlist-modify-public",
        "playlist-modify-private",
        "playlist-read-private",
        "app-remote-control",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-recently-played",
      ],
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
      setInterval(resetToken, 3600000);
      access_token = response.params.access_token;
      access_token.toString;
      storeAccessToken("access_token", access_token);
    }
  }, [response]);

  const resetToken = () => {
    access_token = "";
  };

  const TokenCheck = () => {
    if (access_token !== "") {
      return <Emojis />;
    } else {
      return (
        <View style={styles.container}>
          <Image style={styles.logo} source={require("../assets/wakify.png")} />
          <Text style={styles.captionText}>
            You need to authorize Spotify to use Wakify
          </Text>
          <Pressable
            style={styles.button}
            disabled={!request}
            title="Authorize Spotify"
            onPress={() => promptAsync()}
          >
            <Text style={styles.text}>Authorize Spotify</Text>
          </Pressable>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TokenCheck />
    </View>
  );
}

export default SelectMood;
