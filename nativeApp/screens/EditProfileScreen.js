import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db, storage } from '../firebase/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

const EditProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const navigation = useNavigation();

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      console.log('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) {
      console.log('Image selection cancelled');
      return;
    }

    setProfilePicture(pickerResult.uri);
  };

  const handleSubmit = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Update user information in Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
          firstName,
          lastName
          // Add other fields as needed
        });

        // Update profile picture in Firebase Storage if a new picture is selected
        if (profilePicture) {
          const imageName = `${uuidv4()}.jpg`;
          const storageRef = storage.ref();
          const imageRef = storageRef.child(`images/${auth.currentUser.uid}/${imageName}`);
          await imageRef.putFile(profilePicture);
          const imageUrl = await imageRef.getDownloadURL();

          // Update profile picture URL in Firestore
          await updateDoc(userRef, {
            profilePicture: imageUrl
          });
        }

        // Navigate back to the profile screen after updating
        navigation.goBack();
      } else {
        console.log('No user is currently authenticated');
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Edit Profile</Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
        style={{ borderBottomWidth: 1, marginBottom: 10, width: 200 }}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
        style={{ borderBottomWidth: 1, marginBottom: 10, width: 200 }}
      />
      <Button title="Change Profile Picture" onPress={handleImageUpload} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default EditProfileScreen;
