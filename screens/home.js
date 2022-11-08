import { Text, View, Button} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../src/utils/styles.js'

function Home({ navigation }){
  return(
  <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Wakify - matches your mood to a playlist</Text>
      <Button
        title="Select Time to Get Notifications"
        onPress={() => navigation.navigate('SelectTime')}
      />
      <Button
        title="Select Your Mood"
        onPress={() => navigation.navigate('SelectMood')}
      />
      <Button
        title="Select Your Favourite Genres"
        onPress={() => navigation.navigate('SelectGenre')}
      />
    </View>
  );
}

  
export default Home;