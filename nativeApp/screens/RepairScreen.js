import React from 'react';
import { View, Text ,StyleSheet} from 'react-native';


const RepairScreen = () => {
  return (

   
    <View  style={styles.container}> 
       <View style={styles.header}>
          <Text style={styles.head}>Easier to repair .{'\n'}let's get started!</Text>
       </View>
    </View>
  );
}

export default RepairScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 50, 44, 1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height:150,
  },
  head:{
   color:'white',
   fontSize:15,
   letterSpacing:1.5,
   marginTop:30,

  }
});