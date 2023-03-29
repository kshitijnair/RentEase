import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { firestore } from '../firebase/firebaseSetup';
import { collection, query, onSnapshot } from 'firebase/firestore';

import RentalListItem from './RentalListItem';

const RentalList = () => {
  const [listings, setListings] = useState([]);


  useEffect(() => {
    const q = query(collection(firestore, 'Listing'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listings = [];
      querySnapshot.forEach((doc) => {
        listings.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setListings(listings);
      console.log(listings);
    });

    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <RentalListItem data={listings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RentalList;
