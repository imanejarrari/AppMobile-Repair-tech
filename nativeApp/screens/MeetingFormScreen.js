import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const MeetingFormScreen = ({ route }) => {
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingLocation, setMeetingLocation] = useState('');

  const { technicianId } = route.params;

  const sendMeetingRequest = async () => {
    try {
      await addDoc(collection(db, 'MeetingRequests'), {
        technicianId,
        meetingDate,
        meetingTime,
        meetingLocation,
        status: 'pending', // You can set initial status as 'pending'
      });
      // Optionally, you can navigate back to the previous screen or perform any other action upon successful submission
    } catch (error) {
      console.error('Error sending meeting request:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        value={meetingDate}
        onChangeText={setMeetingDate}
        placeholder="Enter meeting date"
      />
      <Text style={styles.label}>Time:</Text>
      <TextInput
        style={styles.input}
        value={meetingTime}
        onChangeText={setMeetingTime}
        placeholder="Enter meeting time"
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={meetingLocation}
        onChangeText={setMeetingLocation}
        placeholder="Enter meeting location"
      />
      <TouchableOpacity style={styles.button} onPress={sendMeetingRequest}>
        <Text style={styles.buttonText}>Send Meeting Request</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MeetingFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
