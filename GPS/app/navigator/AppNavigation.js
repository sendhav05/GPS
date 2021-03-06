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
import DriverWareHouseListScreen from '../screens/DriverWareHouseList';
import DriverOrderScreen from '../screens/DriverOrder';
import OrderDetailScreen from '../screens/OrderDetail';
import ReserveOrderScreen from '../screens/ReserveOrder';
import AddressListScreen from '../screens/AddressList';
import NotificationScreen from '../screens/Notification';
import CustomerOrderStatusScreen from '../screens/CustomerOrderStatus';
import CustomerFeedbackScreen from '../screens/CustomerFeedback';
import DriverDocumentScreen from '../screens/DriverDocument';
import UploadDocumentScreen from '../screens/UploadDocument';
import EarningsScreen from '../screens/Earnings';
import AccountScreen from '../screens/Account';
import SettingsScreen from '../screens/Settings';
import MyProfileScreen from '../screens/MyProfile';
import ReviewScreen from '../screens/Review';
import HistoryScreen from '../screens/History';
import ForgotPasswordScreen from '../screens/ForgotPassword';

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0,
  },
});

// *********** Customer AppStack stack ******
const AppStack = StackNavigator({
  WareHouseList: {
    screen: WareHouseListScreen,
    key: 'WareHouseListScreen',
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
  OrderPlace: {
    screen: OrderPlaceScreen,
    key: 'OrderPlaceScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  AddressList: {
    screen: AddressListScreen,
    key: 'AddressListScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  ChooseAddress: {
    screen: ChooseAddressScreen,
    key: 'ChooseAddressScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  CustomerOrderStatus: {
    screen: CustomerOrderStatusScreen,
    key: 'CustomerOrderStatusScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  CustomerFeedback: {
    screen: CustomerFeedbackScreen,
    key: 'CustomerFeedbackScreen',
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

const OrderStack = StackNavigator({
  CustomerOrder: {
    screen: CustomerOrderScreen,
    key: 'CustomerOrderScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  CustomerOrderStatus: {
    screen: CustomerOrderStatusScreen,
    key: 'CustomerOrderStatusScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  CustomerFeedback: {
    screen: CustomerFeedbackScreen,
    key: 'CustomerFeedbackScreen',
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

// drawer stack
const DrawerStack = DrawerNavigator({
  WareHouseList: { screen: AppStack },
  CustomerOrder: { screen: OrderStack },
}, {
  gesturesEnabled: false,
  drawerWidth: Dimensions.get('window').width - (Platform.OS === 'android' ? 56 : 64),
  contentComponent: props => <CustomerMenuScreen {...props} />,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack },
  AppStack: { screen: AppStack },
}, {
  headerMode: 'none',
});


// *********** Driver AppStack stack ******
const DriverAppStack = StackNavigator({
  DriverWareHouseList: {
    screen: DriverWareHouseListScreen,
    key: 'DriverWareHouseListScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  DriverOrder: {
    screen: DriverOrderScreen,
    key: 'DriverOrderScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  OrderDetail: {
    screen: OrderDetailScreen,
    key: 'OrderDetailScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  ReserveOrder: {
    screen: ReserveOrderScreen,
    key: 'ReserveOrderScreen',
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

const DriverOrderStack = StackNavigator({
  CustomerOrder: {
    screen: CustomerOrderScreen,
    key: 'CustomerOrderScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  ReserveOrder: {
    screen: ReserveOrderScreen,
    key: 'ReserveOrderScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  CustomerFeedback: {
    screen: CustomerFeedbackScreen,
    key: 'CustomerFeedbackScreen',
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

const DriverAccountStack = StackNavigator({
  Account: {
    screen: AccountScreen,
    key: 'AccountScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  UploadDocument: {
    screen: UploadDocumentScreen,
    key: 'UploadDocumentScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Earnings: {
    screen: EarningsScreen,
    key: 'EarningsScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Settings: {
    screen: SettingsScreen,
    key: 'SettingsScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  MyProfile: {
    screen: MyProfileScreen,
    key: 'MyProfileScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Review: {
    screen: ReviewScreen,
    key: 'ReviewScreen',
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


const EarningsStack = StackNavigator({
  Earnings: {
    screen: EarningsScreen,
    key: 'EarningsScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  History: {
    screen: HistoryScreen,
    key: 'HistoryScreen',
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

// driver drawer stack
const DriverStack = DrawerNavigator({
  DriverWareHouseList: { screen: DriverAppStack },
  CustomerOrder: { screen: DriverOrderStack },
  Notification: { screen: NotificationScreen },
  Review: { screen: ReviewScreen },
  Earnings: { screen: EarningsStack },
  Account: { screen: DriverAccountStack },
}, {
  gesturesEnabled: false,
  drawerWidth: Dimensions.get('window').width - (Platform.OS === 'android' ? 56 : 64),
  contentComponent: props => <CustomerMenuScreen {...props} />,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});

const DriverNavigation = StackNavigator({
  DriverStack: { screen: DriverStack },
  AppStack: { screen: AppStack },
}, {
  headerMode: 'none',
});

// *********** END *************

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
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    key: 'ForgotPasswordScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  DriverDocument: {
    screen: DriverDocumentScreen,
    key: 'DriverDocumentScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  UploadDocument: {
    screen: UploadDocumentScreen,
    key: 'UploadDocumentScreen',
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
  driverStack: { screen: DriverNavigation },
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack',
  transitionConfig: noTransitionConfig,
});

export default PrimaryNav;
