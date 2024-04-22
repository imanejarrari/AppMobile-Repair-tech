import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase/firebase";
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';


const RepairForm = ({ navigation }) => {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [device, setDevice] = useState('');
  const [repairType, setRepairType] = useState('');
  const [description, setDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = async () => {
    if (clientName !== '' && email !== '' && address !== '' && device !== '' && repairType !== '' && description !== '') {
      try {
        await addDoc(collection(db, "RepairRequest"), {
          clientName,
          email,
          address,
          device,
          repairType,
          description,
          status: 'pending'
        });
        setIsModalVisible(true);
      } catch (error) {
        console.error("Error adding document: ", error);
        // Optionally, you can display an error message
      }
    } else {
      Alert.alert("Fill The Form please !");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Let's Repair</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="person-outline" size={24} color="grey" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Client Name"
            value={clientName}
            onChangeText={setClientName}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="mail-outline" size={24} color="grey" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="location-outline" size={24} color="grey" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="hardware-chip-outline" size={24} color="grey" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Device"
            value={device}
            onChangeText={setDevice}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="build-outline" size={24} color="grey" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Repair Type"
            value={repairType}
            onChangeText={setRepairType}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="document-text-outline" size={24} color="grey" style={styles.icon} />
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalMessage}>Your request has been submitted successfully!</Text>
          <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textHeader: {
    color: "white",
    marginTop: 60,
    marginLeft: 60,
    fontSize: 20,
    letterSpacing: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
    borderWidth: 0.1,
    marginLeft: 15,
    marginRight: 15,
    borderColor: 'white',
    borderRadius: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: 'white',
    width: 270
  },
  submitButton: {
    backgroundColor: '#8B322C',
    padding: 15,
    alignItems: 'center',
    width: 200, 
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 70,
    borderRadius:50
  },

  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: { 
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight:'500',
  },
  modalCloseButton: {
    backgroundColor: '#5BBCFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
  },
  icon: {
    marginRight: 10
  }

});


export default RepairForm;
