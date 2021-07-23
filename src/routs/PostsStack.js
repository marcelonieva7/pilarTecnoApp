import React from 'react';
import Posts from '../screens/Posts';
import PostDetail from '../screens/PostDetail';
import PostEdit from '../screens/PostEdit';
import PostCreate from '../screens/PostCreate';
import { createStackNavigator } from '@react-navigation/stack';

const PostsStack = createStackNavigator();

export const PostsStackScreen = () => {
  const headerOptions = {
    headerStyle: {
      backgroundColor: '#212e30',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen
        name="Posts"
        component={Posts}
        options={{headerShown: false}}
      />
      <PostsStack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{...headerOptions, title: 'Detalles'}}
      />
      <PostsStack.Screen
        name="PostEdit"
        component={PostEdit}
        options={{...headerOptions, title: 'Editar'}}
      />
      <PostsStack.Screen
        name="PostCreate"
        component={PostCreate}
        options={{...headerOptions, title: 'Crear Post'}}
      />
    </PostsStack.Navigator>
  );
};
