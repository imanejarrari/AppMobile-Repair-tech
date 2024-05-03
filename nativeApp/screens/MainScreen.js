import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './HomeScreen';
import RepairScreen from './RepairScreen';
import SettingsScreen from './settingsScreen';
import ChatScreen from './ChatScreen';

// Screen names
const homeName = 'Home';
const repairName = 'Repair';
const settingsName = 'Me';
const chatName = 'Chat'; // Changed to camelCase for consistency

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName} // Corrected variable name
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === repairName) {
            iconName = focused ? 'build' : 'build-outline';
          } else if (route.name === settingsName) {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === chatName) { // Corrected variable name
            iconName = focused ? 'chatbubble' : 'chatbubble-ellipses-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#8B322C',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name={repairName} component={RepairScreen} options={{ headerShown: false }}   />
      <Tab.Screen name={chatName} component={ChatScreen} options={{ headerShown: false }} />
      <Tab.Screen name={settingsName} component={SettingsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default MainScreen;
