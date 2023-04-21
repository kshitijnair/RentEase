import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import {
  collection,
  query,
  addDoc,
  onSnapshot,
  where,
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage, firestore } from "../firebase/firebaseSetup";
import { deleteUser } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import BookingItem from "./BookingItem";

const Profile = () => {
  const [userEmail, setuserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setuserEmail(auth.currentUser.email);
    if (auth.currentUser.email)
      setUserName(auth.currentUser.email.split("@")[0]);
    else setUserName("Anonymous");

    const userId = auth.currentUser.uid;
    const bookingsRef = collection(firestore, "Appointments");
    const bookingsQuery = query(bookingsRef, where("user", "==", userId));

    const subscribeBookings = onSnapshot(bookingsQuery, (querySnapshot) => {
      const bookings = [];
      querySnapshot.forEach((doc) => {
        const bookingsData = doc.data();
        console.log(bookingsData);
        // const listingID = bookingsData.listingID || [];
        // bookings.push(...listingID);
        bookings.push(bookingsData);
        setBookings(bookings);
      });
      console.log("Bookings are: ");
      console.log(bookings);
    });

    return () => subscribeBookings();
  }, []);

  const selectProfileImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access media library is required");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      try {
        const imageRef = ref(
          storage,
          `profileImages/${auth.currentUser.uid}.jpg`
        );
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();

        await uploadBytes(imageRef, blob);

        // Get download URL of uploaded image
        const downloadURL = await getDownloadURL(imageRef);

        // Set profileImage state to URI of uploaded image
        setProfileImage(downloadURL);
      } catch (error) {
        console.log("Error uploading profile image: ", error);
      }
    }
  };

  const renderProfileImage = () => {
    if (profileImage) {
      return (
        <>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <TouchableOpacity
            style={styles.editButton}
            onPress={selectProfileImage}
          >
            <Text style={styles.editButtonText}>Edit Profile Picture</Text>
          </TouchableOpacity>
        </>
      );
    } else {
      const imageRef = ref(
        storage,
        `profileImages/${auth.currentUser.uid}.jpg`
      );
      getDownloadURL(imageRef)
        .then((url) => {
          setProfileImage(url);
        })
        .catch((error) => {
          console.log("Error fetching profile image URL: ", error);
        });

      return (
        <TouchableOpacity
          style={styles.cameraIconContainer}
          onPress={selectProfileImage}
        >
          <Image
            source={require("../assets/camera.png")}
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      );
    }
  };

  const onDeleteUser = async () => {
    deleteUser(auth.currentUser)
      .then(() => {
        console.log("User Deleted");
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.}>{renderProfileImage()}</View>
      <View style={styles.container}>
        <Text style={styles.nameText}>Email: {userEmail}</Text>
        <Text style={styles.nameText}>Name: {userName}</Text>
        <View style={styles.bookingHeaderContainer}>
          <Text style={styles.bookingHeader}>Bookings</Text>
        </View>
        <View>
          <FlatList
            data={bookings}
            renderItem={({ item }) => {
              if (item.user === auth.currentUser.uid)
                return <BookingItem booking={item} />;
            }}
            keyExtractor={(item) => item.listingID}
          />
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={onDeleteUser}>
          <Text style={styles.deleteButtonText}>Delete Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    alignSelf: "center",
  },
  cameraIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIcon: {
    width: 50,
    height: 50,
  },
  nameText: {
    // marginTop: 16,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  editButton: {
    marginTop: 10,
    backgroundColor: "pink",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    width: 200,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  bookingHeaderContainer: {
    alignItems: "center",
    margin: 10,
    marginTop: 20,
    paddingBottom: 5,
    borderBottomColor: "rgb(230, 230, 230)",
    borderBottomWidth: 2,
  },
  bookingHeader: {
    fontSize: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
