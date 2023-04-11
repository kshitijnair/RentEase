import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RentalDetail = ({ route }) => {
    const { rental } = route.params;
  console.log(rental);

  return (
    <View style={styles.container}>
      <Image source={{ uri: rental.image }} style={styles.image} />
      <View style={styles.textContainer}>
      <Text style={styles.title}>{rental?.title}</Text>
        <View style={styles.infoContainer}>
          <Icon name="map-marker" size={20} color="#ccc" />
          <Text style={styles.info}>{rental.address}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="home" size={20} color="#ccc" />
          <Text style={styles.info}>{rental.type}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="usd" size={20} color="#ccc" />
          <Text style={styles.info}>${rental.price}/month</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="bed" size={20} color="#ccc" />
          <Text style={styles.info}>{rental.rooms} Bedrooms</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="bath" size={20} color="#ccc" />
          <Text style={styles.info}>{rental.bathrooms} Bathrooms</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="calendar" size={20} color="#ccc" />
          <Text style={styles.info}>Minimum Lease: {rental.minLease} months</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="info-circle" size={20} color="#ccc" />
          <Text style={styles.info}>{rental.description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  info: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default RentalDetail;
