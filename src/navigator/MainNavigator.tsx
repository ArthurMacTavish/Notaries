import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home';
import CreateNote from '../screen/CreateNote';
import EditNote from '../screen/EditNote';
import ImmerseImage from '../screen/ImmerseImage';

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateNote"
          component={CreateNote}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditNote"
          component={EditNote}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ImmerseImage"
          component={ImmerseImage}
          options={{headerTitle: 'Incredibly High Tech Image Viewer'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
