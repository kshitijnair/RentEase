import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { firestore, auth } from "../firebase/firebaseSetup";
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
import RentalListItem from "./RentalListItem";

const RentalList = ({ navigation }) => {
  const [listings, setListings] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const listingsQuery = query(collection(firestore, "Listing"));
    const userId = auth.currentUser.uid;
    const bookmarksRef = collection(firestore, "Bookmarks");
    const bookmarksQuery = query(bookmarksRef, where("userId", "==", userId));

    const subscribeListings = onSnapshot(listingsQuery, (querySnapshot) => {
      const listings = [];
      querySnapshot.forEach((doc) => {
        listings.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setListings(listings);
    });

    const subscribeBookmarks = onSnapshot(bookmarksQuery, (querySnapshot) => {
      const bookmarks = [];
      querySnapshot.forEach((doc) => {
        const bookmarkData = doc.data();
        const listingIds = bookmarkData.listingIds || [];
        bookmarks.push(...listingIds);
      });
      setBookmarks(bookmarks);
    });

    return () => {
      subscribeListings();
      subscribeBookmarks();
    };
  }, []);

  const toggleBookmark = async (listingId) => {
    const userId = auth.currentUser.uid;
    const bookmarksRef = collection(firestore, "Bookmarks");
    const bookmarksQuery = query(bookmarksRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(bookmarksQuery);

    if (querySnapshot.empty) {
      const newBookmarkRef = await addDoc(bookmarksRef, {
        userId: userId,
        listingIds: [listingId],
      });
      setBookmarks([listingId]);
    } else {
      const bookmarkDocId = querySnapshot.docs[0].id;
      const bookmarkDocRef = doc(bookmarksRef, bookmarkDocId);
      const bookmarkData = querySnapshot.docs[0].data();
      const listingIds = bookmarkData.listingIds || [];

      if (listingIds.includes(listingId)) {
        await setDoc(
          bookmarkDocRef,
          { listingIds: arrayRemove(listingId) },
          { merge: true }
        );
        setBookmarks(listingIds.filter((id) => id !== listingId));
      } else {
        await setDoc(
          bookmarkDocRef,
          { listingIds: arrayUnion(listingId) },
          { merge: true }
        );
        setBookmarks([...listingIds, listingId]);
      }
    }
  };

  const renderListings = () => {
    if (activeTab === "home") {
      return (
        <RentalListItem
          data={listings}
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmark}
        />
      );
    } else {
      const bookmarkedData = listings.filter((listing) =>
        bookmarks.includes(listing.id)
      );
      return (
        <RentalListItem
          data={bookmarkedData}
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmark}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "home" ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab("home")}
        >
          <Text style={styles.tabText}>All Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "bookmarks" ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab("bookmarks")}
        >
          <Text style={styles.tabText}>Bookmarked</Text>
        </TouchableOpacity>
      </View>
      {renderListings()}
      {/* <RentalListItem data={listings} navigation={navigation} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  tabContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  activeTab: {
    // backgroundColor: '#333',
    // borderColor: '#333',
    backgroundColor: "#ccc",
    borderColor: "#999",
  },

  tabText: {
    color: "#333",
    fontWeight: "bold",
  },
});

export default RentalList;
