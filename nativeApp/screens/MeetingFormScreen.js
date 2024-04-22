import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import DateTimePicker from '@react-native-community/datetimepicker';

const MeetingFormScreen = ({ route }) => {
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingLocation, setMeetingLocation] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { technicianId } = route.params;

  const sendMeetingRequest = async () => {
    try {
      await addDoc(collection(db, 'MeetingRequests'), {
        technicianId,
        meetingDate: meetingDate.toISOString().split('T')[0], // Convert date to ISO string format
        meetingTime,
        meetingLocation,
        status: 'Available',
      });
      // Optionally, you can navigate back to the previous screen or perform any other action upon successful submission
    } catch (error) {
      console.error('Error sending meeting request:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text>{meetingDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={meetingDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === 'ios'); // Hide the date picker on iOS
            if (selectedDate) {
              setMeetingDate(selectedDate);
            }
          }}
        />
      )}
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
npm