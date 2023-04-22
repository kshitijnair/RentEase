import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import RentalDetail from "./RentalDetail";

const RentalListItem = ({ data, bookmarks, toggleBookmark }) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.address.toLowerCase().includes(searchText.toLowerCase()) ||
      item.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("RentalDetail", { rental: item })}
    >
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.detailsTextContainer}>
            <Text style={styles.text}>
              {item.rooms} Room + {item.bathrooms} Bathroom
            </Text>
            <Text style={[styles.text, styles.priceText]}>${item.price}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => toggleBookmark(item.id)}
          style={styles.bookmarkButton}
        >
          <Icon
            name={bookmarks.includes(item.id) ? "bookmark" : "bookmark-o"}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 150,
    height: 125,
    marginRight: 10,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
  },
  locationContainer: {
    flex: 2,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 500,
  },
  detailsTextContainer: {
    flex: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 2,
  },
  priceText: {
    color: "green",
    fontSize: 18,
    fontWeight: 600,
    marginTop: 3,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgb(200, 200, 200)",
    margin: 10,
    paddingHorizontal: 10,
  },
  bookmarkButton: {
    alignSelf: "flex-end",
  },
});

export default RentalListItem;
