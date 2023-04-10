
import RentalList from './components/RentalList';
import RentalDetail from './components/RentalDetail';
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "./components/Login";
import Signup from "./components/SignUp";
import TestComponent from "./components/TestComponent";
import { auth } from "./firebase/firebaseSetup";
import Home from './components/Home';

export default function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  });

  const Stack = createNativeStackNavigator();
  const AuthStack = (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Login"
        component={Login}
        initialParams={{ hasProfile: hasProfile }}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Signup"
        component={Signup}
      />
    </>
  );
  const AppStack = (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerRight: () => (
            <Button
              onPress={async() => {
                try {
                  const res = await signOut(auth)
                } catch(err) {
                  console.log("Error logging out: ", err)
                }
              }}
              title="Logout"
              color="#fff"
            />
          ),
        }}
        name="AllLists"
        component={Home}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="RentalList"
        component={RentalList}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="RentalDetail"
        component={RentalDetail}
      />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#a5a" },
          headerTintColor: "#eee",
          headerTitleStyle: { fontSize: 20 },
        }}
      >
        {isAuthenticated ? AppStack : AuthStack}
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
