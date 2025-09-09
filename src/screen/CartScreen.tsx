import React from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
// Correct import from the new library
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useCartStore, CartItem } from '../store/cartStore';

const CartScreen: React.FC = () => {
  const { items } = useCartStore();
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const renderItem = ({ item }: ListRenderItemInfo<CartItem>) => (
    <View style={styles.cartItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>Your Cart</Text>
      <Text style={styles.totalText}>Total Items: {totalItemCount}</Text>
      {items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

// --- Complete Styles Object ---
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f8f9fa', // A slightly off-white background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    color: '#343a40', // Darker text for titles
  },
  totalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
    color: '#495057', // A medium gray for subtitles
  },
  listContent: {
    paddingHorizontal: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginVertical: 6,
    borderRadius: 12, // More rounded corners
    // Adding a subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
  },
  quantityText: {
    fontSize: 14,
    color: '#6c757d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});


export default CartScreen;