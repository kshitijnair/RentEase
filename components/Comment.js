import { StyleSheet, Text, View, Modal, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Comment = ({ listingID, modalVisible, setModalVisible }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(-1);

  function removeModal() {
    setComment("");
    setRating(-1);
    setModalVisible(false);
  }

  return (
    <Modal
      style={styles.modal}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <SafeAreaView style={styles.container}>
        <Text>Leave a comment:</Text>
        <TextInput
          placeholder="enter comment here "
          onChangeText={(comment) => setComment(comment)}
        />
        <Text>Rate your visit:</Text>
        <TextInput
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(rating) => setRating(rating)}
        />
      </SafeAreaView>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={removeModal} />

        <Button title="Submit" />
      </View>
    </Modal>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    height: 300,
    backgroundColor: "#eee",
    // alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
