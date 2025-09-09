import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'my-super-secret-auth-token';

const ProfileScreen: React.FC = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // To show a loader while checking storage

  // This effect runs once when the screen loads to check for a saved token
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        if (storedToken) {
          console.log('Token found!', storedToken);
          setAuthToken(storedToken);
        }
      } catch (error) {
        console.error('Failed to load the auth token', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const handleLogin = async () => {
    // In a real app, you'd get this from an API response
    const newToken = `dummy-token-${Date.now()}`;
    setAuthToken(newToken);
    await SecureStore.setItemAsync(TOKEN_KEY, newToken);
    console.log('Token saved!');
  };

  const handleLogout = async () => {
    setAuthToken(null);
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    console.log('Token deleted!');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Secure Auth Token</Text>
      <View style={styles.tokenContainer}>
        <Text style={styles.tokenLabel}>Current Token:</Text>
        <Text style={styles.tokenText}>
          {authToken ? authToken : 'Not Logged In'}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {authToken ? (
          <Button title="Logout" onPress={handleLogout} color="#dc3545" />
        ) : (
          <Button title="Simulate Login" onPress={handleLogin} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  tokenContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    marginBottom: 30,
    width: '90%',
    alignItems: 'center',
  },
  tokenLabel: {
    fontSize: 16,
    color: '#6c757d',
  },
  tokenText: {
    fontSize: 14,
    color: '#000',
    marginTop: 8,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '60%',
  },
});

export default ProfileScreen;