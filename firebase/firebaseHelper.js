import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { firestore, auth } from "./firebaseSetup";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export async function loginWithEmailAndPassword(email, password) {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredentials);
    console.log("euiorhgiwurih")
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
