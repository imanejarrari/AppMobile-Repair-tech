import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db, storage } from '../firebase/firebase'; // Import Firebase storage if using
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker from expo
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // State to store profile picture URI
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const q = query(collection(db, 'users'));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserData(userData);
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setEmail(userData.email);
            setPhoneNumber(userData.phoneNumber);
            setProfilePicture(userData.profilePicture); // Set profile picture
          } else {
            console.log('User document not found for uid:', currentUser.uid);
          }
        } else {
          console.log('No user is currently authenticated');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    setModalVisible(true);
  };

  const saveChanges = async () => {
    try {
      const userRef = doc(db, 'users', userData.uid);
      await updateDoc(userRef, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        // Update password here if necessary
      });
      setModalVisible(false);
      fetchUserData();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const selectProfilePicture = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled && result.assets.length > 0) {
        // If the user selected an image, update profile picture state
        setProfilePicture(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting profile picture:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {userData ? (
        <View>
          <LinearGradient colors={['#8B322C', '#FF9999']} style={Styles.header}>
            <TouchableOpacity onPress={selectProfilePicture}> 
              {profilePicture ? (
                <Image
                  source={{ uri: profilePicture }}
                  style={{width: 140, height: 140, marginTop: 310, marginLeft: 120, borderRadius: 70 }} // Add borderRadius to make it circular
                />
              ) : (
                <Image
                  source={require('../picture.png')}
                  style={{ width: 140, height: 140, marginTop: 310, marginLeft: 120, borderRadius: 70 }} // Add borderRadius to make it circular
                />
              )}
            </TouchableOpacity>
            <Text style={{ fontSize: 20, letterSpacing: 1, top: -200, left: 160, fontWeight: 'bold' }}>{userData.firstName}</Text>
          </LinearGradient>

          <View style={Styles.contt}>
            <View style={Styles.userInfo}>
              <MaterialIcons name="person" size={24} color="#FF9999" />
              <Text style={Styles.userInfoText}>{userData.firstName}</Text>
            </View>
            <View style={Styles.userInfo}>
              <MaterialIcons name="person" size={24} color="#FF9999" />
              <Text style={Styles.userInfoText}>{userData.lastName}</Text>
            </View>
            <View style={Styles.userInfo}>
              <MaterialIcons name="email" size={24} color="#FF9999" />
              <Text style={Styles.userInfoText}>{userData.email}</Text>
            </View>
            <View style={Styles.userInfo}>
              <MaterialIcons name="phone" size={24} color="#FF9999" />
              <Text style={Styles.userInfoText}>{userData.phoneNumber}</Text>
            </View>
            <TouchableOpacity onPress={handleEditProfile} style={Styles.editProfileButton}>
              <Text style={{ color:'white',paddingLeft: 65, paddingTop: 8 }}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={Styles.modalContainer}>
          <TextInput
            style={Styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
          />
          <TextInput
            style={Styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
          />
          <TextInput
            style={Styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
          <TextInput
            style={Styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone Number"
          />
          <TextInput
            style={Styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={saveChanges} style={Styles.saveButton}>
            <Text style={{ color:'white',paddingLeft: 65, paddingTop: 8 }}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const Styles = StyleSheet.create({
  header: {
    position: 'absolute',
    left: -20,
    right: 10,
    height: 400,
    top: -170,
    width: 400,
    borderRadius: 200
  },

  contt: {
    position: 'absolute',
    top: 290,
    left: 20,
    right: 20,
    height: 430,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    height: 60,
    borderColor: 'grey',
    letterSpacing: 1,
    paddingLeft: 40,
    paddingTop: 30
  },

  userInfoText: {
    marginLeft: 50
  },

  editProfileButton: {
    backgroundColor: '#FF9999',
    borderColor: '#FF9999',
    marginTop: 50,
    marginLeft: 60,
    borderWidth: 1,
    height: 40,
    borderRadius: 50,
    width: 200,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5
  },

  saveButton: {
    backgroundColor: '#FF9999',
    marginTop: 20,
    padding: 10,
    borderRadius: 5
  }
});
