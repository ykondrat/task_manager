// Core
import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

// Tab
import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
    Main: MainTabNavigator,
});
