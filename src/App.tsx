// src/App.tsx

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OverviewScreen from './screens/OverviewScreen';
import CreateScreen from './screens/CreateScreen';
import LoginScreen from './screens/LoginScreen';
import DeleteScreen from './screens/DeleteScreen';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer style={{backgroundColor: 'purple' }}>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="OverviewScreen" component={OverviewScreen} />
          <Stack.Screen name="Create" component={CreateScreen} />
          <Stack.Screen name="Delete" component={DeleteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
