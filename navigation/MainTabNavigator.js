// Core
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// Components
import TabBarIcon from '../components/TabBarIcon';

// Screens
import ComposerScreen from '../screens/ComposerScreen';
import TodoListScreen from '../screens/TodoListScreen';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const ComposerStack = createStackNavigator({
    Settings: ComposerScreen,
});
ComposerStack.navigationOptions = {
    tabBarLabel: 'Composer',
    tabBarOptions: {
        labelStyle: {
            color: '#9a73ef',
        },
    },
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused = { focused }
            name = { Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle' }
        />
    ),
};

const TodoListStack = createStackNavigator({
    Settings: TodoListScreen,
});
TodoListStack.navigationOptions = {
    tabBarLabel: 'Todo',
    tabBarOptions: {
        labelStyle: {
            color: '#9a73ef',
        },
    },
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused = { focused }
            name = { Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box' }
        />
    ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};



const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
    ComposerStack,
  TodoListStack,
  LinksStack,
  SettingsStack,
});
