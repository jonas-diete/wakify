import { Text, View, Button } from 'react-native';
import styles from '../src/utils/styles.js'

function DetailsScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
        <Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />
      </View>
    );
}

export default DetailsScreen;