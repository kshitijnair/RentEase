import RentalList from "./components/RentalList";
import RentalDetail from "./components/RentalDetail";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, signOut, signInAnonymously } from "firebase/auth";
import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "./components/Login";
import Signup from "./components/SignUp";
import TestComponent from "./components/TestComponent";
import { auth } from "./firebase/firebaseSetup";
import Home from "./components/Home";
import ProfileSetup from "./components/ProfileSetup";
import TempFullView from "./components/TempFullView";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userHasProfile, setUserHasProfile] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged triggered. user: ", user);
      if (user && userHasProfile) {
        setIsAuthenticated(true);
        setCurrentUser(user);
        if (!user.isAnonymous) {
          setIsAuthenticated(true);
          setUserHasProfile(true);
        }
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, [userHasProfile]);

  const Stack = createNativeStackNavigator();
  const AuthStack = (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
      >
        {(props) => <Login {...props} setUserHasProfile={setUserHasProfile} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Signup"
        component={Signup}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="ProfileSetup"
      >
        {(props) => (
          <ProfileSetup {...props} setUserHasProfile={setUserHasProfile} />
        )}
      </Stack.Screen>
    </>
  );
  const AppStack = (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerRight: () => (
            <Button
              onPress={async () => {
                try {
                  if (currentUser.isAnonymous) {
                    // Delete the anonymous user account
                    if (auth.currentUser) {
                      console.log("delete");
                      await auth.currentUser.delete();
                    }
                    setCurrentUser(null);
                    setUserHasProfile(false);
                  }
                  await signOut(auth);
                  setCurrentUser(null);
                  setUserHasProfile(false);
                  // Set the state to indicate that the user logged out from an anonymous account
                } catch (err) {
                  console.log("Error logging out: ", err);
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
      <Stack.Screen name="ItemDescription" component={TempFullView} />
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
