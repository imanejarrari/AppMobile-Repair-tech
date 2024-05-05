import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BurgerMenu = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateToProfile = () => {
    navigation.replace('ProfileScreen');
    toggleMenu(); // Close the menu after navigation
  };

  const handleLogout= async () => {
    try {
      await auth.signOut();
      navigation.reset({ 
        index: 0,
        routes: [{ name: 'login' }]
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
    toggleMenu(); // Close the menu after logout
  };

  const navigateToContactUs = () => {
    // Implement navigation to Contact Us screen here
    toggleMenu(); // Close the menu after navigation
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleMenu}>
        <View style={styles.container}>
          <Ionicons name="menu-outline" size={30} color="white" />
        </View>
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={navigateToProfile}>
            <Ionicons name="person-outline" size={20} color="black" style={styles.icon} />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="black" style={styles.icon} />
            <Text style={styles.menuText}>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={navigateToContactUs}>
            <Ionicons name="mail-outline" size={20} color="black" style={styles.icon} />
            <Text style={styles.menuText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  menu: {
    position: 'absolute',
    top: 35,
    right: 1,
    paddingLeft: 20,
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
    width: 150,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
    color: '#8B322C',
  },
});

export default BurgerMenu;
