import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  Alert,
  Image,
  View,
  Pressable,
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
    if (userEmail != "" && userPassword != "") {
      // Alert.alert("creating new user")
      if (confirmUserPassword !== userPassword)
        Alert.alert("The passwords don't match");
      else {
        console.log("creating new user.");
        const user = await createNewUser(userEmail, confirmUserPassword);
        console.log(user);
        navigation.replace("ProfileSetup");
      }
    } else {
      Alert.alert("Invalid Inputs!");
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
      <View style={{ flex: 1 }}>
        <Text style={styles.banner}>Let's get you started!</Text>
      </View>
      <View style={[styles.inputContainer, { flex: 1.5 }]}>
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
          value={userPassword}
          secureTextEntry={true}
          placeholder="p**sw**d"
          onChangeText={(newPassword) => {
            console.log(newPassword);
            setUserPassword(newPassword);
          }}
        />
        <TextInput
          style={styles.inputField}
          value={confirmUserPassword}
          secureTextEntry={true}
          placeholder="confirm p**sw**d"
          onChangeText={(confirmPassword) => {
            console.log(confirmPassword);
            setconfirmUserPassword(confirmPassword);
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.bookingButton} onPress={signUpHandler}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        <Pressable style={styles.signInButton} onPress={signInHandler}>
          <Text style={styles.signInButtonText}>Already a user? Sign in.</Text>
        </Pressable>
      </View>
      {/* <View style={{ flex: 2 }}>
        <Button title="Sign Up" onPress={signUpHandler} />
        <Button title="Already a user? Sign in." onPress={signInHandler} />
      </View> */}
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 110,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    fontSize: 32,
    width: 300,
    justifyContent: "space-evenly",
    paddingBottom: 5,
  },
  inputContainer: {
    width: 220,
    height: 100,
  },
  inputField: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  },
  buttonsContainer: {
    flex: 2,
    alignItems: "center",
    marginTop: 50,
    justifyContent: "flex-start",
  },
  bookingButton: {
    backgroundColor: "#007aff",
    padding: 12,
    borderRadius: 12,
  },
  signInButton: {
    padding: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
  },
  signInButtonText: {
    color: "#007aff",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: 400,
  },
});
