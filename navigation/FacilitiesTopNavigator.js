import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';
import FacilitiesNavigator from './FacilitiesNavigator';
import FacilitiesNavigatorR from './FacilitiesNavigatorR';
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
		<Screen name="Posts" component={FacilitiesNavigator} postType={'Posts'} />
		<Screen name="Reviews" component={FacilitiesNavigatorR} postType={'Reviews'} />
	</Navigator>
);

const FacilitiesTopNavigator = () => <TabNavigator />;

export default FacilitiesTopNavigator;
