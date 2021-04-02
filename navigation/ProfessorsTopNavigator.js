import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';
import ProfessorsNavigator from './ProfNavigator';
import ProfessorsNavigatorR from './ProfNavigatorR';
import { SafeAreaView } from 'react-native';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabBar = ({ navigation, state }) => (
	<Layout>
		<SafeAreaView>
			<TabBar selectedIndex={state.index} onSelect={(index) => navigation.navigate(state.routeNames[index])}>
				<Tab title="Posts" />
				<Tab title="Reviews" />
			</TabBar>
		</SafeAreaView>
	</Layout>
);

const TabNavigator = () => (
	<Navigator tabBar={(props) => <TopTabBar {...props} />}>
		<Screen name="Posts" component={ProfessorsNavigator} />
		<Screen name="Reviews" component={ProfessorsNavigatorR} />
	</Navigator>
);

const ProfTopNavigator = () => <TabNavigator />;

export default ProfTopNavigator;
