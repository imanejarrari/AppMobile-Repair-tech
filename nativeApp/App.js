import SignUp from './screens/signUp';
import Login from './screens/login';
import MainScreen from './screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RepairForm from './screens/RepairForm';
import firstScreen from './screens/firstScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
   
        <NavigationContainer>
          <Stack.Navigator initialRouteName='firstScreen'>
          <Stack.Screen name="firstScreen" component={firstScreen} options={{ headerShown: false }} />
          <Stack.Screen name="signUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} /> 
          <Stack.Screen name="RepairForm" component={RepairForm} options={{ headerShown: false }} />
          </Stack.Navigator>
         
        </NavigationContainer>
  )

}
export default App; 
