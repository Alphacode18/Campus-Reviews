import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';
import DiningNavigator from './DiningNavigator';
import DiningNavigatorR from './DiningNavigatorR';
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
		<Screen name="Posts" component={DiningNavigator} />
		<Screen name="Reviews" component={DiningNavigatorR} />
	</Navigator>
);

const DiningTopNavigator = () => <TabNavigator />;

export default DiningTopNavigator;
