import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const RepairScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.head}>Easier to repair{'\n'}let's get started!</Text>
      </View>
      <View style={styles.contentContainer}>
      <View style={styles.repairContainer}>
        <Text style={styles.repair}>Latest repair</Text>
        <Text style={styles.repair1}>See All</Text>
     </View>

        <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
         
          <View style={styles.cardContainer}>
            <View style={styles.request}>
              <Text>Device : iphone 11</Text>
              <Text>RepairType: Screen replacement </Text>
              <Text>Stauts : pending</Text>
            </View>
            <View style={styles.request}></View>
            <View style={styles.request}></View>
            {/* Add more cards as needed */}
          </View>
          
        </ScrollView>
        <View style={styles.technicianContainer}>
          <Text style={styles.technicianTitle}>Technicians</Text>
          <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
            <View style={styles.cardContainer}>
           
            </View>
          </ScrollView>
        </View>
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
    backgroundColor: 'rgba(139, 50, 44, 1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 170,
  },
  head: {
    color: 'white',
    fontSize: 15,
    letterSpacing: 1.5,
    lineHeight: 24,
    marginTop: 60,
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
    color:'black'
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
    width: 250,
    height: 100,
    marginHorizontal: 10, // Add horizontal margin to create space between cards
    borderWidth:0.10,
    backgroundColor: 'white ',
    elevation: 2,
    shadowColor:'grey',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,   // No horizontal shadow offset
      height: 2,  // Vertical shadow offset to apply shadow at the top and bottom
    },
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
  },
});
