import React from 'react';
// All the Screens
import ProjectTasks from '../screens/ProjectTasks';
import DateTasks from '../screens/DateTasks';
import Statistics from '../screens/Statistics';
import FocusMode from '../screens/FocusMode';
import MakeTask from '../screens/MakeTask';
import ChangeTask from '../screens/ChangeTask';
// Components
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Icon} from '@rneui/themed';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const TaskFilterScreens = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={'Date'}
        component={DateTasks}
        options={{
          headerShown: false,
          drawerIcon: ({focused}) => (
            <Icon
              name={'calendar'}
              type="material-community"
              size={25}
              color={focused ? 'crimson' : 'black'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={'Project'}
        component={ProjectTasks}
        options={{
          headerShown: false,
          drawerIcon: ({focused}) => (
            <Icon
              name={'bookmark'}
              type="material-community"
              size={25}
              color={focused ? 'crimson' : 'black'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={'Stats'}
        component={Statistics}
        options={{
          headerShown: false,
          drawerIcon: ({focused}) => (
            <Icon
              name={'chart-bar'}
              type="material-community"
              size={25}
              color={focused ? 'crimson' : 'black'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const FabScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Task'}
        component={MakeTask}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Focus'}
        component={FocusMode}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TaskScreens"
          component={TaskFilterScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FabScreens"
          component={FabScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangeTaskScreen"
          component={ChangeTask}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;
