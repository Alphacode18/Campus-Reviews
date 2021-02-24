import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <Layout style={styles.layout} level='4'>
      <Text category='h1'>Test Screen</Text>
    </Layout>
  </ApplicationProvider>
);

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
