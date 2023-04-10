import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import React from "react";

const TempFullView = ({ route, navigation }) => {
  const { item } = route.params;
  function bookAppointment() {
    console.log("book appt");
  }

  function leaveComment() {
    console.log("Leaving comment")
  }

  return (
    <SafeAreaView>
      <Text>TempFullView</Text>
      <Text>{item.id}</Text>
      <Text>{item.description}</Text>
      <Button title="Leave Comment" onPress={leaveComment} />
      <Button title="Book Appointment" onPress={bookAppointment} />
    </SafeAreaView>
  );
};

export default TempFullView;

const styles = StyleSheet.create({});
