import React, { useEffect, useState } from "react";
import schedulePushNotification from "../src/utils/schedulePushNotification";
import { Text, View, Alert, Image, Platform, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "../src/utils/styles.js";
import SelectDropdown from "react-native-select-dropdown";
import { cancelAllScheduledNotificationsAsync } from "expo-notifications";
import storeData from "../asyncStorage/storeData";
import getData from "../asyncStorage/getData";

const hours = [];
const minutes = [];

for (let i = 0; i < 24; i++) {
  if (i < 10) {
    hours.push("0" + String(i));
  } else hours.push(String(i));
}

for (let i = 0; i < 60; i++) {
  if (i < 10) {
    minutes.push("0" + String(i));
  } else minutes.push(String(i));
}

let selectedHour;
let selectedMinute;

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
        You can change your notification time here:
      </Text>
      <SelectDropdown
        data={hours}
        onSelect={(selectedItem, index) => {
          selectedHour = parseInt(selectedItem);
        }}
        defaultButtonText={"08"}
        buttonTextAfterSelection={(selectedItem, index) => {
          return "Hour " + selectedItem;
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
        defaultButtonText={"00"}
        buttonTextAfterSelection={(selectedItem, index) => {
          return "Minute " + selectedItem;
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
