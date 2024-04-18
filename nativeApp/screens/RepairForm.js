import React from 'react';
import { View, Text ,StyleSheet } from 'react-native';

const RepairForm = (navigation) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
                  <Text style={styles.textHader}>Let's Repair </Text>
        </View>
        <View>
            
        </View>
      
    </View>
  );
}

export default RepairForm;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: '#5BBCFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      height: 180,
      width:350,
      marginLeft:150,
    borderBottomLeftRadius:150
    },
    textHader:{
        color:"white",
        marginTop:60,
        marginLeft:40,
        fontSize:20,
        letterSpacing:1
    }

})