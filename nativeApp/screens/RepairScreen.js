import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView ,Image} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { query, collection, getDocs,orderBy,limit } from "firebase/firestore";
import { db } from '../firebase/firebase';
import 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
const RepairScreen = ({ navigation }) => { 
  const [technicians, setTechnicians] = useState([]);
  const [latestRepair, setLatestRepair] = useState([]);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const q = query(collection(db, "Technicians"));
        const querySnapshot = await getDocs(q);
        const technicianData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTechnicians(technicianData);
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
    };

    fetchTechnicians();

    const fetchLatestRepair = async () => {
      try {
        const q = query(collection(db, "RepairRequest"));
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
  }, []);

  // Function to handle navigation when "Go to Repair" button is pressed
  const goToRepairForm = () => {
    navigation.navigate('RepairForm');
  };
  //status colors
  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return { color: 'black' , borderWidth:1,borderColor:"green",backgroundColor:"green",width:100,paddingLeft:15,borderRadius:30,marginTop:15,marginLeft:25 }
      case 'pending':
        return { color: 'black' , borderWidth:1,borderColor:"yellow",backgroundColor:"yellow",width:100,paddingLeft:25,borderRadius:30,marginTop:15,marginLeft:25 };
      case 'in progress':
        return { color: 'black' , borderWidth:1,borderColor:"orange",backgroundColor:"orange",width:100,paddingLeft:16,borderRadius:30,marginTop:15,marginLeft:25 }
      default:
        return {}; 
    }
  };
   // Function to handle send msg
   const handleSendMessage = (technicianId) => {
   
    navigation.navigate('ChatScreen', { technicianId });
  };
  

  // Function to handle Schedule Meeting
  const handleScheduleMeeting = (technicianId) => {
    navigation.navigate('MeetingFormScreen', { technicianId });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.head}>Repair & Recovery </Text>
      </View>
      <View style={styles.contentContainer}>
         <ScrollView >
          <View style={styles.RepairAnn}>
            <Text style={{fontWeight:'bold',fontSize:25 ,color:'#8B322C' ,paddingLeft:30 , borderBottomWidth:1 , width:220 ,marginLeft:5 ,borderColor:'#8B322C'}}>Tech Repair</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' ,width:250 ,paddingLeft:5}}>
                 <Text style={{ fontSize:13, letterSpacing:0.1 }}>Your Partner For Your Acquisitions Of Computer Equipment, Office Automation, Accessories, Consumables And Stationery.  </Text>
                    <Ionicons name="construct-outline" size={70} color="grey" style={{ marginLeft: 2 }} />
           </View>
            
            
           <TouchableOpacity style={styles.button} onPress={goToRepairForm}>
                <Text style={{fontSize:15,color:'black',fontWeight:'bold',marginTop:5}}>Go to Repair {'>>>'}</Text>
              </TouchableOpacity>

          </View>

    
     
    

       <View style={styles.technicianContainer}>
         <Text style={styles.technicianTitle}>Technicians</Text>
         <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
         <View style={styles.cardContainer}>
           {technicians.map(technician => (
             <View key={technician.id} style={styles.requestTech}>
                <Image 
                   source={require('../picture.png')}
                    style={styles.avatar}
                 />
               <Text style={{fontWeight:'bold',marginLeft:25,marginTop:5,fontSize:15}}>{technician.Name}</Text>
               <Text style={{marginLeft:20,marginTop:3 ,fontSize:13}}>{technician.Specialization}</Text>
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <TouchableOpacity onPress={() => handleSendMessage(technician.id)}>
                  <Ionicons name="chatbox-outline" size={24} color="green" style={{ marginLeft: 30 ,marginTop:10}} />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleScheduleMeeting(technician.id)}>
                  <Ionicons name="calendar-outline" size={22} color="green" style={{marginLeft: 20,marginTop:10}} />
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
  head: {
    color: 'white',
    fontSize: 22,
    letterSpacing: 1.5,
    lineHeight: 24,
    marginTop: 40,
    fontWeight:'bold',
  },
  
  scrollContainer: {
    alignItems: 'flex-end',
  },




  technicianContainer: {    
    marginTop: 20,
  },
  technicianTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 20,
    color:'#8B322C'
  },
  RepairAnn:{
    marginLeft:5,
    marginTop:20,
    width: 350,
    height: 200,
    borderWidth:0.10,
    backgroundColor: 'white ',
    elevation: 6,
    shadowColor:'#5BBCFF',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,   
      height: 2, 
    },
    padding:20
  
  },
  button:{
    borderWidth:1,
    width:120,
    height:35,
    paddingLeft:5,
    borderRadius:15,
    borderColor:'#5BBCFF',
    backgroundColor:'#5BBCFF',
    marginTop:15,
    marginLeft:50
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginLeft:44,
  },
  
});
