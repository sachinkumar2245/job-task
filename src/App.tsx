// import React from 'react';
// import { StyleSheet, View, Text, FlatList } from 'react-native';

// // A function to generate mock data.
// const generateMockData = (count: number) => {
//   const data: { id: string; title: string; description: string }[] = [];
//   for (let i = 0; i < count; i++) {
//     data.push({
//       id: String(i),
//       title: `Item #${i + 1}`,
//       description: `This is the description for item number ${i + 1}.`,
//     });
//   }
//   return data;
// };

// const DATA = generateMockData(5000);
// const ITEM_HEIGHT = 80; // A fixed height for our list items.

// const Item = ({ title, description }: { title: string; description: string }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//     <Text style={styles.description}>{description}</Text>
//   </View>
// );

// const App = () => {
//   return (
//     <FlatList
//       data={DATA}
//       renderItem={({ item }) => <Item title={item.title} description={item.description} />}
//       keyExtractor={item => item.id}
//       getItemLayout={(data, index) => ({
//         length: ITEM_HEIGHT,
//         offset: ITEM_HEIGHT * index,
//         index,
//       })}
//       windowSize={21}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: '#f9c9ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 8,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   description: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default App;

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator'; // Import our navigator

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
      <StatusBar barStyle="dark-content" />
    </SafeAreaProvider>
  );
}