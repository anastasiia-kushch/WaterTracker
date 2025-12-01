import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import DayDetailsScreen from './screens/DayDetailsScreen';

type RootStackParamList = {
  Home: undefined;
  History: undefined;
  DayDetails: { date: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="DayDetails" component={DayDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
