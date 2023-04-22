import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { collection, query, onSnapshot, where } from "firebase/firestore";

import Comment from "./Comment";
import Booking from "./Booking";
import { firestore } from "../firebase/firebaseSetup";

const RentalDetail = ({ route }) => {
  const [comments, setComments] = useState([]);
  const { rental } = route.params;
  console.log("Rental Details:", rental);

  useEffect(() => {
    const commentsQuery = query(collection(firestore, "Comments"));
    const subscribeComments = onSnapshot(commentsQuery, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const commentData = doc.data();
        console.log(commentData);
        console.log(rental.id);
        if (commentData.listingID === rental.id) data.push(commentData);
      });
      setComments(data);
      console.log("Comments are: ");
      console.log(comments);
    });

    return () => subscribeComments();
  }, []);

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
        <View style={styles.commentContainer}>
          <View style={styles.commentHeaderContainer}>
            <Text style={styles.commentHeader}>Comments</Text>
          </View>
          {comments.map((item) => (
            <View style={styles.commentWrapper}>
              <Text>{item.rating}/5</Text>
              <Text key={item.userID} style={styles.comment}>
                {item.comment}
              </Text>
            </View>
          ))}
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
            rental={rental}
          />
        ) : null}
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.bookingButton} onPress={leaveComment}>
            <Text style={styles.buttonText}>Add Comment</Text>
          </Pressable>
          <Pressable style={styles.bookingButton} onPress={bookAppointment}>
            <Text style={styles.buttonText}>Book Viewing</Text>
          </Pressable>
        </View>
        {/* <Button title="Leave Comment" onPress={leaveComment} />
        <Button title="Book Appointment" onPress={bookAppointment} /> */}
        <View style={{ height: 100 }}></View>
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
  commentContainer: {
    marginBottom: 20,
  },
  commentHeaderContainer: {
    alignItems: "center",
    margin: 10,
    marginTop: 20,
    paddingBottom: 5,
    borderBottomColor: "rgb(230, 230, 230)",
    borderBottomWidth: 2,
  },
  commentHeader: {
    fontSize: 20,
  },
  commentWrapper: {
    borderLeftColor: "rgb(230, 230, 230)",
    borderLeftWidth: 5,
    marginBottom: 10,
    paddingLeft: 5,
  },
  comment: {
    fontSize: 16,
  },
  buttonsContainer: {
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  bookingButton: {
    backgroundColor: "#007aff",
    padding: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "#ff3b30",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: 400,
  },
});

export default RentalDetail;
