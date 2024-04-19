// FirstScreen.js
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

/*const FirstScreen = ({ navigation }) => {
  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };*/
  const firstScreen = ({ navigation }) => {
    const handleNavigateLogin = () => {
      navigation.navigate('login');
    };
  
    const handleNavigateRegister = () => {
      navigation.navigate('signUp');
    };

  return (
    <View style={styles.container}>
      <Image
        source={require('../bestTech.jpg')}
        style={styles.backgroundImage}
      />
      <Text style={styles.text}>Easier to repair {'\n'} <Text style={styles.f}>Let's get started !</Text></Text>
      <TouchableOpacity
        style={[styles.buttonContainer, { bottom: 120 }]}
        onPress={handleNavigateLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, { bottom: 60 }]}
        onPress={handleNavigateRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  image:{
    marginTop:15,
    width:200,
    height: 55,
    marginBottom:90,
 
   },
  text:{
    color:'black',
    paddingTop:120,
    fontSize:30,
    fontWeight:'bold',
    textAlign: 'center',
    
  },
  
  buttonContainer: {
    backgroundColor: '#DC0000',
    borderRadius: 13,
    position: 'absolute',
    width: 300,
    padding: 10,
    alignItems: 'center',
    zIndex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    /*fontWeight:700*/
  },
});

export default firstScreen;
