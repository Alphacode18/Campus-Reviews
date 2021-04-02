import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Layout } from '@ui-kitten/components';

import ProfileScreen from './containers/Profile';

import ProfTopNavigator from '../../navigation/ProfessorsTopNavigator';
import ClassesTopNavigator from '../../navigation/ClassesTopNavigator';
import DiningTopNavigator from '../../navigation/DiningTopNavigator';
import FacilitiesTopNavigator from '../../navigation/FacilitiesTopNavigator';

const { Navigator, Screen } = createBottomTabNavigator();

const PersonIcon = (props) => <Icon {...props} name="person-outline" />;
const ClassIcon = (props) => <Icon {...props} name="book-open-outline" />;
const ProfessorIcon = (props) => <Icon {...props} name="briefcase-outline" />;
const DiningIcon = (props) => <Icon {...props} name="car-outline" />;
const FacilitiesIcon = (props) => <Icon {...props} name="globe-outline" />;

const BottomTabBar = ({ navigation, state }) => (
	<Layout>
		<BottomNavigation
			selectedIndex={state.index}
			onSelect={(index) => navigation.navigate(state.routeNames[index])}
			style={{ marginBottom: 25 }}
		>
			<BottomNavigationTab title="PROF" icon={ProfessorIcon} />
			<BottomNavigationTab title="CLASS" icon={ClassIcon} />
			<BottomNavigationTab title="FACILITES" icon={FacilitiesIcon} />
			<BottomNavigationTab title="DINE" icon={DiningIcon} />
			<BottomNavigationTab title="PROFILE" icon={PersonIcon} />
		</BottomNavigation>
	</Layout>
);

const TabNavigator = () => (
	<Navigator tabBar={(props) => <BottomTabBar {...props} />}>
		<Screen name="Professors" component={ProfTopNavigator} index={3} />
		<Screen name="Classes" component={ClassesTopNavigator} index={2} />
		<Screen name="Facilities" component={FacilitiesTopNavigator} index={1} />
		<Screen name="Dining" component={DiningTopNavigator} index={0} />
		<Screen name="Profile" component={ProfileScreen} />
	</Navigator>
);

const AppNavigator = () => (
	<NavigationContainer>
		<TabNavigator />
	</NavigationContainer>
);

export default AppNavigator;
