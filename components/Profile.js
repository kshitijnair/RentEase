import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseSetup";
import { getUserDetails } from "../firebase/firebaseHelper";
import { deleteUser } from "@firebase/auth";
import { updateUserAgeInDb } from "../firebase/firebaseHelper";

const Profile = () => {
  const [userEmail, setuserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(0);

  useEffect(() => {
    // console.log(result.id)
    setuserEmail(auth.currentUser.email);
    setUserName(auth.currentUser.email.split("@")[0]);
  }, []); //get all user info

  async function updateUserAge() {
    updateUserAgeInDb(userAge);
    console.log("changing user's age on records (firestore)");
  }

  async function deleteUserHandler() {
    deleteUser(auth.currentUser)
      .then(() => {
        console.log("User Deleted");
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  return (
    <SafeAreaView>
      <Text>Email: {userEmail}</Text>
      <Text>Name: {userName}</Text>
      <Button
        title="Delete Profile"
        onPress={deleteUserHandler}
        color="red"
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
