import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BurgerMenu from './HeaderMenu';
import { query, collection, getDocs, orderBy, where } from "firebase/firestore";
import { db } from '../firebase/firebase';

const HomeScreen = ({ navigation, route }) => {
  const [currentUserName, setCurrentUserName] = useState('No Name');
  const [latestRepair, setLatestRepair] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Your fetch logic to get current user data
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
        } else {
          setLatestRepair(null);
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

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    setShowFilterModal(false); // Close the modal after selecting a status
  };

  // Status colors and icons
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <View style={styles.headerLeft}>
            <Ionicons
              name={'notifications-outline'}
              size={30}
              color={'white'}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <BurgerMenu navigation={navigation} />
        </View>
      </View>

      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by device name"
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilterModal(true)}>
          <Text style={styles.filterText}>Filter Status</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          {latestRepair && latestRepair.map(repairs => (
            <View key={repairs.id} style={styles.request}>
              <Ionicons name={statusIcons[repairs.status].name} size={40} marginLeft={120} color={statusIcons[repairs.status].color} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginLeft: 90, marginTop: 1, letterSpacing: 1 }}>{repairs.device}</Text>
              </View>
              <Text style={{ marginTop: 10, fontSize: 13, fontWeight: 300, marginLeft: 10 }}>
                {repairs.description}
              </Text>
              <Text style={[styles.status, getStatusStyle(repairs.status)]}>{repairs.status}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilterModal}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalItem} onPress={() => handleStatusFilter('completed')}>
              <Text style={styles.modalItemText}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => handleStatusFilter('pending')}>
              <Text style={styles.modalItemText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => handleStatusFilter('in progress')}>
              <Text style={styles.modalItemText}>In Progress</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginTop: 10,
    marginBottom: 10,
  },
  searchInput: {
    width: '60%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  filterButton: {
    backgroundColor: '#8B322C',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  filterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 18,
  },
});

export default HomeScreen;
