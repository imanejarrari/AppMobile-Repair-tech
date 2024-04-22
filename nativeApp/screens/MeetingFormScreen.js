import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import DateTimePicker from '@react-native-community/datetimepicker';

const MeetingFormScreen = ({ route }) => {
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [meetingTime, setMeetingTime] = useState('');
  const [fullName, setFullName] = useState('');
  const [reason, setReason] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const { technicianId } = route.params;

  const sendMeetingRequest = async () => {
    try {
      await addDoc(collection(db, 'MeetingRequests'), {
        technicianId,
        meetingDate: meetingDate.toISOString().split('T')[0], // Convert date to ISO string format
        meetingTime,
        fullName,
        reason,
        status: 'Available',
      });
      // Optionally, you can navigate back to the previous screen or perform any other action upon successful submission
    } catch (error) {
      console.error('Error sending meeting request:', error);
    }
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.cont}>

      <Text style={styles.label}>Full Name:</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />

        <Text style={styles.label}>Reason for the Meeting:</Text>
        <TextInput
          style={[styles.input, { height: 100 }]} // Increase height for a larger input area
          value={reason}
          onChangeText={setReason}
          placeholder="Enter the reason for the meeting"
          multiline
        />
        
        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
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
        <TouchableOpacity style={styles.timeInput} onPress={() => setShowTimePicker(true)}>
          <Text>{meetingTime || 'Select meeting time'}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={meetingDate}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(Platform.OS === 'ios'); // Hide the time picker on iOS
              if (selectedTime) {
                const hours = selectedTime.getHours();
                const minutes = selectedTime.getMinutes();
                setMeetingTime(`${hours}:${minutes}`);
              }
            }}
          />
        )}

      

        <TouchableOpacity style={styles.button} onPress={sendMeetingRequest}>
          <Text style={styles.buttonText}>Send Meeting Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MeetingFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  cont: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop:60
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    color:'#8B322C',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: 'grey', // Text color
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#ccc', // Text color
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color:'grey'
  },
  button: {
    backgroundColor: '#8B322C',
    padding: 15,
    borderRadius:50,
    alignItems: 'center',
    marginLeft:60,
    width:200
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
