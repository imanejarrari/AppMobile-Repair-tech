import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './HomeScreen';
import RepairScreen from './RepairScreen';
import SettingsScreen from './settingsScreen';
import ChatScreen from './chat';


// Screen names
const homeName = 'Home';
const repairName = 'Repair';
const settingsName = 'Settings';
const ChatName ="Chat";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
  
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === repairName) {
              iconName = focused ? 'build' : 'build-outline';
            } else if (route.name === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === ChatName) {
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
        <Tab.Screen name={homeName} component={HomeScreen} 
        options={{
          headerShadowVisible:false,
          headerShown: false,
        }}
        />
        <Tab.Screen name={repairName}  component={RepairScreen} 
                options={{
                  headerShown: false ,
                
                }}
                
        />
        <Tab.Screen name={ChatName} options={{ headerShown: false }} component={ChatScreen} />
        <Tab.Screen name={settingsName} options={{ headerShown: false }} component={SettingsScreen} />
       
        
      </Tab.Navigator>
    
  );
};

export default MainScreen;


