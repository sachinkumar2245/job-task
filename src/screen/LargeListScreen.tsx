import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ListRenderItemInfo } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define the shape of our list item
type ListItem = {
  id: string;
  title: string;
  description: string;
};

const PAGE_SIZE = 20; // How many items to load per page
const TOTAL_ITEMS = 5000;
const ITEM_HEIGHT = 80; // The fixed height of each list item

// --- Let's generate a massive list of mock data ---
const masterData: ListItem[] = Array.from({ length: TOTAL_ITEMS }, (_, index) => ({
  id: `item-${index + 1}`,
  title: `Item #${index + 1}`,
  description: `This is the description for item number ${index + 1}.`,
}));
// --- End of mock data generation ---

const LargeListScreen: React.FC = () => {
  const [data, setData] = useState<ListItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // This function simulates fetching data from an API
  const fetchMoreData = useCallback(() => {
    if (isLoading) return; // Prevent multiple fetches at once

    setIsLoading(true);
    // Simulate a network delay
    setTimeout(() => {
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const newData = masterData.slice(start, end);

      if (newData.length > 0) {
        setData((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
      }
      setIsLoading(false);
    }, 500);
  }, [page, isLoading]);

  useEffect(() => {
    // Load the initial set of data
    fetchMoreData();
  }, []);

  // Optimization: Tell FlatList the exact height of each item
  const getItemLayout = (_data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const renderItem = ({ item }: ListRenderItemInfo<ListItem>) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} size="large" />;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // --- Optimization Props ---
        onEndReached={fetchMoreData} // Load more when we reach the end
        onEndReachedThreshold={0.5} // How close to the end to trigger onEndReached
        ListFooterComponent={renderFooter} // Show a loading spinner at the bottom
        getItemLayout={getItemLayout} // For smoother scrolling
        windowSize={10} // Reduces memory usage
        initialNumToRender={PAGE_SIZE} // Render the first page quickly
        maxToRenderPerBatch={PAGE_SIZE} // Control number of items rendered per batch
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default LargeListScreen;