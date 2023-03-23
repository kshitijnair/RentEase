import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Button,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase/firebaseSetup";

const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const signUpHandler = () => {
    console.log("Taking user to signup page.");
    navigation.replace("Signup");
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
      <Button title="Sign In" onPress={() => console.log("button pressed")} />
      <Button title="Sign Up" onPress={signUpHandler} />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
