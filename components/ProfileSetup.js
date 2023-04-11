import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  View,
  Button,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import * as Location from "expo-location";
import { auth } from "../firebase/firebaseSetup";
import { addNewUserToFirebase } from "../firebase/firebaseHelper";

import { GOOGLE_MAPS_API } from "@env";

const ProfileSetup = ({ setUserHasProfile }) => {
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();

  const [profileName, setProfileName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userWork, setUserWork] = useState("");
  const [userLocation, setUserLocation] = useState("");

  async function verifyPermissions() {
    if (permissionResponse.granted) return true;
    const response = await requestPermission();
    return response.granted;
  }

  async function getUserLocation() {
    console.log("User being located!");
    const granted = await verifyPermissions();
    if (!granted) {
      Alert.alert("You need to grant permissions to use location!");
      return;
    }
    try {
      if (granted) {
        const location = await Location.getCurrentPositionAsync();
        console.log(location);
        const reverseGeocodingUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_MAPS_API}`;
        console.log(reverseGeocodingUri);
        const locationDescription = await fetch(reverseGeocodingUri, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await locationDescription.json();
        setUserLocation(data.results[0].formatted_address);
        // setUserLocation(`(${location.coords.latitude}, ${location.coords.longitude})`)
        // setUserLocation({
        //   latitude: location.coords.latitude,
        //   longitude: location.coords.longitude,
        // });
      } else Alert.alert("No permissions for location");
    } catch (e) {
      console.log(e);
    }
  }

  async function verifyAndAddUser() {
    if (
      profileName === "" ||
      userAge === "" ||
      userPhone === "" ||
      userWork === ""
    )
      Alert.alert("Some field(s) are empty!");
    else if (userAge < 16)
      Alert.alert("Sorry you are not eligible for signing up right now.");
    // else if (userPhone.length < 10)
    //   Alert.alert("You entered an invalid phone number.");
    else {
      console.log("pressing button");
      userDetails = {
        name: profileName,
        age: userAge,
        phone: userPhone,
        work: userWork,
        location: userLocation,
      };
      console.log("User Details:", userDetails);
      const res = await addNewUserToFirebase(userDetails);
      if (res) setUserHasProfile(true);
      else setUserHasProfile(false);
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Full Name</Text>
        <TextInput
          value={profileName}
          onChangeText={(newName) => {
            console.log("-----------------------------", newName);
            setProfileName(newName);
          }}
        />
        <Text>Age</Text>
        <TextInput
          value={userAge}
          onChangeText={(newAge) => setUserAge(newAge)}
          keyboardType="numeric"
        />
        <Text>Phone Number</Text>
        <TextInput
          value={userPhone}
          onChangeText={(newPhone) => setUserPhone(newPhone)}
          keyboardType="numeric"
        />
        <Text>Work</Text>
        <TextInput
          value={userWork}
          onChangeText={(newWork) => setUserWork(newWork)}
        />
        <Text>Location</Text>
        <TextInput
          value={userLocation}
          onChangeText={(newLocation) => setUserLocation(newLocation)}
        />
        <Button title="Locate me" onPress={getUserLocation} />
      </View>
      <Button title="Create Account" onPress={verifyAndAddUser} />
    </SafeAreaView>
  );
};

export default ProfileSetup;

const styles = StyleSheet.create({});
