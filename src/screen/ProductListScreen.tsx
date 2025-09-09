import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, ListRenderItemInfo } from 'react-native';
// CHANGE IS HERE: Import SafeAreaView from the correct library
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '../store/cartStore'; 

// We can import this type from the store to keep things consistent
import type { Product } from '../store/cartStore';

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'React Native Course', price: 19.99 },
  { id: 2, name: 'JavaScript Book', price: 29.99 },
  { id: 3, name: 'State Management Guide', price: 9.99 },
  { id: 4, name: 'Cool T-Shirt', price: 15.00 },
];

const ProductListScreen: React.FC = () => {
  const { addToCart } = useCartStore();

  const renderItem = ({ item }: ListRenderItemInfo<Product>) => (
    <View style={styles.productContainer}>
      <View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <Button title="Add to Cart" onPress={() => addToCart(item)} />
    </View>
  );

  return (
    // This SafeAreaView is now correct and the warning is gone
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={MOCK_PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
});

export default ProductListScreen;