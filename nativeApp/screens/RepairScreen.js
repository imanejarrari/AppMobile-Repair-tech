import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'; 
import { query, collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';


const RepairScreen = ({ navigation }) => { 
  const [technicians, setTechnicians] = useState([]);
  const [filter, setFilter] = useState("All"); // State to store filter value

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const q = query(collection(db, "technicians"));
        const querySnapshot = await getDocs(q);
        const technicianData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Filter technicians based on availability if filter is set
        let filteredTechnicians = technicianData;
        if (filter === "Available") {
          filteredTechnicians = technicianData.filter(technician => technician.Availability === true);
        } else if (filter === "Not Available") {
          filteredTechnicians = technicianData.filter(technician => technician.Availability === false);
        }

        setTechnicians(filteredTechnicians);
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
    };

    fetchTechnicians();
  }, [filter]); // Run useEffect when filter changes



  const handleScheduleMeeting = (technicianId) => {
    navigation.navigate('MeetingFormScreen', { technicianId });
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);  
      navigation.navigate('login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.head}>Repair & Recovery </Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView>
          <View style={styles.RepairAnn}>
            <Text style={styles.repairTitle}>Tech Repair</Text>
            <View style={styles.repairDescription}>
              <Text style={styles.repairText}>Your Partner For Your Acquisitions Of Computer Equipment, Office Automation, Accessories, Consumables And Stationery.</Text>
              <Image source={require('../repair.png')} style={styles.img}/>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RepairForm')}>
              <Text style={styles.buttonText}>Go to Repair {'>>>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.technicianContainer}>
            <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
              <View style={styles.tableContainer}>
                <View style={styles.titleContainer}>
                  <Image 
                    source={require('../technician.png')}
                    style={styles.avatar1}
                  />
                  <Text style={styles.technicianTitle}>
                    Technicians
                  </Text>
                  {/* Add Picker component */}
                  <Picker
                    selectedValue={filter}
                    style={{ height: 50, width: 100,position:'absolute' ,left:230 , color:'#8B322C'}}
                    onValueChange={(itemValue, itemIndex) => setFilter(itemValue)}
                  >
                    <Picker.Item label="All" value="All" />
                    <Picker.Item label="Available" value="Available" />
                    <Picker.Item label="Not Available" value="Not Available" />
                  </Picker>
                  {/* End of Picker component */}
                </View>
                {technicians.map(technician => (
                  <View key={technician.id}                     
                  style={[
                    styles.tableRow,
                    technician.Availability ? null : styles.notAvailable 
                  ]}

                   
                  > 
                    <Image 
                      source={require('../picture.png')}
                      style={styles.avatar}
                    />
                    <Text style={styles.column}>{technician.Name}</Text>
                    <Text style={styles.column2}>{technician.Specialization}</Text>
                    <View style={styles.actions}>
                     
                      <TouchableOpacity onPress={() => handleScheduleMeeting(technician.id)}>
                        <Ionicons name="calendar-outline" size={20} color="#8B322C" style={{marginLeft:15}} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default RepairScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#8B322C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 100,
  },
  logoutButton:{
    left:305,
    top:-30
  },
  head: {
    color: 'white',
    fontSize: 22,
    letterSpacing: 1.5,
    lineHeight: 24,
    marginTop: 40,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  RepairAnn: {
    marginTop: 20,
    marginLeft: 10,
    width: 340,
    height: 180,
    borderWidth: 0.1,
    backgroundColor: 'white',
    elevation: 6,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    padding: 20,
    paddingLeft:10
  },
  repairTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#8B322C',
    paddingLeft: 30,
    borderBottomWidth: 1,
    width: 220,
    marginLeft: 5,
    borderColor: '#8B322C',
  },
  repairDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    paddingLeft: 5,
  },
  repairText: {
    fontSize: 13,
    letterSpacing: 0.1,
  },
  img: {
    width: 70,
    height: 70,
    marginRight: 5,
  },
  button: {
    borderWidth: 1,
    width: 150,
    height: 33,
    borderRadius: 15,
    borderColor: '#5BBCFF',
    backgroundColor: '#5BBCFF',
    marginTop: 5,
    marginLeft: 30,
    paddingLeft: 20,
    paddingBottom: 5,
  },
  notAvailable: {
    backgroundColor: '#FF9999', 
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
  },
  technicianContainer: {
    marginTop: 20,
  },
  technicianTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: '#8B322C',
    width:300,
    height:40,
    marginLeft:10,
    paddingLeft:50,
    letterSpacing:1,
    borderBottomWidth:6,
    borderColor:'#8B322C'
  },
  scrollContainer: {
    alignItems: 'flex-end',
  },
  tableContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    marginLeft:15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  columnHeader: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    padding: 5,
  },
  column: {
    flex: 1,
    padding: 7,
    paddingLeft:5,
    fontSize:13,
    
  },
  column2: {
    flex: 1,
    padding: 5,
    paddingLeft:10,
    color:'black',
    fontWeight:'bold',
    fontSize:14,
    letterSpacing:0.5,
   
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  avatar1: {
    width: 35,
    height: 35,
    borderRadius: 15,
    position:'absolute',
    bottom:10,
    left:20
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
