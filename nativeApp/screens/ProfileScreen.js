import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons'; // Import Material Icons or any other icon library

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
          <LinearGradient colors={['#8B322C', '#FF9999']} style={Styles.header}>
            {userData.profilePicture ? (
              <Image
                source={{ uri: userData.profilePicture }}
                style={{ width: 120, height: 150, marginTop: 150 }}
              />
            ) : (
              <Image
                source={require('../picture.png')}
                style={{ width: 140, height: 140, marginTop: 310, marginLeft: 120 }}
              />
            )}
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
              <Text style={Styles.userInfoText}>00000000000</Text>
            </View>
            <View style={Styles.userInfo}>
              <MaterialIcons name="security" size={24} color="#FF9999" />
              <Text style={Styles.userInfoText}>121212121212</Text>
            </View>
            <TouchableOpacity onPress={handleEditProfile} style={Styles.editProfileButton}>
              <Text style={{ color:'white',paddingLeft: 65, paddingTop: 8 }}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
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
    
  }
});
