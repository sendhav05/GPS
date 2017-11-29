import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/SignIn';
import WelcomeScreen from '../screens/Welcome';

const RootNavigator = StackNavigator({
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
});

export default RootNavigator;
