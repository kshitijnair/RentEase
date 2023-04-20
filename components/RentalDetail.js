import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button, FlatList, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { collection, query, onSnapshot, where } from "firebase/firestore";

import Comment from "./Comment";
import Booking from "./Booking";
import { firestore } from "../firebase/firebaseSetup";

const RentalDetail = ({ route }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log(
      "-------------------------------------------------------------"
    );
    const commentsQuery = query(collection(firestore, "Comments"));
    const subscribeComments = onSnapshot(commentsQuery, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const commentData = doc.data();
        console.log(commentData);
        data.push(commentData);
      });
      setComments(data);
      console.log("Comments are: ");
      console.log(comments);
    });

    return () => subscribeComments();
  }, []);

  const { rental } = route.params;
  // console.log(rental);
  // console.log("Rental Details:", rental);

  const [commentModalVisible, setcommentModalVisible] = useState(false);
  const [bookingModalVisible, setbookingModalVisible] = useState(false);

  function bookAppointment() {
    console.log("book appt");
    setbookingModalVisible(true);
  }

  function leaveComment() {
    console.log("Leaving comment");
    setcommentModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: rental.image }} style={styles.image} />
      <ScrollView style={styles.textContainer}>
        <Text style={styles.title}>{rental?.title}</Text>
        <View style={styles.infoContainer}>
          <Icon name="map-marker" size={20} color="#ccc" />
          <Text style={styles.info}>{rental.address}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="home" size={20} color="#ccc" />
          <Text style={styles.info}>{rental.type}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="usd" size={20} color="#ccc" />
          <Text style={styles.info}>${rental.price}/month</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="bed" size={20} color="#ccc" />
          <Text style={styles.info}>{rental.rooms} Bedrooms</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="bath" size={20} color="#ccc" />
          <Text style={styles.info}>{rental.bathrooms} Bathrooms</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="calendar" size={20} color="#ccc" />
          <Text style={styles.info}>
            Minimum Lease: {rental.minLease} months
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="info-circle" size={20} color="#ccc" />
          <Text style={styles.info}>{rental.description}</Text>
        </View>
        <View>
          {comments.map((item) => <Text key={item.user}>{item.comment}</Text>)}
          {/* <FlatList
            data={comments}
            renderItem={({ item }) => {
              
            }}
            keyExtractor={(item) => item.listingID}
          /> */}
        </View>
        {commentModalVisible ? (
          <Comment
            commentModalVisible={commentModalVisible}
            setcommentModalVisible={setcommentModalVisible}
            listingID={rental.id}
          />
        ) : null}
        {bookingModalVisible ? (
          <Booking
            bookingModalVisible={bookingModalVisible}
            setbookingModalVisible={setbookingModalVisible}
            listingID={rental.id}
          />
        ) : null}
        <Button title="Leave Comment" onPress={leaveComment} />
        <Button title="Book Appointment" onPress={bookAppointment} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  info: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default RentalDetail;
