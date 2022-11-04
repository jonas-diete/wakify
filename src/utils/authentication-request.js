import {
    makeRedirectUri,
    ResponseType,
    useAuthRequest,
  } from "expo-auth-session";
import * as React from "react";
import { useEffect, useRef } from 'react';
import { View, Button} from 'react-native';

const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };
  
async function authenticationRequest() {
    const [request, response, promptAsync] = useAuthRequest(
      {
        responseType: ResponseType.Token,
        clientId: "7241615fa50c440dbf5d06ee41374ddb",
        scopes: ["user-read-email", "playlist-modify-public", "app-remote-control", "user-modify-playback-state"],
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
      <StatusBar style="auto" />
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


export default authenticationRequest;