/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import Welcome from './components/Welcome';
import UserActions from '../../actions';
import Utils from '../../utils/utils';
import NotificationsIOS, { NotificationsAndroid } from 'react-native-notifications';

// Android Push Notification Screen
let mainScreen;

function onPushRegistered(deviceToken) {
  if (mainScreen) {
    mainScreen.onPushRegistered(deviceToken);
  }
}

function onNotificationOpened(notification) {
  if (mainScreen) {
    mainScreen.onNotificationOpened(notification);
  }
}

if (Platform.OS === 'android') {
  NotificationsAndroid.setRegistrationTokenUpdateListener(onPushRegistered);
  NotificationsAndroid.setNotificationOpenedListener(onNotificationOpened);
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailPhoneNumber: '',
      password: '',
    };
    // Push Notification
    if (Platform.OS === 'android') {
      mainScreen = this;
    } else {
      NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
      NotificationsIOS.requestPermissions();
      NotificationsIOS.consumeBackgroundQueue();
      NotificationsIOS.addEventListener('notificationOpened', this.onNotificationOpened.bind(this));
    }
  }

  onForgotPassowrdPress() {
    console.log('***** onForgotPassowrdPress ');
  }

  onLoginPress() {
    const { navigate } = this.props.navigation;
    const utils = new Utils();
    utils.setFlowFromCustomer(true);
    new Utils().getItemWithKey('CUSTOMER_USER_PASSWORD', (response) => {
      if (response) {
        navigate('VerifyOTP', { isFromCustomer: true });
      } else {
        navigate('Login', { isFromCustomer: true });
      }
    });
  }

  onBecomeDriverPress() {
    const { navigate } = this.props.navigation;
    const utils = new Utils();
    utils.setFlowFromCustomer(false);
    new Utils().getItemWithKey('DRIVER_USER_PASSWORD', (response) => {
      if (response) {
        navigate('VerifyOTP', { isFromCustomer: false });
      } else {
        navigate('Login', { isFromCustomer: false });
      }
    });
  }

  updateEmailPhoneNumber(value) {
    this.setState({ emailPhoneNumber: value });
  }

  updatePassword(value) {
    this.setState({ password: value });
  }

  // iOS Push Notification Method
  onPushRegistered(deviceToken) {
    console.log('Device Token Received', deviceToken);
    AsyncStorage.setItem('DEVICE_TOKEN_PN', JSON.stringify(deviceToken));
  }

  onNotificationOpened(notification) {
    const apsData = notification.getData();
    console.log('notification  apsData', apsData);
  }

  render() {
    return (
      <Welcome
        onForgotPassowrdPress={() => this.onForgotPassowrdPress()}
        onLoginPress={() => this.onLoginPress()}
        onBecomeDriverPress={() => this.onBecomeDriverPress()}
        updateEmailPhoneNumber={emailPhoneNumber => this.updateEmailPhoneNumber(emailPhoneNumber)}
        emailPhoneNumber={this.state.emailPhoneNumber}
        updatePassword={emailPhoneNumber => this.updatePassword(emailPhoneNumber)}
        password={this.state.password}
      />
    );
  }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = () => UserActions;

const AppScreen = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppScreen;
