import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db } from '../firebase/firebase';
import { collection, query, getDocs, where } from 'firebase/firestore';

const HomeScreen = ({ navigation, route }) => {
  const [currentUserName, setCurrentUserName] = useState('No Name');


  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setCurrentUserName(doc.data().firstName);
          });
        } else {
          setCurrentUserName('No Name');
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        setCurrentUserName('No Name');
      }
    };

    fetchCurrentUser();
  }, []); 

  // Function to handle navigation to the profile screen
  const goToProfileScreen = () => {
    navigation.navigate('settingsScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToProfileScreen}>
          <View style={styles.headerLeft}>
           <Ionicons 
            name={'notifications-outline'}
            size={30}
            color={'white'}
          />
          </View>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          
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
    backgroundColor: '#8B322C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 100,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default HomeScreen;
