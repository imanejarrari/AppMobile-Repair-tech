import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { db, auth } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
  const [currentUserName, setCurrentUserName] = useState('No Name');
  const [profilePicture, setProfilePicture] = useState(null);
  const defaultProfilePicture = require('../picture.png'); // Import the default profile picture

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userEmail = user.email;
        try {
          const docRef = doc(db, 'users', userEmail);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setCurrentUserName(userData.firstName);
            setProfilePicture(userData.profilePicture || defaultProfilePicture); // Use default picture if no picture is set
          } else {
            console.error('User document does not exist.');
          }
        } catch (error) {
          console.error('Error fetching current user:', error);
        }
      } else {
        setCurrentUserName('No Name'); // Reset user name
        setProfilePicture(defaultProfilePicture); // Set default profile picture when user is not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to handle log out
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('login');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Could not log out. Please try again later.');
    }
  };

  // Function to handle picking a new profile picture
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      // Update the profile picture state with the URI of the selected image
      setProfilePicture(result.uri);

      // Save the new profile picture URI to Firestore
      try {
        const user = auth.currentUser;
        if (user) {
          const userEmail = user.email;
          const docRef = doc(db, 'users', userEmail);
          await updateDoc(docRef, { profilePicture: result.uri });
        } else {
          console.error('User not logged in.');
        }
      } catch (error) {
        console.error('Error updating profile picture:', error);
      }
    }
  };

  return (
    <LinearGradient
      colors={['#8B322C', '#FFFFFF']}
      style={styles.container}
    >
      <View style={{ backgroundColor: 'white', marginTop: 150, borderTopLeftRadius: 50, borderTopRightRadius: 50, height: 550 }}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={profilePicture || defaultProfilePicture} // Use default picture if no picture is set
                style={styles.avatar}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 17, fontWeight: 'bold', letterSpacing: 1.5 }}>{currentUserName}</Text>
          </View>
        </View>

        {/* Buttons for log out and edit profile */}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#8B322C" style={styles.icon} />
          <Text style={styles.buttonText}>Log Out</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#8B322C" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ProfileScreen;

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
