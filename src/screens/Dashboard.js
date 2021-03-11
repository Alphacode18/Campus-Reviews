import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import ProfessorsNavigator from '../../navigation/ProfNavigator';
import ClassNavigator from '../../navigation/ClassNavigator';
import DiningNavigator from '../../navigation/DiningNavigator';
import ProfileScreen from './containers/Profile';
import FacilitiesNavigator from '../../navigation/FacilitiesNavigator';

const { Navigator, Screen } = createBottomTabNavigator();

const PersonIcon = (props) => <Icon {...props} name='person-outline' />;
const ClassIcon = (props) => <Icon {...props} name='book-open-outline' />;
const ProfessorIcon = (props) => <Icon {...props} name='briefcase-outline' />;
const DiningIcon = (props) => <Icon {...props} name='car-outline' />;
const FacilitiesIcon = (props) => <Icon {...props} name='globe-outline' />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
    style={{ marginBottom: 25 }}
  >
    <BottomNavigationTab title='PROF' icon={ProfessorIcon} index={3} />
    <BottomNavigationTab title='CLASS' icon={ClassIcon} index={2} />
    <BottomNavigationTab title='FACILITES' icon={FacilitiesIcon} index={1} />
    <BottomNavigationTab title='DINE' icon={DiningIcon} index={0} />
    <BottomNavigationTab title='PROFILE' icon={PersonIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name='Professors' component={ProfessorsNavigator} />
    <Screen name='Classes' component={ClassNavigator} />
    <Screen name='Facilities' component={FacilitiesNavigator} />
    <Screen name='Dining' component={DiningNavigator} />
    <Screen name='Profile' component={ProfileScreen} />
  </Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default AppNavigator;
