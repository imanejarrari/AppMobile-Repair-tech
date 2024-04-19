import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../firebase/firebase'; // Assuming you have db initialized for Firestore
import { collection, query, where, getDocs } from 'firebase/firestore';

const HomeScreen = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserName, setCurrentUserName] = useState('No Name');
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setCurrentUser(user);
          // Check if email is defined
          if (user.email) {
            const q = query(collection(db, "users"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            console.log("Query results:", querySnapshot.docs);
            querySnapshot.forEach((doc) => {
              setCurrentUserName(doc.data().firstName);
            });
          } else {
            setCurrentUserName('No Name');
          }
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        // Handle error: set current user to null and display default name
        setCurrentUser(null);
        setCurrentUserName('No Name');
      }
    };
    fetchCurrentUser();
  }, []);
  
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={require('../profile.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.head}>
            Glad to see you !{'\n'}
            {currentUserName}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons 
            name={'notifications-outline'}
            size={30}
            color={'white'}
          />
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
    backgroundColor: '#5BBCFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 150,
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
  head: {
    color: 'white',
    fontSize: 18,
  },
});

export default HomeScreen;
