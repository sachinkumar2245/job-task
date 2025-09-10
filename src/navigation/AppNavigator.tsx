import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

// Import all of our screens
import ProductListScreen from "../screen/ProductListScreen.tsx";
import CartScreen from '../screen/CartScreen';
import LargeListScreen from '../screen/LargeListScreen';
import UsersScreen from '../screen/UserScreen';
import ProfileScreen from '../screen/ProfileScreen';
import DeviceScreen from '../screen/DeviceScreen';
import UserDetailsScreen from '../screen/UserDetailsScreen';

// --- Type Definitions for our Navigators ---

// Defines the screens and params for the Users stack (for deep linking)
type UserStackParamList = {
  UserList: undefined;
  UserDetails: { userId: string };
};

// Defines the screens for the main Bottom Tab Navigator
type RootTabParamList = {
  Products: undefined;
  Cart: undefined;
  'Large List': undefined;
  Users: undefined; // This tab will contain the UserStack
  Profile: undefined;
  Device: undefined;
};

// --- Create the Navigators ---
const Stack = createStackNavigator<UserStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

// --- Deep Linking Configuration ---
const linking: LinkingOptions<UserStackParamList> = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      UserList: 'users',
      UserDetails: 'user/:userId',
    },
  },
};

// A separate component for the User stack navigation
function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UsersScreen} options={{ title: 'Users' }} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
    </Stack.Navigator>
  );
}

// The main AppNavigator containing the Tab Navigator
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // We hide the header here because the Stack has its own
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'help-circle';

            if (route.name === 'Products') {
              iconName = focused ? 'list-circle' : 'list-circle-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Large List') {
                iconName = focused ? 'server' : 'server-outline';
            } else if (route.name === 'Users') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            } else if (route.name === 'Device') {
                iconName = focused ? 'hardware-chip' : 'hardware-chip-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Products" component={ProductListScreen} options={{headerShown: true}} />
        <Tab.Screen name="Cart" component={CartScreen} options={{headerShown: true}} />
        <Tab.Screen name="Large List" component={LargeListScreen} options={{headerShown: true}} />
        {/* Here we nest the Stack Navigator inside a tab */}
        <Tab.Screen name="Users" component={UserStack} /> 
        <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: true}}/>
        <Tab.Screen name="Device" component={DeviceScreen} options={{headerShown: true}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;