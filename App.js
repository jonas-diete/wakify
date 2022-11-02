import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function App() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "b8f36ad160674b8a981244939798c1f7",
      scopes: ["user-read-email", "playlist-modify-public"],
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
      console.log(response);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text>Wakify - matches your mood to a playlist</Text>
      <StatusBar style="auto" />
      <Button
        disabled={!request}
        title="Happy"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// Mood category
// curl --request GET \
// --url https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFzHmL4tf05da/playlists \
// --header "Authorization: Bearer " \
// --header 'Content-Type: application/json'
