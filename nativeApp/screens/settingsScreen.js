import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { db } from '../firebase/firebase';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 
import { auth } from '../firebase/firebase'; 
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

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

  const handleReport = () => {
    navigation.navigate('ReportScreen');
  };

  const handleDeleteAccount = () => {
    navigation.navigate('DeleteAccountScreen');
  };

  const handleUsernamePress = () => {
    navigation.navigate('ProfileScreen');
  };

  const handleChooseImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
      return;
    }

    const imagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!imagePickerResult.cancelled) {
      // Upload the selected image to Firebase Storage
      const response = await fetch(imagePickerResult.uri);
      const blob = await response.blob();
      const storageRef = ref(db.storage, `profilePictures/${currentUser.uid}`);
      await uploadString(storageRef, blob, 'data_url');

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      // Update the user's profile picture in Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        profilePicture: downloadURL,
      });

      // Update currentUser state with the new profile picture URL
      setCurrentUser({ ...currentUser, profilePicture: downloadURL });
    }
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
              <TouchableOpacity onPress={handleChooseImage}>
                <Image
                  source={currentUser ? { uri: currentUser.profilePicture } : require('../picture.png')}
                  style={styles.avatar}
                />
              </TouchableOpacity>
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
