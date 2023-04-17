import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { addFeedback } from "../firebase/firebaseHelper";
import { auth } from "../firebase/firebaseSetup";

const Comment = ({ listingID, modalVisible, setModalVisible }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(-1);

  function removeModal() {
    setComment("");
    setRating(-1);
    setModalVisible(false);
  }

  function submitComment() {
    const feedback = {
      comment: comment,
      rating: rating,
    };
    console.log("Comment is: ", feedback);
    addFeedback(feedback, listingID);
  }

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Feedback</Text>
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.label}>Leave a comment</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              placeholder="enter comment here"
              onChangeText={(comment) => setComment(comment)}
            />
          </View>
          <View>
            <Text style={styles.label}>Rate your visit</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(rating) => setRating(rating)}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={removeModal} />
          <Button title="Submit" onPress={submitComment} />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    // borderColor: "red",
    // borderWidth: 2,
    justifyContent: "center",
    width: 300,
  },
  header: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
    fontSize: 24,
    fontWeight: 400,
  },
  label: {
    paddingTop: 25,
    fontSize: 20,
    fontWeight: 600,
  },
  input: {
    borderBottomColor: "purple",
    borderTopColor: "rgba(0,0,0,0)",
    borderLeftColor: "rgba(0,0,0,0)",
    borderRightColor: "rgba(0,0,0,0)",
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 18,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
