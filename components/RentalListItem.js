import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';

const RentalListItem = ({ data }) => {
  const [searchText, setSearchText] = useState('');

  const renderItem = ({ item }) => (
    
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.address}</Text>
      <Text style={styles.text}>Type: {item.type}</Text>
      <Text style={styles.text}>Location: {item.location}</Text>
      <Text style={styles.text}>Price: ${item.price}/month</Text>
      <Text style={styles.text}>Rooms: {item.rooms}</Text>
      <Text style={styles.text}>Bathrooms: {item.bathrooms}</Text>
      <Text style={styles.text}>Min Lease: {item.minLease} months</Text>
      <Text style={styles.text}>Description: {item.description}</Text>
      </View>
    </View>
  );

  const filteredData = data.filter(
    item =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
      || item.address.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 180,
    height: 180,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 10,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
  },
});

export default RentalListItem;
