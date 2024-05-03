import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { db } from '../firebase/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {
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

  return (
    <LinearGradient
      colors={['#8B322C', '#FFFFFF']}
      style={styles.container}
    >
      <View style={styles.profileContainer}>
        <View style={styles.header}>
          <Image
            source={require('../picture.png')}
            style={styles.avatar}
          />
          <Text style={styles.username}>{currentUser ? currentUser.firstName : 'No Name'}</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfo}>Email: {currentUser ? currentUser.email : 'No Email'}</Text>
          {/* Add more user information as needed */}
        </View>
      </View>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    alignItems: 'flex-start',
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
});
