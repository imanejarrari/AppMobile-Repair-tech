import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { db } from '../firebase/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 
import { auth } from '../firebase/firebase'; 

const SettingsScreen = ({ navigation }) => {
  const [currentUserName, setCurrentUserName] = useState('No Name');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setCurrentUserName(doc.data().firstName);
          });
        } else {
          setCurrentUserName('No Name');
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        setCurrentUserName('No Name');
      }
    };

    fetchCurrentUser();
  }, []);

  // Function to handle log out
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      // Clear any additional data or tokens if needed
      navigation.reset({ 
        index: 0,
        routes: [{ name: 'login' }] // Navigate to the login screen
      });
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle any errors if sign out fails
    }
  };

  // Function to handle reporting
  const handleReport = () => {
    navigation.navigate('ReportScreen');
  };

  // Function to handle deleting the account
  const handleDeleteAccount = () => {
    navigation.navigate('DeleteAccountScreen');
  };

  // Function to navigate to the profile screen
  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  return (
    <LinearGradient
      colors={['#8B322C', '#FFFFFF']}
      style={styles.container}
    >
      <View style={{ backgroundColor: 'white', marginTop: 100, borderTopLeftRadius: 50, borderTopRightRadius: 50, height: 650 }}>
        <TouchableOpacity onPress={navigateToProfile}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                source={require('../picture.png')}
                style={styles.avatar}
              />
              <Text style={{ fontSize: 17, fontWeight: 'bold', letterSpacing: 1.5 }}>{currentUserName}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Buttons for log out, report, and delete account with icons and arrows */}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#8B322C" style={styles.icon} />
          <Text style={styles.buttonText}>Log Out</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#8B322C" style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReport}>
          <Ionicons name="alert-circle-outline" size={24} color="#8B322C" style={styles.icon} />
          <Text style={styles.buttonText}>Report</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#8B322C" style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
          <Ionicons name="trash-outline" size={24} color="#8B322C" style={styles.icon} />
          <Text style={styles.buttonText}>Delete Account</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#8B322C" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 200,

  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    borderBottomWidth: 1,
    width: 300,
    borderColor: '#8B322C'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15
  },
  icon: {
    marginRight: 10,
    marginLeft: 50,
    marginBottom: 15
  },  
  arrowIcon: {
    marginLeft: 'auto',
  },
});
