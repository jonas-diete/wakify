import schedulePushNotification from '../src/utils/schedulePushNotification';
import { Text, View, Button, Alert, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../src/utils/styles.js'
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';


WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

function Home({ navigation }){
    let access_token;
    const [request, response, promptAsync] = useAuthRequest(
        {
          responseType: ResponseType.Token,
          clientId: 'CLIENT_ID',
          scopes: ['user-read-email', 'playlist-modify-public'],
          // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
          // this must be set to false
          usePKCE: false,
          redirectUri: makeRedirectUri({
            scheme: 'your.app'
          }),
        },
        discovery
      );
    
    React.useEffect(() => {
        if (response?.type === 'success') {
          access_token = response.params;
        }
      }, [response]);
    
    return(
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text>Wakify - matches your mood to a playlist</Text>
            <Button
            title="Press to Send Notification"
            onPress={async () => {
                await schedulePushNotification();
            }}
            />
            <Button
                disabled={!request}
                title="Login"
                onPress={ async () => {
                await promptAsync(),
                navigation.navigate('Details', {
                accessToken: access_token})
                }}
            />
            
            <View>
            <TouchableOpacity onPress={() => Alert.alert("Happy Emoji pressed")}>
                <Image style={styles.button} source={require('../assets/happy.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("Neutral Emoji pressed")}>
                <Image style={styles.button} source={require('../assets/neutral.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("Sad Emoji pressed")}>
                <Image style={styles.button} source={require('../assets/sad.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("Distraught Emoji pressed")}>
                <Image style={styles.button} source={require('../assets/distraught.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("Angry Emoji pressed")}>
                <Image style={styles.button} source={require('../assets/angry.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("Tired Emoji pressed")}>
                <Image style={styles.button} source={require('../assets/tired.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("Active Emoji pressed")}>
                <Image style={styles.button} source={require('../assets/active.png')} />
            </TouchableOpacity>
            </View>
            <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
            />
      </View>
    );
  }

  
export default Home;