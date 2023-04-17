import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";

const Booking = ({ modalVisible, listingID }) => {
  return (
    <Modal animationType="slide" visible={modalVisible}>
      <Text>Booking</Text>
    </Modal>
  );
};

export default Booking;

const styles = StyleSheet.create({});
