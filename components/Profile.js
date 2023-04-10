import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from "../firebase/firebaseSetup";
import { deleteUser } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const [userEmail, setuserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(0);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    setuserEmail(auth.currentUser.email);
    setUserName(auth.currentUser.email.split("@")[0]);
  }, []);

  const selectProfileImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission to access media library is required');
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
        const imageRef = ref(storage, `profileImages/${auth.currentUser.uid}.jpg`);
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
          <TouchableOpacity style={styles.editButton} onPress={selectProfileImage}>
            <Text style={styles.editButtonText}>Edit Profile Picture</Text>
          </TouchableOpacity>
        </>
      );
    } else {
      const imageRef = ref(storage, `profileImages/${auth.currentUser.uid}.jpg`);
      getDownloadURL(imageRef)
        .then((url) => {
          setProfileImage(url);
        })
        .catch((error) => {
          console.log("Error fetching profile image URL: ", error);
        });
  
      return (
        <TouchableOpacity style={styles.cameraIconContainer} onPress={selectProfileImage}>
          <Image source={require('../assets/camera.png')} style={styles.cameraIcon} />
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
      <Text  style={styles.nameText} >Email: {userEmail}</Text>
      <Text  style={styles.nameText} >Name: {userName}</Text>
      {renderProfileImage()}
      <TouchableOpacity style={styles.deleteButton} onPress={onDeleteUser}>
        <Text style={styles.deleteButtonText}>Delete Profile</Text>
      </TouchableOpacity>
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
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: 50,
    height: 50,
  },
  nameText: {
    marginTop: 16,
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 10,
    backgroundColor: "blue",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Profile;
