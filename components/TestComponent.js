import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RentalList from "./RentalList";

const TestComponent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <RentalList navigation={navigation} />
    </View>
  );
};

export default TestComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#fff",
  },
});
