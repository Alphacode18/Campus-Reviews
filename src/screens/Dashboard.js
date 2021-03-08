import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import ProfessorScreen from './containers/Professors';
import ClassesScreen from './containers/Classes';
import DiningScreen from './containers/Dining';
import ProfileScreen from './containers/Profile';

const { Navigator, Screen } = createBottomTabNavigator();

const PersonIcon = (props) => <Icon {...props} name='person-outline' />;
const ClassIcon = (props) => <Icon {...props} name='book-open-outline' />;
const ProfessorIcon = (props) => <Icon {...props} name='briefcase-outline' />;
const DiningIcon = (props) => <Icon {...props} name='car-outline' />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
    style={{ marginBottom: 25 }}
  >
    <BottomNavigationTab title='PROF' icon={ProfessorIcon} />
    <BottomNavigationTab title='CLASS' icon={ClassIcon} />
    <BottomNavigationTab title='DINE' icon={DiningIcon} />
    <BottomNavigationTab title='PROFILE' icon={PersonIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name='Proessors' component={ProfessorScreen} />
    <Screen name='Classes' component={ClassesScreen} />
    <Screen name='Dining' component={DiningScreen} />
    <Screen name='Profile' component={ProfileScreen} />
  </Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default AppNavigator;
