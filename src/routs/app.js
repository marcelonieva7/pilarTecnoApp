import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Tabs } from './Tabs';
import { LoginStackScreen } from '../routs/LoginStack'
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export const AppStack = (props) => {
  
  const user = useSelector(state=>state.user.user)

  return (
    <Stack.Navigator headerMode="none">
      {user ? (
        <Stack.Screen name="AppStack" component={Tabs} />
      ) : (
        <Stack.Screen name="LoginStack" component={LoginStackScreen} />
      )}
    </Stack.Navigator>
  );
};
