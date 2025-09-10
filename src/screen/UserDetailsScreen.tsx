import React from 'react';
import {  Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';

// Define the type for our screen's parameters
type UserDetailsRouteParams = {
  UserDetails: {
    userId: string;
  };
};

// Define the type for the route prop
type UserDetailsScreenRouteProp = RouteProp<UserDetailsRouteParams, 'UserDetails'>;

const UserDetailsScreen: React.FC = () => {
  const route = useRoute<UserDetailsScreenRouteProp>();
  // Extract the userId from the route's parameters
  const { userId } = route.params || {}; // Added fallback for safety

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      <Text style={styles.text}>
        You have opened the profile for User ID:
      </Text>
      <Text style={styles.userId}>{userId || 'Not Provided'}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
  userId: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'tomato',
    marginTop: 10,
  },
});

export default UserDetailsScreen;