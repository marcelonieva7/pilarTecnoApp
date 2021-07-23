import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from '../screens/Login';
import Signup from '../screens/Signup';
import Reset from '../screens/Reset';

const LoginStack = createStackNavigator();

export const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="LogIn" component={LogIn} options={{headerShown: false}}/>
      <LoginStack.Screen name="Signup" component={Signup} />
      <LoginStack.Screen name="Reset" component={Reset} />
    </LoginStack.Navigator>
  );
};
