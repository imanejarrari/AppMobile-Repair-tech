import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // If login is successful, navigate to HomeScreen
      navigation.navigate('HomeScreen', { email: userCredential.user.email });
    } catch (error) {
      // Update the error message state
      setErrorMessage(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Welcome Back! </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A8A8A8"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          placeholderTextColor="#A8A8A8"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={18} color="#A8A8A8" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <View>
        <Text style={{ color: 'black', fontSize: 15, marginTop: 15 }}>
          Don't have an account?{' '}
          <Text
            onPress={() => navigation.navigate('signUp')}
            style={{ color: '#8B322C', fontSize: 18, marginTop: 40 }}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    right: 5,
    color: 'black',
    bottom: 90,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    padding: 10,
    borderRadius: 13,
    color: '#000',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#8B322C',
    borderRadius: 13,
    padding: 10,
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 30,
    paddingLeft: 90,
    paddingRight: 90,
    width: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    borderRadius: 13,
    backgroundColor: 'white',
    paddingLeft: 10,
  },
  passwordInput: {
    flex: 1,
    color: 'black',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default Login;
