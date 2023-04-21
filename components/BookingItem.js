import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";

const BookingItem = ({ booking }) => {
  const cancelBooking = async () => {
    console.log("cancelling booking")
  }
  return (
    <View style={styles.bookingItemView}>
      {/* <Image /> */}
      <View style={styles.detailsView}>
        <Text style={styles.addresstText}>Booking address</Text>
        <Text style={styles.timeText}>{booking.time}</Text>
      </View>
      <Pressable style={styles.cancelButton} onPress={cancelBooking}>
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
    </View>
  );
};

export default BookingItem;

const styles = StyleSheet.create({
  bookingItemView: {},
  detailsView: {},
  addresstText: {},
  timeText: {},
  cancelButton: {},
  cancelText: {},
});
