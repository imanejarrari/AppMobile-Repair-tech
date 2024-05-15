import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const NotificationScreen = ({ onLogOut }) => {
  const [repairRequests, setRepairRequests] = useState([]);
  const [meetingRequests, setMeetingRequests] = useState([]);
  const [countValue, setCountValue] = useState(0);

  const fetchRequests = async () => {
    try {
      // Fetch repair requests
      const repairRequestsSnapshot = await getDocs(collection(db, 'RepairRequest'));
      const repairData = repairRequestsSnapshot.docs.map(doc => doc.data());
      const filteredRepairRequests = repairData.filter(request => request.status === 'pending');
      setRepairRequests(filteredRepairRequests);

      // Fetch meeting requests
      const meetingRequestsSnapshot = await getDocs(collection(db, 'MeetingRequests'));
      const meetingData = meetingRequestsSnapshot.docs.map(doc => doc.data());
      const filteredMeetingRequests = meetingData.filter(request => request.status === 'canceled');
      setMeetingRequests(filteredMeetingRequests);

      // Calculate total notification count
      const totalNotificationCount = filteredRepairRequests.length + filteredMeetingRequests.length;
      setCountValue(totalNotificationCount);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  

  const handleShowNotifications = () => {
    // Implement showing notifications here
    Alert.alert('Notifications', 'Implement showing notifications');
  };

  return (
    <View style={{ width: 200, backgroundColor: '#cfcfcf', borderRadius: 20, cursor: 'pointer' }}>
      <ScrollView>
        <TouchableOpacity onPress={handleShowNotifications}>
          <View style={{width:30, height:100, borderColor:'black'}}></View>
        </TouchableOpacity>
       
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;
