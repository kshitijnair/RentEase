import { StyleSheet, Text, SafeAreaView, Button, FlatList } from "react-native";
import React, { useState } from "react";


const TempFullView = ({ route, navigation }) => {
  const { item } = route.params;

  const [modalVisible, setModalVisible] = useState(false);

  function bookAppointment() {
    console.log("book appt");
  }

  function leaveComment() {
    console.log("Leaving comment");
    setModalVisible(true);
  }

  return (
    <SafeAreaView>
        {modalVisible ? <Comment modalVisible={modalVisible} setModalVisible={setModalVisible} /> : null}
      <Text>TempFullView</Text>
      <Text>{item.id}</Text>
      <Text>{item.description}</Text>
      <Text>         </Text>
      <Text>COMMENTS:</Text>
      <Text>         </Text>
      {/* <FlatList
        data = {comments}

      /> */}
      <Button title="Leave Comment" onPress={leaveComment} />
      <Button title="Book Appointment" onPress={bookAppointment} />
    </SafeAreaView>
  );
};

export default TempFullView;

const styles = StyleSheet.create({});
