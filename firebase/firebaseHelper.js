import {
  collection,
  addDoc,
  doc,
  deleteDo,
  db,
  where,
  query,
  getDoc,
  getDocs,
} from "firebase/firestore";
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
    console.log(userCredentials);
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
    data = {
      ...userDetails,
      email: auth.currentUser.email,
      user: auth.currentUser.uid,
    };
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

export async function getUserDetails(userID) {
  console.log("userid bein searched is: ", userID);
  const usersRef = collection(firestore, "Users");
  const q = query(usersRef, where("user", "==", userID));
  const querySnapshot = await getDocs(q);
  let first;
  console.log(querySnapshot);
  let i = 0;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    if (i == 0) {
      console.log(doc.id, " => ", doc.data());
      first = doc.data();
    }
    i = i + 1;
  });
  console.log(first);
  return first;
}

export async function addFeedback(feedback, listingID) {
  try {
    let today = new Date();
    const date =
      String(today.getMonth() + 1).padStart(2, "0") +
      "/" +
      String(today.getDate()).padStart(2, "0") +
      "/" +
      today.getFullYear();
    data = {
      ...feedback,
      user: auth.currentUser.uid,
      date: date
    };
    console.log(data);
    const docRef = await addDoc(collection(firestore, "Comments"), data);
    console.log("Document written with ID: ", docRef.id);
    return 1;
  } catch (err) {
    console.log(err);
    return -1;
  }
}

export async function makeBooking(dateTime, bookingNotes, listingID) {
  try {
    data = {
      user: auth.currentUser.uid,
      listingID: listingID,
      time: dateTime,
      notes: bookingNotes
    };
    console.log(data);
    const docRef = await addDoc(collection(firestore, "Appointments"), data);
    console.log("Document written with ID: ", docRef.id);
    return 1;
  } catch (err) {
    console.log(err);
    return -1;
  }
}
