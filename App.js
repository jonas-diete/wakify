import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Button, Text, View, Alert, TouchableOpacity, Image  } from 'react-native';



export default function App() {
  return (
    <View style={styles.container}>
      <Text>Wakify - matches your mood to a playlist</Text>
      <StatusBar style="auto" />
      <View>
        <TouchableOpacity onPress={() => Alert.alert("Happy Emoji pressed")}>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
  }
});
