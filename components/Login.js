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
import { loginWithEmailAndPassword } from "../firebase/firebaseHelper";

const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const signUpHandler = () => {
    console.log("Taking user to signup page.");
    navigation.replace("Signup");
  };

  const signInHander = async () => {
    if (userEmail != "" && userPassword != "") {
      const result = await loginWithEmailAndPassword(userEmail, userPassword);
      console.log('RESULT IS: ', result)
      if (!result.user)
        Alert.alert("There was an error with your login!");
      else console.log("User logged in: ", auth.currentUser.email);
    } else Alert.alert("Please check input fields!");
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
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
