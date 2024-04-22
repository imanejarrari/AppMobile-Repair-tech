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
   // Function to handle navigation when "Send Message" icon is pressed
   const handleSendMessage = (technicianId) => {
    // Navigate to ChatScreen and pass the technicianId as a parameter
    navigation.navigate('ChatScreen', { technicianId });
  };
  

  // Function to handle navigation when "Schedule Meeting" icon is pressed
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
            <Text style={{fontWeight:'bold',fontSize:15 ,color:'#8B322C'}}>Tech Repair</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                 <Text style={{ fontSize:11, letterSpacing:0.1 }}>Your Partner For Your Acquisitions Of Computer {'\n'} Equipment, Office Automation, Accessories, {'\n'} Consumables And Stationery.  </Text>
                    <Ionicons name="construct-outline" size={60} color="black" style={{ marginLeft: 10 }} />
           </View>
            
            
           <TouchableOpacity style={styles.button} onPress={goToRepairForm}>
                <Text style={{fontSize:16,color:'white',fontWeight:'bold',marginTop:5}}>Go to Repair {'>>'}</Text>
              </TouchableOpacity>

          </View>

      <View style={styles.repairContainer}>
        <Text style={styles.repair}>Latest repair</Text>
        <Text style={styles.repair1}>See All</Text>
     </View>
    

        <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
         
         <View style={styles.cardContainer}>
         {latestRepair && latestRepair.map(repairs => (
             <View key={repairs.id} style={styles.request}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             
              
                <Text style={{color:'black' , fontSize:16 , fontWeight:'bold',marginLeft:40}}>{repairs.device}</Text> 
               
              </View>
               
               <Text style={{marginTop:10,fontSize:12}}>
                 {repairs.description}
                 </Text>
                 <Text style={[styles.status, getStatusStyle(repairs.status)]}>{repairs.status}</Text>
              
             </View>
           ))}
           
           
         </View>
         
       </ScrollView>
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
  repairContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom:10
  },
  repair: {
    fontSize: 15,
    fontWeight: 'bold',
    color:'#8B322C'
  },
  repair1: {
    fontSize: 10,
    fontWeight: 'bold',
    color:'grey'
  },

  cardContainer: {
    flexDirection: 'row',
    paddingRight: 20, 
    
  },
  request: {
    width: 200,
    height: 150,
    marginHorizontal: 10, 
    borderWidth:0,
    backgroundColor: 'white ',
    elevation: 2,
    shadowColor:'#5BBCFF',
    shadowOpacity: 1,
    shadowRadius: 1,
    borderRadius:1,
    padding:20
  },
  requestTech:{
    width: 150,
    height: 150,
    marginHorizontal: 10, 
    borderWidth:0,
    elevation: 2,
    shadowColor:'#5BBCFF',
    shadowOpacity: 2,
    shadowRadius: 1,
    padding:10,
    backgroundColor:'whitesmoke',
    

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
    height: 150,
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
    borderRadius:10,
    borderColor:'#8B322C',
    backgroundColor:'#8B322C',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginLeft:44,
  },
  
});
