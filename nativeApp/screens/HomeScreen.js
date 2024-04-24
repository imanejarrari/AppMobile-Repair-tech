import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db } from '../firebase/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {
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
            <Image 
              source={require('../picture.png')}
              style={styles.avatar}
            />
            <Text style={{ color: 'white', fontSize: 13, letterSpacing: 1 }}>
              Glad to see you !{'\n'}
              <Text style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: 1.5 }}>{currentUserName}</Text> 
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Ionicons 
            name={'notifications-outline'}
            size={30}
            color={'white'}
          />
        </View>
      </View>
      <View style={styles.sousHeader}>
       
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
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
    height: 170,
  },
  sousHeader:{
    position:'absolute',
    marginTop:120,
    width:300,
    marginLeft:30,
    borderWidth:1,
    height:90,
    borderColor:'white',
    backgroundColor:'white',
  
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
});

export default HomeScreen;
