import * as React from "react";
import { Text, View, Pressable, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "../styles.js";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import Emojis from "./Emojis.js";
import { useState } from "react";
import storeData from "../asyncStorage/storeData.js";
import clientId from "../helperFunctions/getClientId.js";

WebBrowser.maybeCompleteAuthSession();


const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

let access_token = '';

function SelectMood({ navigation }) {
  const [isLoading, setLoading] = useState(true);
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
      storeData("access_token", access_token);
      setLoading(false);
    }
  }, [response]);

  const resetToken = () => {
    access_token = ''
  };

  const TokenCheck = () => {
    if (access_token !== '' || !isLoading ) {
      return <Emojis />
    } else {
      return (
        <View style={styles.container}>
          <Image style={styles.logo} source={require("../assets/wakify.png")} />
          <Text style={styles.captionText}>
            You need to authorize Spotify to use Wakify
          </Text>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.2 : 1,
              },
              styles.button,
            ]}
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
