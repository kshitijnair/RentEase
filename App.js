import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

import Home from "./Home";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import TestComponent from "./components/TestComponent";
import { auth } from "./firebase/firebaseSetup";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    })
  })

  const Stack = createNativeStackNavigator();
  const AuthStack = (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Signup"
        component={Signup}
      />
    </>
  );
  const AppStack = (
    <>
      <Stack.Screen name="AllLists" component={TestComponent} />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogOSOSin"
        screenOptions={{
          headerStyle: { backgroundColor: "#a5a" },
          headerTintColor: "#eee",
          headerTitleStyle: { fontSize: 20 },
        }}
      >
        {AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
