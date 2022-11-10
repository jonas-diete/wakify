import React, { useEffect, useState } from "react";
import { Text, Pressable, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "../src/utils/styles.js";
import storeData from "../asyncStorage/storeData";
import getData from "../asyncStorage/getData";

function Home({ navigation }) {
  const [genre, setGenre] = useState("Loading");
  useEffect(() => {
    async function fetchData() {
      setGenre(await getData("genre"));
    }
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.captionText}>Choose your favourite genre</Text>
      <Pressable
        style={styles.genreButton}
        onPress={async () => {
          await storeData("genre", "Rock");
          setGenre(await getData("genre"));
        }}
      >
        <Text style={styles.genreText}>Rock</Text>
      </Pressable>
      <Pressable
        style={styles.genreButton}
        onPress={async () => {
          await storeData("genre", "Electronic");
          setGenre(await getData("genre"));
        }}
      >
        <Text style={styles.genreText}>Electronic</Text>
      </Pressable>
      <Pressable
        style={styles.genreButton}
        onPress={async () => {
          await storeData("genre", "Rap");
          setGenre(await getData("genre"));
        }}
      >
        <Text style={styles.genreText}>Rap</Text>
      </Pressable>
      <Pressable
        style={styles.genreButton}
        onPress={async () => {
          await storeData("genre", "Hip-Hop");
          setGenre(await getData("genre"));
        }}
      >
        <Text style={styles.genreText}>Hip-Hop</Text>
      </Pressable>
      <Pressable
        style={styles.genreButton}
        onPress={async () => {
          await storeData("genre", "Classic");
          setGenre(await getData("genre"));
        }}
      >
        <Text style={styles.genreText}>Classic</Text>
      </Pressable>
      <Pressable
        style={styles.genreButton}
        onPress={async () => {
          await storeData("genre", "Dubstep");
          setGenre(await getData("genre"));
        }}
      >
        <Text style={styles.genreText}>Dubstep</Text>
      </Pressable>
      <Pressable
        style={styles.genreButton}
        onPress={async () => {
          await storeData("genre", "Folk");
          setGenre(await getData("genre"));
        }}
      >
        <Text style={styles.genreText}>Folk</Text>
      </Pressable>
      <Pressable
        style={styles.genreButton}
        onPress={async () => {
          await storeData("genre", "R&B");
          setGenre(await getData("genre"));
        }}
      >
        <Text style={styles.genreText}>R&B</Text>
      </Pressable>
      <Pressable
        style={styles.genreButton}
        onPress={async () => {
          await storeData("genre", "Pop");
          setGenre(await getData("genre"));
        }}
      >
        <Text style={styles.genreText}>Pop</Text>
      </Pressable>
      <Pressable
        style={styles.genreButton}
        onPress={async () => {
          await storeData("genre", "Jazz");
          setGenre(await getData("genre"));
        }}
      >
        <Text style={styles.genreText}>Jazz</Text>
      </Pressable>
      <Text style={styles.captionText}>
        Your favourite Genre is:{" "}
        <Text style={styles.favouriteGenre}>
          {genre ? genre : "Not chosen"}
        </Text>
      </Text>
    </View>
  );
}

export default Home;
