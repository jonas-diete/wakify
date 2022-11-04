import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image, Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from './src/utils/registerForPushNotifications';
import schedulePushNotification from './src/utils/schedulePushNotification';
import SpotifyWebApi from "spotify-web-api-node";
import authenticationRequest from "./src/utils/authentication-request";

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
// const getPlaylistsForCategory  = async (access_token, categoryId) => {
//   const result  = await fetch(`${apiPrefix}/browse/categories/${categoryId}/playlists?limit=${limit}`, {
//     method: 'GET',
//     headers: { 'Authorization' : 'Bearer' + access_token}
//   })

//   const data = await result.json();
//   console.log(data);
// }

// in useState 

// mood = ''
// moodhandler function in the pictures on press to changed the mood
// when mood is not "" then run the playlist the depends on the current mood. 
// Maybe a seperate button to get playlis after mood is selected 
// pressing a button changes the mood to whatever and then calls the playlist/redirects to url? (returns url?)


// export default function App() {
//   const [request, response, promptAsync] = useAuthRequest(
//     {
//       responseType: ResponseType.Token,
//       clientId: "b8f36ad160674b8a981244939798c1f7",
//       scopes: ["user-read-email", "playlist-modify-public"],
//       // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
//       // this must be set to false
//       usePKCE: false,
//       redirectUri: makeRedirectUri({
//         scheme: "your.app",
//       }),
//       grant_type: "authorization_code",
//       json: true,
//     },
//     discovery
//   );

//   React.useEffect(() => {
//     if (response?.type === "success") {
//       const { access_token } = response.params;
//       console.log(response);
//     }
//   }, [response]);


// sets the notifications to show up even when app is in foreground (mainly for testing - can be deleted later)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
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

  // spotifyApi.setAccessToken(access_token);

  const responseListener = useRef();

  useEffect( () => {
    
    // Register device for push notifications
    registerForPushNotificationsAsync();

    // Listening for user tapping/interacting with notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      notificationNavigationHandler(response.notification.request.content);
    });

    // removing listeners
    return () => {
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function getPlaylist(mood) {
    let playlistUrl = ''
    await spotifyApi.getPlaylistsForCategory("0JQ5DAqbMKFzHmL4tf05da", {limit: 10}).then(
      function(data) {
        playlistUrl = findPlaylist(data.body.playlists.items, mood);
      },
      function(err) {
        console.error(err);
      }
      );
    return String(playlistUrl);
  }

  // getPlaylist("happy");

  // let playlistUrl = ""
  
  const findPlaylist = (playlistItems, mood) => { 
    let foundPlaylist = ''
    playlistItems.forEach((item) => {
      if (item.name.toLowerCase().includes(mood)) {
        foundPlaylist = item;
      }
    })
    return foundPlaylist.external_urls.spotify;
  }


  const notificationNavigationHandler = ({ data }) => {
    // add logic here to navigate to a specific app screen
    console.log('A notification has been tapped', data)
  }


  
  return (
    <View style={styles.container}>
      <Text>Wakify - matches your mood to a playlist</Text>
      {/* <authenticationRequest /> */}
      <StatusBar style="auto" />
      <Button
        disabled={!request}
        title="Authorize Spotify"
        onPress={() => {
         promptAsync();
        }}
      />
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
      <View>
        <TouchableOpacity onPress={async () =>  { 
          console.log(await getPlaylist("happy"));
          Linking.openURL(await getPlaylist("happy"))
        }}>
          <Image style={styles.button} source={require('./assets/happy.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Neutral Emoji pressed")}>
          <Image style={styles.button} source={require('./assets/neutral.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Sad Emoji pressed")}>
          <Image style={styles.button} source={require('./assets/sad.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Distraught Emoji pressed")}>
          <Image style={styles.button} source={require('./assets/distraught.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Angry Emoji pressed")}>
          <Image style={styles.button} source={require('./assets/angry.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Tired Emoji pressed")}>
          <Image style={styles.button} source={require('./assets/tired.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Active Emoji pressed")}>
          <Image style={styles.button} source={require('./assets/active.png')} />
        </TouchableOpacity>
      </View>
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
  button: {
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
  }
});

// Mood category
// curl --request GET \
// --url https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFzHmL4tf05da/playlists \
// --header "Authorization: Bearer " \
// --header 'Content-Type: application/json'
