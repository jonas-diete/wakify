import React, { useEffect, useState } from "react";
import schedulePushNotification from "../helperFunctions/schedulePushNotification";
import { Text, View, Alert, Image, Platform, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "../styles.js";
import SelectDropdown from "react-native-select-dropdown";
import { cancelAllScheduledNotificationsAsync } from "expo-notifications";
import storeData from "../asyncStorage/storeData";
import getData from "../asyncStorage/getData";
import createTimeArray from "../helperFunctions/createTimeArray";

const hours = createTimeArray(24);
const minutes = createTimeArray(60);

let selectedHour = 8;
let selectedMinute = 0;

function SelectTime({ navigation }) {
  const [time, setTime] = useState("Loading");

  useEffect(() => {
    async function fetchData() {
      setTime(await getData("time"));
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={styles.logoMood}
        source={require("../assets/wakifyText.png")}
      />
      <Text style={styles.captionText}>
        Your notification time is {time ? time : "not chosen yet."}
      </Text>
      <Text style={styles.captionText}>
        Change your notification time here:
      </Text>
      <View style={styles.rowContainer}>
        <SelectDropdown
          data={hours}
          onSelect={(selectedItem, index) => {
            selectedHour = parseInt(selectedItem);
          }}
          defaultButtonText={"08"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.timeSelector}
          buttonTextStyle={styles.timeText}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
        />
        <Text style={styles.colonText}> : </Text>
        <SelectDropdown
          data={minutes}
          onSelect={(selectedItem, index) => {
            selectedMinute = parseInt(selectedItem);
          }}
          defaultButtonText={"00"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.timeSelector}
          buttonTextStyle={styles.timeText}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
        />
      </View>
      <Pressable
        style={({ pressed }) => [
        {
          opacity: pressed ? 0.2 : 1,
        },
        styles.button,
      ]}
        title="Submit"
        onPress={async () => {
          if (Platform.OS !== "web") {
            await cancelAllScheduledNotificationsAsync();
            await schedulePushNotification(selectedHour, selectedMinute);
          }
          let minuteString;
          if (selectedMinute < 10) {
            minuteString = "0" + selectedMinute;
          } else {
            minuteString = selectedMinute;
          }
          storeData("time", `${selectedHour}:${minuteString}`);
          Alert.alert(
            `You will receive a notification at ${selectedHour}:${minuteString}.`
          );
          navigation.popToTop();
        }}
      >
        <Text style={styles.text}>Submit</Text>
      </Pressable>
    </View>
  );
}

export default SelectTime;
