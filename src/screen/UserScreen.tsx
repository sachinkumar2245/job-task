import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ListRenderItemInfo } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

// Define the shape of our User data
type User = {
  id: number;
  name: string;
  email: string;
};

const API_URL = 'https://jsonplaceholder.typicode.com/users';
const CACHE_KEY = 'cachedUsers'; // The key for our data in AsyncStorage

const UsersScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This function runs when the screen first loads
    loadUsersData();
  }, []);

  const loadUsersData = async () => {
    setIsLoading(true);
    setError(null);

    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      console.log('You are online. Fetching fresh data...');
      try {
        const response = await fetch(API_URL);
        const data: User[] = await response.json();
        setUsers(data);
        // Save the fresh data to local storage for offline use
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
      } catch (e) {
        setError('Failed to fetch data. Trying to load from cache...');
        loadFromCache(); // Fallback to cache if online fetch fails
      }
    } else {
      console.log('You are offline. Loading data from cache...');
      loadFromCache();
    }
    setIsLoading(false);
  };

  const loadFromCache = async () => {
    try {
      const cachedDataString = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedDataString) {
        const cachedData: User[] = JSON.parse(cachedDataString);
        setUsers(cachedData);
      } else {
        setError('No cached data available. Please connect to the internet.');
      }
    } catch (e) {
      setError('Failed to load data from cache.');
    }
  };
  
  const renderItem = ({ item }: ListRenderItemInfo<User>) => (
    <View style={styles.userContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  userContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    paddingHorizontal: 20,
  },
});

export default UsersScreen;