/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Login from './components/Login';
import Register from './components/Register';
import AddResource from './components/AddResource';
import Logout from './components/Logout';
// import DrawerNavigation from './components/DrawerNavigation';
// import SelectDropDown from './components/SelectDropDown';
import ResourceDetailCont from './components/ResourceDetailCont';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function MyApp() {
  return (
    <Drawer.Navigator initialRouteName="Resource Detail">
      <Drawer.Screen
        name="Resource Detail"
        component={ResourceDetailCont}
        options={{headerShown: false}}></Drawer.Screen>
      <Drawer.Screen
        name="Add Resource"
        component={AddResource}
        options={{headerShown: false}}></Drawer.Screen>
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{headerShown: false}}></Drawer.Screen>
    </Drawer.Navigator>
  );
}
function App() {
  return (
    <View style={styles.appCont}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
      />
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <AddResource /> */}
      {/* <SelectDropDown /> */}
      {/* <ResourceDetailCont /> */}
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
            component={DrawerNavigation}
            name="Resource Detail"
            options={{headerShown: false}}></Stack.Screen> */}
          <Stack.Screen
            component={Login}
            name="Login"
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            component={MyApp}
            name="Resource Detail"
            options={{headerShown: false}}></Stack.Screen>

          <Stack.Screen
            component={Register}
            name="Create Account"
            options={{headerShown: false}}></Stack.Screen>

          <Stack.Screen
            component={AddResource}
            name="Add Resource"
            options={{headerShown: false}}></Stack.Screen>
          {/* <Stack.Screen
            component={DrawerNavigation}
            name="Tabs"
            options={{headerShown: true}}></Stack.Screen> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
  appCont: {
    flex: 1,
  },
});
