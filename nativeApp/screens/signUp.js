import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { collection, addDoc,setDoc,getDoc,doc,updateDoc } from "firebase/firestore"; 
import {db,storage} from "../firebase/firebase"

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Email sent to ", email)
          });
          const docRef = addDoc(collection(db, "users"), {
            email:email,
            firstName:firstName,
            lastName:lastName,
            
          });
          console.log("Document written with ID: ", docRef.id);
        navigation.replace('login');
      })
      .catch(error => alert(error.message))
  }

  return (
   
    <View style={styles.container}
    >
      <View  style={styles.header} >
      <Image
        source={require('../bestTech.jpg')}
        style={styles.backgroundImage}
      />
      </View>
     
  
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        placeholderTextColor="#A8A8A8"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        placeholderTextColor="#A8A8A8"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="#A8A8A8"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="#A8A8A8"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp} >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <View>
        <Text style={{ color: '#000', fontSize: 15, marginTop: 15 }}>
          Already have an account?{' '}
          <Text onPress={() => navigation.navigate('login')} style={{ color: '#8B322C', fontSize: 17 }}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#ffff'
  },
 
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius:13,
    color: '#000',
  },
  button: {
    backgroundColor: '#5BBCFF',
    borderRadius:13,
    padding: 10,
    alignItems: 'center',
    borderRadius: 30,
    paddingLeft: 90,
    paddingRight: 90,
    width:300
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  header:{
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 180,
    width:400,
    marginBottom: 100,
    borderWidth:10,
    borderColor:"#5BBCFF"


  }

});

export default SignUp;
