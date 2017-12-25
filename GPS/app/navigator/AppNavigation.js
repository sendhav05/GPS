import React from 'react';
import {
  Dimensions,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import LoginScreen from '../screens/SignIn';
import WelcomeScreen from '../screens/Welcome';
import SignupScreen from '../screens/Signup';
import VerifyOTPScreen from '../screens/VerifyOTP';
import OrderPlaceScreen from '../screens/OrderPlace';
import ChooseAddressScreen from '../screens/ChooseAddress';
import CustomerMenuScreen from '../screens/CustomerMenu';
import CustomerOrderScreen from '../screens/CustomerOrder';
import WareHouseListScreen from '../screens/WareHouseList';
import CategoryListScreen from '../screens/CategoryList';
import ProductListScreen from '../screens/ProductList';


// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0,
  },
});

// drawer stack
const DrawerStack = DrawerNavigator({
  WareHouseList: { screen: WareHouseListScreen },
  CategoryList: { screen: CategoryListScreen },
  ProductList: { screen: ProductListScreen },
  OrderPlace: { screen: OrderPlaceScreen },
  CustomerOrder: { screen: CustomerOrderScreen },
  ChooseAddress: { screen: ChooseAddressScreen },
}, {
  gesturesEnabled: false,
  drawerWidth: Dimensions.get('window').width - (Platform.OS === 'android' ? 56 : 64),
  contentComponent: props => <CustomerMenuScreen {...props} />,
});

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack },
}, {
  headerMode: 'none',
});

// login stack
const LoginStack = StackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    key: 'WelcomeScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Login: {
    screen: LoginScreen,
    key: 'LoginScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Signup: {
    screen: SignupScreen,
    key: 'SignupScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  VerifyOTP: {
    screen: VerifyOTPScreen,
    key: 'VerifyOTPScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  CategoryList: {
    screen: CategoryListScreen,
    key: 'CategoryListScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  ProductList: {
    screen: ProductListScreen,
    key: 'ProductListScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },

}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: { backgroundColor: 'red' },
    title: 'You are not logged in',
  },
});

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation },
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack',
  transitionConfig: noTransitionConfig,
});

export default PrimaryNav;
