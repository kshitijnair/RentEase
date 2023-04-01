import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  SafeAreaView, 
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";

import { createNewUser } from "../firebase/firebaseHelper";

const SignUp = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setconfirmUserPassword] = useState("");

  const signInHandler = () => {
    console.log("Taking user to login page.");
    navigation.replace("Login");
  };

  const signUpHandler = async () => {
    if (userEmail!='' && userPassword!='') {
      console.log("creating new user.")
      Alert.alert("creating new user")
      if (confirmUserPassword !== userPassword)
        Alert.alert("The passwords don't match");
      else {
        const user = await createNewUser(userEmail, confirmUserPassword);
        console.log(user);
      }
    } else {
      Alert.alert("Invalid Inputs!")
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.banner}>Let's get you started!</Text>
      <TextInput
        value={userEmail}
        placeholder="email"
        onChangeText={(newEmail) => {
          console.log(newEmail);
          setUserEmail(newEmail);
        }}
      />
      <TextInput
        value={userPassword}
        secureTextEntry={true}
        placeholder="p**sw**d"
        onChangeText={(newPassword) => {
          console.log(newPassword);
          setUserPassword(newPassword);
        }}
      />
      <TextInput
        value={confirmUserPassword}
        secureTextEntry={true}
        placeholder="confirm p**sw**d"
        onChangeText={(confirmPassword) => {
          console.log(confirmPassword);
          setconfirmUserPassword(confirmPassword);
        }}
      />
      <Button title="Sign Up" onPress={signUpHandler} />
      <Button title="Already a user? Sign in." onPress={signInHandler} />
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
