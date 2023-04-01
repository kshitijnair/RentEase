import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RentalList from "./RentalList";

const TestComponent = () => {
  return (
    <View style={styles.container}>
      <RentalList />
    </View>
  );
};

export default TestComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#fff",
  }
});