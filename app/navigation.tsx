import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './(tabs)';
import Rest from './restaurant';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="(tabs)" component={HomeScreen} />
        <Stack.Screen name="restaurant" component={Rest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
