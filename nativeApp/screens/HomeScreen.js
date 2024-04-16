import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const HomeScreen = () => {
  const [firstName, setUsername] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Fetch current user's data 
    const fetchUserData = async () => {
      const firebaseApp = firebase.app();
      if (!firebaseApp) {
        console.error("Firebase app is not initialized.");
        return;
      }
  
      const auth = firebase.auth(firebaseApp);
      if (!auth) {
        console.error("Firebase authentication is not initialized.");
        return;
      }
  
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("No user is currently authenticated.");
        return;
      }
  
      const uid = currentUser.uid;
      const db = firebase.firestore(firebaseApp);
      const userRef = db.collection('users').doc(uid);
  
      try {
        const doc = await userRef.get();
        if (doc.exists) {
      
          setUsername(doc.data().firstName);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error getting document:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  // Function to fetch notification count
  const fetchNotificationCount = () => {
    // Implement logic to fetch notification count
    // For example, you can query a collection in Firestore or get data from an API
    // Once you have the count, update the state variable setNotificationCount
    setNotificationCount(5); // Example notification count
  };

  useEffect(() => {
    fetchNotificationCount();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={require('../profile.jpg')}
            style={styles.avatar}
          />
          <Text>Glad to see you !{'\n'}{firstName}</Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons 
            name={'notifications-outline'}
            size={30}
            color={'white'}
          />
          <Text style={styles.notificationCount}>{notificationCount}</Text> 
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 50, 44, 1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height:150,
    borderBottomLeftRadius:40,
    borderBottomRightRadius:40,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  notificationCount: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 5,
    marginLeft: 5,
  },
});

export default HomeScreen;
