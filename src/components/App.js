import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from '../routs/app';

const App = (props) => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
