import schedulePushNotification from '../src/utils/schedulePushNotification';
import { Text, View, Button, Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../src/utils/styles.js'
import SelectDropdown from 'react-native-select-dropdown'
import { cancelAllScheduledNotificationsAsync } from 'expo-notifications';

const hours = [];
const minutes = [];

for (let i = 0; i < 24; i++) {
  if (i < 10) {
    hours.push('0' + String(i));
  } else
  hours.push(String(i));
}

for (let i = 0; i < 60; i++) {
  if (i < 10) {
    minutes.push('0' + String(i));
  } else
  minutes.push(String(i));
}

let selectedHour;
let selectedMinute;

function SelectTime({ navigation }){
  return(
    <View style={styles.container}>
    <StatusBar style="auto" />
    <Text>Wakify - matches your mood to a playlist</Text>
    <Text>Select the time you wake up</Text>
    <SelectDropdown
      data={hours}
      onSelect={(selectedItem, index) => {
        selectedHour = parseInt(selectedItem);
      }}
      defaultButtonText={'Select Hour'}
      buttonTextAfterSelection={(selectedItem, index) => {
        return 'Hour ' + selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      buttonStyle={styles.dropdown2BtnStyle}
      buttonTextStyle={styles.dropdown2BtnTxtStyle}
      dropdownStyle={styles.dropdown2DropdownStyle}
      rowStyle={styles.dropdown2RowStyle}
      rowTextStyle={styles.dropdown2RowTxtStyle}
    />
    <SelectDropdown
      data={minutes}
      onSelect={(selectedItem, index) => {
        selectedMinute = parseInt(selectedItem);
      }}
      defaultButtonText={'Select Minute'}
      buttonTextAfterSelection={(selectedItem, index) => {
        return 'Minute ' + selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      buttonStyle={styles.dropdown2BtnStyle}
      buttonTextStyle={styles.dropdown2BtnTxtStyle}
      dropdownStyle={styles.dropdown2DropdownStyle}
      rowStyle={styles.dropdown2RowStyle}
      rowTextStyle={styles.dropdown2RowTxtStyle}
    />
    <Button
        title="Submit"
        onPress={async () => {
          await cancelAllScheduledNotificationsAsync();
          await schedulePushNotification(selectedHour, selectedMinute);
          let minuteString;
          if (selectedMinute < 10){
            minuteString = "0" + selectedMinute;
          }else{
            minuteString = selectedMinute;
          }
          Alert.alert(`You will receive a notification at ${selectedHour}:${minuteString}.`)
          navigation.popToTop();
        }}
      />

    <Button
      title="Back"
      onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

export default SelectTime