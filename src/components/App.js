import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from '../routs/app';
import { Provider } from 'react-redux';
import { store } from '../Store';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { actions } from '../Store/actions';

let AppWrapped = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigationRef = React.useRef(null);
  
  // Handle user state changes
  async function onAuthStateChanged(user) {
    if (user) {
      setUser(user);
    } else {
      dispatch(actions.user.setUser(null));
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack />
    </NavigationContainer>
  );
};

const App = (props) => {
  return (
    <Provider store={store}>
      <AppWrapped />
    </Provider>
  );
};

export default App;
