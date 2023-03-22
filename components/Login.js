import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase/firebaseSetup";

const Login = () => {
  const [userEmail, seUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
