import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";

import { Ionicons } from "@expo/vector-icons";
import testcomponent from "./components/TestComponent";

const Home = () => {
  const Stack = createNativeStackNavigator();
  const AuthStack = (
    <>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </>
  );
  const AppStack = (
    <>
      <Stack.Screen name = "AllLists" component={testcomponent} />
    </>
  )

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
