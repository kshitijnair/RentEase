import { StyleSheet, Text, View, Pressable, Image, Alert } from "react-native";
import React from "react";
import { deleteBooking } from "../firebase/firebaseHelper";

const BookingItem = ({ booking }) => {
  // console.log(booking)
  const cancelBooking = async (booking) => {
    Alert.alert(
      `${booking.address}`,
      "Are you sure you want to cancel?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("NO CANCELLATION"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            console.log("USER CONFIRMED CANCELLATION: ", booking.id);
            deleteBooking(booking.id)
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  };
  return (
    <View style={styles.bookingItemView}>
      {/* <Image /> */}
      <View style={styles.detailsView}>
        <Text style={styles.addresstText}>{booking.address}</Text>
        <Text style={styles.timeText}>{booking.time}</Text>
      </View>
      <Pressable
        style={styles.cancelButton}
        onPress={() => cancelBooking(booking)}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
    </View>
  );
};

export default BookingItem;

const styles = StyleSheet.create({
  bookingItemView: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 18,
    backgroundColor: "rgb(230, 230, 230)",
    width: 325,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: { width: 1, height: 5 },
    shadowColor: "#171717",
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  detailsView: {
    // width: 200
  },
  addresstText: {
    fontSize: 15,
    fontWeight: 500,
  },
  timeText: {
    color: "green",
    fontSize: 13,
  },
  cancelButton: {
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 46, 46, 0.8)",
  },
  cancelText: {
    color: "white",
  },
});
