import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { firestore, auth } from "./firebaseSetup";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export function isLoggedIn() {
    if (auth.currentUser) return true;
    return false;
}

export async function loginWithEmailAndPassword(email, password) {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredentials)
    return userCredentials;
  } catch (err) {
    console.log("Error encountered with user login: ", err);
    return "error";
  }
}

export async function createNewUser(email, password) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredentials);
    return userCredentials;
  } catch (err) {
    console.log("Error encountered with user logout: ", err);
    return "error";
  }
}

export async function writeToDB() {
  try {
  } catch (err) {
    console.log("Error encountered with writing to database: ", err);
  }
}

export async function addNewUserToFirebase(userDetails) {
    // Add a new document with a generated id.
    try {
      data = {...userDetails, user: auth.currentUser.uid}
      // console.log(data)
      const docRef = await addDoc(collection(firestore, "Users"), data);
      console.log("Document written with ID: ", docRef.id);
      return 2;
    } catch (err) {
      console.log(err);
      return 0;
    }
}

export async function deleteFromDB() {
  try {
  } catch (err) {
    console.log("Error encountered with deleting from database: ", err);
  }
}

export async function updateToDB() {
  try {
  } catch (err) {
    console.log("Error encountered with updating database: ", err);
  }
}

export async function readFromDB() {
  try {
  } catch (err) {
    console.log("Error encountered with reading from database:", err);
  }
}
