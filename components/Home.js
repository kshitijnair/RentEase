import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TestComponent from "./TestComponent";
import Profile from "./Profile";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-home"
                size={24}
                color={tabInfo.focused ? "#32ade6" : "#8e8e93"}
              />
            );
          },
        }}
        name="Home"
        component={TestComponent}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-person-circle"
                size={24}
                color={tabInfo.focused ? "#32ade6" : "#8e8e93"}
              />
            );
          },
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
