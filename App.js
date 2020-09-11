import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Appscreen from './js/components/Journal';
import Home from './js/components/Home';



const Stack = createStackNavigator();

export default function App (){

  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'MEMORIES' }}
          
        />
        <Stack.Screen name="MyJournal" component={Appscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};