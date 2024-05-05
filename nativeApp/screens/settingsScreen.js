import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/firebase'; // Import your firebase authentication and Firestore modules

const settingsScreen = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Get current user's profile data from authentication
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in.
        const { displayName, email, uid } = user;
        
        // Fetch additional user data from Firestore
        try {
          const userDoc = await db.collection('users').doc(uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserProfile({ displayName, email, ...userData });
          } else {
            console.error('No such document!');
          }
        } catch (error) {
          console.error('Error getting user data:', error);
        }
      } else {
        // No user is signed in.
        setUserProfile(null);
      }
    });

    // Unsubscribe to avoid memory leaks
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {userProfile ? (
        <>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.info}>{userProfile.firstName}</Text>

          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.info}>{userProfile.lastName}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{userProfile.email}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default settingsScreen;
