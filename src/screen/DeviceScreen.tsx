import React, { useState } from 'react';
import {  Text, StyleSheet, NativeModules, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// In a real scenario, this would be our custom native module
const { DeviceDetails } = NativeModules;

const DeviceScreen: React.FC = () => {
  const [osVersion, setOsVersion] = useState<string | null>(null);

  const fetchOsVersion = async () => {
    try {
      // This is where we would call the function from our native module
      const version = await DeviceDetails.getOSVersion();
      setOsVersion(version);
    } catch (error) {
      console.error("Failed to get OS version", error);
      // For the demo, we set a fallback value
      setOsVersion("Native module not found (e.g., Android 13)");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Native Module Concept</Text>
      <Button title="Get Device OS Version" onPress={fetchOsVersion} />
      {osVersion && (
        <Text style={styles.versionText}>
          OS Version: {osVersion}
        </Text>
      )}
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
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    versionText: {
        fontSize: 18,
        marginTop: 20,
    }
});

export default DeviceScreen;