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
import React, { useState,useEffect } from "react";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { makeBooking } from "../firebase/firebaseHelper";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Booking = ({ modalVisible, setbookingModalVisible, listingID }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [pickedDateTime, setPickedDateTime] = useState(null);
  const [pickedDateTimeString, setPickedDateTimeString] =
    useState("Select Date");
  const [datePicked, setDatePicked] = useState(false);
  const [bookingNotes, setBookingNotes] = useState("");
  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notification received:', notification);
      }
    );

    const responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('Notification response received:', response);
      }
    );

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('No notification permissions granted!');
      return false;
    }
    return true;
  };

  const scheduleNotification = async (dateTime) => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return;
  
    const appointmentDate = dateTime;
    const currentDate = new Date();
    const secondsToAppointment = (appointmentDate - currentDate) / 1000;
    const secondsEarlier = 5 ; // 5 minutes in seconds
  
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Your appointment is coming up!',
        body: `Your appointment is scheduled for ${pickedDateTimeString}`, // Use pickedDateTimeString for display purposes
      },
      trigger: {
        seconds: (secondsToAppointment - secondsEarlier) > 0 ? (secondsToAppointment - secondsEarlier) : 1, // Schedule for 5 minutes earlier, or 1 second later if the time is in the past
      },
    });
  };
  
  
  

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
      scheduleNotification(pickedDateTime); // Pass pickedDateTime instead of pickedDateTimeString
      setbookingModalVisible(false);
    } else Alert.alert("No date was selected!");
  };
  

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView>
        <Text style={styles.header}>Book Appointment</Text>
        <View style={styles.dateView}>
          <Pressable style={styles.dateButton} onPress={showDatePicker}>
            <Text style={styles.dateText}>
              {datePicked
                ? pickedDateTime.toString().slice(0, 21)
                : pickedDateTimeString}
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
