import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { db } from '../firebase/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 
import { auth } from '../firebase/firebase'; 

const SettingsScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setCurrentUser(doc.data());
          });
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.reset({ 
        index: 0,
        routes: [{ name: 'login' }]
      });
    } catch (error) {
      console.error('Error logging out:', error);
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

  const handleUsernamePress = () => {
    // Navigate to the screen where user information will be displayed
    navigation.navigate('ProfileScreen');
  };

  return (
    <LinearGradient
      colors={['#8B322C', '#FFFFFF']}
      style={styles.container}
    >
      <View style={{ backgroundColor: 'white', marginTop: 100, borderTopLeftRadius: 50, borderTopRightRadius: 50, height: 650 }}>
        <TouchableOpacity onPress={handleUsernamePress}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                source={require('../picture.png')}
                style={styles.avatar}
              />
              <Text style={{ fontSize: 17, fontWeight: 'bold', letterSpacing: 1.5 }}>{currentUser ? currentUser.firstName : 'No Name'}</Text>
            </View>
          </View>
        </TouchableOpacity>
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
    marginRight: 10,
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
