import React from 'react';
import Centers from '../screens/Centers';
import CenterDetail from '../screens/CenterDetail';
import CenterEdit from '../screens/CenterEdit';
import CenterCreate from '../screens/CenterCreate';
import CenterMap from '../screens/CenterMap';
import { createStackNavigator } from '@react-navigation/stack';

const CentersStack = createStackNavigator();

export const CentersStackScreen = () => {
  const headerOptions = {
    headerStyle: {
      backgroundColor: '#212e30',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  return (
    <CentersStack.Navigator>
      <CentersStack.Screen
        name="Centers"
        component={Centers}
        options={{ headerShown: false }}
      />
      <CentersStack.Screen
        name="CenterDetail"
        component={CenterDetail}
        options={{ ...headerOptions, title: 'Detalles' }}
      />
      <CentersStack.Screen
        name="CenterEdit"
        component={CenterEdit}
        options={{ ...headerOptions, title: 'Editar' }}
      />
      <CentersStack.Screen
        name="CenterCreate"
        component={CenterCreate}
        options={{ ...headerOptions, title: 'Crear Center' }}
      />
      <CentersStack.Screen
        name="CenterMap"
        component={CenterMap}
        options={{ ...headerOptions, title: 'Mapa Center' }}
      />
    </CentersStack.Navigator>
  );
};
