import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import { createNewUser } from "../firebase/firebaseHelper";

const SignUp = () => {
  const [userEmail, seUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setconfirmUserPassword] = useState("");

  const signupHandler = async () => {
    if (confirmUserPassword !== userPassword)
      Alert.alert("The passwords don't match");
    const user = await createNewUser(email, password);
    console.log(user);
  };

  return (
    <View>
      <Text>SignUp</Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
