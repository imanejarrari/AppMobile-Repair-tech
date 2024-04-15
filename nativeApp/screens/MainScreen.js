import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image ,StyleSheet } from 'react-native';
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
          headerTitle:"",
          headerStyle:{backgroundColor:"#8B322C" , height:"30%",borderBottomRightRadius:100 , borderBottomLeftRadius:100},
          headerShadowVisible:false,
          headerLeft :()=>(
            <Image 
            source ={ require('../profile.jpg')}
            style={styles.avatar}

            
            /> 
            
 
          ),
          headerRight:()=>(
            <Ionicons 
            name={'notifications-outline'}
            size={30}
            style={{marginRight:30 ,color:'white'}}
            
             />
          )
        }}
        />
        <Tab.Screen name={repairName} component={RepairScreen} />
        <Tab.Screen name={ChatName} component={ChatScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
        
      </Tab.Navigator>
    
  );
};

export default MainScreen;


const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 75,
    marginTop: 110,
    marginLeft:30
  }
})