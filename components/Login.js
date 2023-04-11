import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase/firebaseSetup";
import {
  getUserDetails,
  loginWithEmailAndPassword,
} from "../firebase/firebaseHelper";
import {  signInAnonymously } from 'firebase/auth';

const Login = ({ navigation, setUserHasProfile }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const signUpHandler = () => {
    console.log("Taking user to signup page.");
    navigation.replace("Signup");
  };

  const signInHander = async () => {
    if (userEmail != "" && userPassword != "") {
      const result = await loginWithEmailAndPassword(userEmail, userPassword);
      if (!result.user) Alert.alert("There was an error with your login!");
      else {
        console.log(auth.currentUser.uid);
        const userDetails = await getUserDetails(auth.currentUser.uid);
        console.log(userDetails);
        if (userDetails) {
          setUserHasProfile(true);
          Alert.alert(`Welcome, ${userDetails["name"]}!`);
        } else {
          setUserHasProfile(false);
          console.log("in else")
        }
      }
    } else Alert.alert("Please check input fields!");
  };

  const signInAnonymouslyHandler = async () => {
    try {
      await signInAnonymously(auth);
      const user = auth.currentUser;
      setUserHasProfile(true);
      console.log(user);
      Alert.alert("You are signed in anonymously!");
    } catch (error) {
      console.log(error);
      Alert.alert("There was an error signing in anonymously!");
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.banner}>Hi!</Text>
      <TextInput
        style={styles.inputField}
        value={userEmail}
        placeholder="email"
        onChangeText={(newEmail) => {
          console.log(newEmail);
          setUserEmail(newEmail);
        }}
      />
      <TextInput
        style={styles.inputField}
        secureTextEntry={true}
        value={userPassword}
        placeholder="p**sw**d"
        onChangeText={(newPassword) => {
          console.log("password updated");
          setUserPassword(newPassword);
        }}
      />
      <Button title="Sign In" onPress={signInHander} />
      <Button title="Sign Up" onPress={signUpHandler} />
      <Button title="Sign In Anonymously" onPress={signInAnonymouslyHandler} />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
