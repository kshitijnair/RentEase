import {
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  Button,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { makeBooking } from "../firebase/firebaseHelper";

const Booking = ({ modalVisible, setbookingModalVisible, listingID }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [pickedDateTime, setPickedDateTime] = useState(null);
  const [pickedDateTimeString, setPickedDateTimeString] =
    useState("Select Date");
  const [datePicked, setDatePicked] = useState(false);
  const [bookingNotes, setBookingNotes] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setPickedDateTime(date);
    getDateTime(date);
    setDatePicked(true);
    hideDatePicker();
  };

  const getDateTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const dateTime =
      date.toString().slice(0, 16) + hours + ":" + minutes + " " + newformat;
    // console.log("----------------------", dateTime);
    setPickedDateTimeString(dateTime);
    console.log(dateTime);
  };

  const confirmBooking = async () => {
    if (datePicked) {
      console.log("Booking confirmed: ");
      console.log(pickedDateTimeString);
      console.log(bookingNotes);
      const res = await makeBooking(
        pickedDateTimeString,
        bookingNotes,
        listingID
      );
      Alert.alert("Booking for: ", pickedDateTimeString);
    } else Alert.alert("No date was selected!");
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView>
        <Text style={styles.header}>Book Appointment</Text>
        <View style={styles.dateView}>
          <Pressable style={styles.dateButton} onPress={showDatePicker}>
            <Text style={styles.dateText}>
              {pickedDateTime.toString().slice(0, 21)}
            </Text>
          </Pressable>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.notesBox}
            placeholder="text"
            value={bookingNotes}
            onChangeText={setBookingNotes}
          ></TextInput>
        </View>
        <Button title="Make Appointment" onPress={confirmBooking} />
        <Button title="Cancel" onPress={() => setbookingModalVisible(false)} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          display="inline"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default Booking;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 0,
    fontSize: 24,
    fontWeight: 400,
  },
  dateView: {
    flexDirection: "row",
    margin: 75,
    marginBottom: 25,
    justifyContent: "center",
  },
  dateButton: {
    backgroundColor: "pink",
    borderColor: "pink",
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
    width: 275,
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
  },
  inputView: {
    alignItems: "center",
  },
  notesBox: {
    borderColor: "rgb(230, 230, 230)",
    borderRadius: 15,
    borderWidth: 2,
    width: 300,
    // height: 200,
    padding: 10,
    marginBottom: 50,
    backgroundColor: "rgb(230, 230, 230)",
  },
});
