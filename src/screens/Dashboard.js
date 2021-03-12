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
    <BottomNavigationTab title='PROF' icon={ProfessorIcon}  />
    <BottomNavigationTab title='CLASS' icon={ClassIcon} />
    <BottomNavigationTab title='FACILITES' icon={FacilitiesIcon} />
    <BottomNavigationTab title='DINE' icon={DiningIcon} />
    <BottomNavigationTab title='PROFILE' icon={PersonIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} index={3}/>}>
    <Screen name='Professors' component={ProfessorsNavigator} index={2}/>
    <Screen name='Classes' component={ClassNavigator} index={1}/>
    <Screen name='Facilities' component={FacilitiesNavigator} index={0}/>
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
