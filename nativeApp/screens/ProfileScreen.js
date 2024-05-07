import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert ,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
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
    navigation.navigate('EditProfileScreen'); 
  };

  return (
    <View style={{ flex: 1 }}>
      {userData ? (
        <View>
          <LinearGradient colors={['#8B322C', '#FFFF']} style={Styles.header}>
            {userData.profilePicture ? (
              <Image
                source={{ uri: userData.profilePicture }}
                style={{ width: 150, height: 150, marginTop: 20 }}
              />
            ) : (
              <Image
                source={require('../picture.png')}
                style={{ width: 150, height: 150, marginTop: 20 }}
              />
            )}
          </LinearGradient>
          <Text>Email: {userData.email}</Text>
          <Text>First Name: {userData.firstName}</Text>
          <Text>Last Name: {userData.lastName}</Text>
          <TouchableOpacity onPress={handleEditProfile} style={{ marginTop: 20 }}>
            <Text>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default ProfileScreen;

const Styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
