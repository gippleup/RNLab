/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Dev from './src/screens/Dev';
import {createStackNavigator} from '@react-navigation/stack';
import * as Testers from './src/dev/_index';
import { StyleSheet } from 'react-native';

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Developer">
        <Stack.Screen
          key="Developer"
          name="Developer"
          component={Dev}
          options={{headerStyle: styles.header, headerTintColor: "#bc6ff1"}}
        />
        {Object.entries(Testers).map(([name, component]) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={{headerStyle: styles.header, headerTintColor: "#bc6ff1"}}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#272727",
  },
})

export default App;
