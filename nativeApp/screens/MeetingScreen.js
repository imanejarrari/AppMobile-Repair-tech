import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const MeetingScreen = () => {
  const [meetingRequests, setMeetingRequests] = useState([]);

  useEffect(() => {
    fetchMeetingRequests();
  }, []);

  const fetchMeetingRequests = async () => {
    try {
      const meetingRequestsRef = collection(db, 'MeetingRequests');
      const querySnapshot = await getDocs(meetingRequestsRef);
      const requests = [];
      querySnapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      setMeetingRequests(requests);
    } catch (error) {
      console.error('Error fetching meeting requests:', error);
    }
  };

  const renderMeetingItem = ({ item }) => (
    <View style={styles.meetingItem}>
      <Text style={styles.meetingText}>Client Name: {item.fullName}</Text>
      <Text style={styles.meetingText}>Date: {item.meetingDate}</Text>
      <Text style={styles.meetingText}>Time: {item.meetingTime}</Text>
      <Text style={styles.meetingText}>Reason: {item.reason}</Text>
      <Text style={styles.meetingText}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meeting Requests</Text>
      <FlatList
        data={meetingRequests}
        renderItem={renderMeetingItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  meetingItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  meetingText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MeetingScreen;
