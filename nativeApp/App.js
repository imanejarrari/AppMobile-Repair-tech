import SignUp from './screens/signUp';
import Login from './screens/login';
import MainScreen from './screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RepairForm from './screens/RepairForm';
import MeetingFormScreen from './screens/MeetingFormScreen';
import ChatScreen from './screens/ChatScreen';
import { View ,Text} from 'react-native';


const Stack = createStackNavigator();

const App = () => {
  return (
   
        <NavigationContainer>
          <Stack.Navigator initialRouteName='firstScreen'>
          <Stack.Screen name="signUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} /> 
          <Stack.Screen
          name="RepairForm"
          component={RepairForm}
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 15 }}>LET'S REPAIR !</Text>
              </View>
            ),
            headerStyle: {
              backgroundColor: '#8B322C',
              height: 100, // Adjust height as needed
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />

          <Stack.Screen 
          name="MeetingFormScreen" 
          component={MeetingFormScreen} 
          options={{ 
            headerTitle: () => (
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 15 }}>MEET US!</Text>
              </View>
            ),
            headerStyle: {
              backgroundColor: '#8B322C',
              height: 100, // Adjust height as needed
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }} 
        />

          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
         
        </NavigationContainer>
  )

}
export default App; 
