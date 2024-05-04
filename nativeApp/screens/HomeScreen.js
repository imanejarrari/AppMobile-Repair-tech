import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity ,ScrollView ,Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BurgerMenu from './HeaderMenu';
import { query, collection, getDocs,orderBy,limit } from "firebase/firestore";
import { db } from '../firebase/firebase';

const HomeScreen = ({ navigation, route }) => {
  const [currentUserName, setCurrentUserName] = useState('No Name');
  const [latestRepair, setLatestRepair] = useState([]);

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
            <BurgerMenu navigation={navigation}/>
          </View>
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
      width: 320,
      height: 150,
      marginHorizontal: 10, 
      borderWidth:0,
      backgroundColor: 'white ',
      borderRadius:30,
      padding:20,
      marginLeft:20,
      marginTop:20,
      borderWidth:1,
      borderColor:'#8B322C',
      shadowColor: '#8B322C',
      shadowOpacity:1,
      
    },
  }); 
  
  export default HomeScreen;