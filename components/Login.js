import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
  Image,
  View,
} from "react-native";
import React, { useState } from "react";

import { auth } from "../firebase/firebaseSetup";
import {
  getUserDetails,
  loginWithEmailAndPassword,
} from "../firebase/firebaseHelper";
import { signInAnonymously } from "firebase/auth";

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
          console.log("in else");
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
    <SafeAreaView style={styles.mainView}>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
        }}
      >
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>
      <View style={{ flex: 1}}>
        <Text style={styles.banner}>Welcome to your new house!</Text>
      </View>
      <View
        style={[
          styles.inputContainer,
          { flex: 1.5 },
        ]}
      >
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
      </View>
      <View style={{ flex: 2 }}>
        <Button title="Sign In" onPress={signInHander} />
        <Button title="Sign Up" onPress={signUpHandler} />
        <Button
          title="Sign In Anonymously"
          onPress={signInAnonymouslyHandler}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 110,
    height: 110,
    // margin: 20,
    // top: 75,
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    fontSize: 32,
    width: 225,
    justifyContent: "space-evenly",
    paddingBottom: 5
  },
  inputContainer: {
    width: 220,
    height: 100,
  },
  inputField: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  }
});
