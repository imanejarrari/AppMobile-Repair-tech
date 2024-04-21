import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
        return { color: 'black' , borderWidth:1,borderColor:"green",backgroundColor:"green",width:100,paddingLeft:25,borderRadius:30,marginTop:15,marginLeft:25 }
      case 'pending':
        return { color: 'black' , borderWidth:1,borderColor:"yellow",backgroundColor:"yellow",width:100,paddingLeft:25,borderRadius:30,marginTop:15,marginLeft:25 };
      case 'in progress':
        return { color: 'black' , borderWidth:1,borderColor:"orange",backgroundColor:"orange",width:100,paddingLeft:25,borderRadius:30,marginTop:15,marginLeft:25 }
      default:
        return {}; 
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.head}>Repair & Recovery </Text>
      </View>
      <View style={styles.contentContainer}>
         <ScrollView >
          <View style={styles.RepairAnn}>
            <Text style={{fontWeight:'bold',fontSize:15 ,color:'grey'}}>Tech Repair</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                 <Text style={{ fontSize:11, letterSpacing:0.1 }}>Your Partner For Your Acquisitions Of Computer {'\n'} Equipment, Office Automation, Accessories, {'\n'} Consumables And Stationery.  </Text>
                    <Ionicons name="construct-outline" size={60} color="black" style={{ marginLeft: 10 }} />
           </View>
            
            
           <TouchableOpacity style={styles.button} onPress={goToRepairForm}>
                <Text style={{fontSize:17,color:'white',fontWeight:'bold',marginTop:5}}>Go to Repair {'>>'}</Text>
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
             <View key={technician.id} style={styles.request}>
               <Text>Name: {technician.Name}</Text>
               <Text>Specialization: {technician.Specialization}</Text>
               <Text>Availability: {technician.Availability}</Text>
               <Text>Rating: {technician.Rating}</Text>
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
    fontSize: 14,
    fontWeight: 'bold',
    color:'grey'
  },
  repair1: {
    fontSize: 10,
    fontWeight: 'bold',
    color:'grey'
  },

  cardContainer: {
    flexDirection: 'row',
    paddingRight: 20, // Add padding to the right side of the card container
  },
  request: {
    width: 200,
    height: 150,
    marginHorizontal: 10, // Add horizontal margin to create space between cards
    borderWidth:0,
    backgroundColor: 'white ',
    elevation: 2,
    shadowColor:'#5BBCFF',
    shadowOpacity: 1,
    shadowRadius: 1,
    borderRadius:1,
    padding:20
  },
  technicianContainer: {
    
    marginTop: 20,
  },
  technicianTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 20,
    color:'grey'
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
      width: 0,   // No horizontal shadow offset
      height: 2,  // Vertical shadow offset to apply shadow at the top and bottom
    },
    padding:20
  
  },
  button:{
    borderWidth:1,
    width:130,
    height:35,
    paddingLeft:5,
    borderRadius:10,
    borderColor:'#8B322C',
    backgroundColor:'#8B322C',



  },
  
});
