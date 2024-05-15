import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, TextInput,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { query, collection, getDocs, orderBy, where } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { Picker } from '@react-native-picker/picker';
import { signOut, getAuth } from 'firebase/auth'; 
import NotificationScreen from './NotificationScreen';

const HomeScreen = ({ navigation, route }) => {
  const [currentUserName, setCurrentUserName] = useState('No Name');
  const [latestRepair, setLatestRepair] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [notificationCount, setNotificationCount] = useState(0); 
  const auth = getAuth(); 
  const [showBoxList, setShowBoxList] = useState(false); 

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
       
      } catch (error) {
        console.error('Error fetching current user:', error);
        setCurrentUserName('No Name');
      }
    };

    fetchCurrentUser();

    const fetchLatestRepair = async () => {
      try {
        let q = collection(db, "RepairRequest");

        // Apply search filter
        if (searchQuery) {
          q = query(q, orderBy('device'), where('device', '==', searchQuery));
        }

        // Apply status filter
        if (filterStatus) {
          q = query(q, orderBy('status'), where('status', '==', filterStatus));
        }

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestRepairData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setLatestRepair(latestRepairData);
          
          // Calculate notification count
          const repairRequestsSnapshot = await getDocs(collection(db, 'RepairRequest'));
          const repairData = repairRequestsSnapshot.docs.map(doc => doc.data());
          const filteredRepairRequests = repairData.filter(request => request.status === 'completed');

          const meetingRequestsSnapshot = await getDocs(collection(db, 'MeetingRequests'));
          const meetingData = meetingRequestsSnapshot.docs.map(doc => doc.data());
          const filteredMeetingRequests = meetingData.filter(request => request.status === 'accepted');
          
          const totalNotificationCount = filteredRepairRequests.length + filteredMeetingRequests.length;
          setNotificationCount(totalNotificationCount);
        } else {
          setLatestRepair(null);
          setNotificationCount(0);
        }
      } catch (error) {
        console.error('Error fetching latest repair request:', error);
      }
    };

    fetchLatestRepair();
  }, [searchQuery, filterStatus]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);  
      navigation.navigate('login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return { color: 'white', borderWidth: 1, borderColor: "greenyellow", backgroundColor: "green", width: 100, paddingLeft: 15, borderRadius: 30, marginTop: 20, marginLeft: 90 };
      case 'pending':
        return { color: 'white', borderWidth: 1, borderColor: "#FF9999", backgroundColor: "#FF9999", width: 100, paddingLeft: 25, borderRadius: 30, marginTop: 20, marginLeft: 90 };
      case 'in progress':
        return { color: 'white', borderWidth: 1, borderColor: "#FFFFCC", backgroundColor: "#007AFF", width: 100, paddingLeft: 16, borderRadius: 30, marginTop: 20, marginLeft: 90 };
      default:
        return {};
    }
  };

  const statusIcons = {
    completed: { name: 'checkmark-done-outline', color: 'green' },
    pending: { name: 'alert-circle-outline', color: '#FF9999' },
    'in progress': { name: 'hourglass-outline', color: '#007AFF' },
  };

 // const toggleBoxList = () => {
   // setShowBoxList(!showBoxList);
  //};
  const handleShowNotifications = async () => {
    try {
      // Fetch repair requests
      const repairRequestsSnapshot = await getDocs(collection(db, 'RepairRequest'));
      const repairData = repairRequestsSnapshot.docs.map(doc => doc.data());
      const filteredRepairRequests = repairData.filter(request => request.status === 'completed');
  
      // Fetch meeting requests
      const meetingRequestsSnapshot = await getDocs(collection(db, 'MeetingRequests'));
      const meetingData = meetingRequestsSnapshot.docs.map(doc => doc.data());
      const filteredMeetingRequests = meetingData.filter(request => request.status === 'accepted');
  
      // Display notifications
      let notifications = '';
      filteredRepairRequests.forEach(request => {
        notifications += `Your repair request for ${request.device} is completed.\n`;
      });
  
      filteredMeetingRequests.forEach(request => {
        const dateTime = `${request.date} ${request.time}`; // Assuming date and time fields are available in meeting request data
        notifications += `You have a meeting at ${dateTime}.\n`;
      });
  
      // Show notifications
      if (notifications !== '') {
        Alert.alert('Notifications', notifications);
      } else {
        Alert.alert('Notifications', 'No new notifications.');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleShowNotifications}>
          <View style={styles.headerLeft}>
            <Ionicons
            style={{cursor: 'pointer' }}
              name={'notifications-outline'}
              size={30}
              color={'white'}
            />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>{notificationCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.headerRight}>
        <TouchableOpacity onPress={handleLogout}>
            <Ionicons
              name={'log-out-outline'} 
              size={30}
              color={'white'}
            />
        </TouchableOpacity>
      
        </View>
      </View>
     {/*{showBoxList && <NotificationScreen onLogOut={handleLogout} />}*/} 

      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by device name"
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <Picker
          selectedValue={filterStatus}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setFilterStatus(itemValue)
          }>
          <Picker.Item label="All" value=""  />
          <Picker.Item label="Completed" value="completed" />
          <Picker.Item label="Pending" value="pending" />
          <Picker.Item label="In Progress" value="in progress" />
        </Picker>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          {latestRepair && latestRepair.map(repairs => (
            <View key={repairs.id} style={styles.request}>
              <Ionicons name={statusIcons[repairs.status].name} size={40} marginLeft={120} color={statusIcons[repairs.status].color} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginLeft: 55, marginTop: 1, letterSpacing: 1 }}>{repairs.device}</Text>
              </View>
              <Text style={{ marginTop: 10, fontSize: 13, fontWeight: 300, marginLeft: 10 }}>
                {repairs.description}
              </Text>
              <Text style={[styles.status, getStatusStyle(repairs.status)]}>{repairs.status}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    height: 100,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  request: {
    marginLeft: 15,
    marginTop: 20,
    width: 330,
    height: 180,
    backgroundColor: 'white ',
    elevation: 5,
    shadowColor: '#5BBCFF',
    borderColor: '#5BBCFF',
    shadowOpacity: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    padding: 20
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  searchInput: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
    height:'70%'
  },
  picker: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  notificationBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    position:'absolute',
    left:20,
    top:-2
  
  },
  notificationCount: {
    color: 'white',
    fontSize: 10,
    
  },
});

export default HomeScreen;
