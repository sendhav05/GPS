/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* eslint react/sort-comp: 0 */

import React, { Component } from 'react';
import {
  View,
  Keyboard,
  Platform,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import SignIn from './components/SignIn';
import UserActions from '../../actions';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';

const deviceType = (Platform.OS === 'android') ? 'A' : 'I';
let deviceTokenData = '';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailPhoneNumber: '',
      password: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('DEVICE_TOKEN_PN').then((deviceToken) => {
      if (deviceToken && JSON.parse(deviceToken)) {
        deviceTokenData = JSON.parse(deviceToken);
        console.log('***** deviceTokenData ', deviceTokenData);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && nextProps.userLoginResponse.response
      && nextProps.userLoginResponse.response.status_code === 200) {
      const utils = new Utils();
      if (nextProps.userLoginResponse.response.status) {
        if (this.props.navigation.state.params.isFromCustomer) {
          utils.setCustomerID(nextProps.userLoginResponse.response.data.user_id);
          utils.setItemWithKeyAndValue('CUSTOMER_USER_DETAILS', nextProps.userLoginResponse.response.data);
          utils.setItemWithKeyAndValue('CUSTOMER_USER_PASSWORD', this.state.password );
        } else {
          utils.setDriverID(nextProps.userLoginResponse.response.data.user_id);
          utils.setItemWithKeyAndValue('DRIVER_USER_DETAILS', nextProps.userLoginResponse.response.data);
          utils.setItemWithKeyAndValue('DRIVER_USER_PASSWORD', this.state.password );
        }
        this.navigateTOScreen(Number(nextProps.userLoginResponse.response.data.status));
      } else {
        if (this.props.navigation.state.params.isFromCustomer) {
          utils.setCustomerID(nextProps.userLoginResponse.response.data.user_id);
          utils.setItemWithKeyAndValue('CUSTOMER_USER_DETAILS', nextProps.userLoginResponse.response.data);
          // utils.setItemWithKeyAndValue('CUSTOMER_USER_PASSWORD', this.state.password );
        } else {
          utils.setDriverID(nextProps.userLoginResponse.response.data.user_id);
          utils.setItemWithKeyAndValue('DRIVER_USER_DETAILS', nextProps.userLoginResponse.response.data);
          // utils.setItemWithKeyAndValue('DRIVER_USER_PASSWORD', this.state.password );
        }
        this.navigateTOScreen(Number(0));
      }
    } else if (!nextProps.isLoading && nextProps.userLoginResponse.response
      && nextProps.userLoginResponse.response.status_code !== 200) {
      if (nextProps.userLoginResponse.response.message && typeof nextProps.userLoginResponse.response.message === 'string') {
        showPopupAlert(nextProps.userLoginResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  navigateTOScreen(status) {
    const { navigate } = this.props.navigation;
    if (this.props.navigation.state.params.isFromCustomer) {
      if (status) {
        const actionToDispatch = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: 'drawerStack' })],
        });
        this.props.navigation.dispatch(actionToDispatch);
      } else {
        navigate('VerifyOTP', {
          isFromCustomer: this.props.navigation.state.params.isFromCustomer,
          emailPhoneNumber: this.state.emailPhoneNumber,
          password: this.state.password,
        });
      }
    } else if (status) {
      navigate('DriverDocument', { isFromCustomer: true });
    } else {
      navigate('VerifyOTP', {
        isFromCustomer: this.props.navigation.state.params.isFromCustomer,
        emailPhoneNumber: this.state.emailPhoneNumber,
        password: this.state.password,
      });
    }
  }

  onForgotPassowrdPress() {
    const { navigate } = this.props.navigation;
    navigate('ForgotPassword', { isFromCustomer: this.props.navigation.state.params.isFromCustomer, emailPhoneNumber: this.state.emailPhoneNumber });
  }

  onLoginPress() {
    const isValid = this.validateAllField();
    if (isValid) {
      const utils = new Utils();
      utils.checkInternetConnectivity((reach) => {
        if (reach) {
          const type = this.props.navigation.state.params.isFromCustomer ? 2 : 3;
          this.props.userLoginRequest(this.state.emailPhoneNumber, this.state.password, type, deviceTokenData, deviceType);
          Keyboard.dismiss();
        } else {
          showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
        }
      });
    }
  }

  onBecomeDriverPress() {
    const { navigate } = this.props.navigation;
    navigate('Signup', { isFromCustomer: this.props.navigation.state.params.isFromCustomer });
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  validateAllField() {
    if (!this.state.emailPhoneNumber) {
      showPopupAlert('Please enter correct email or mobile number');
      return false;
    }
    if (!this.state.password) {
      showPopupAlert('Please enter correct passowrd');
      return false;
    }
    return true;
  }

  updateEmailPhoneNumber(value) {
    this.setState({ emailPhoneNumber: value });
  }

  updatePassword(value) {
    this.setState({ password: value });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SignIn
          onForgotPassowrdPress={() => this.onForgotPassowrdPress()}
          onLoginPress={() => this.onLoginPress()}
          onBacnkPress={() => this.onBacnkPress()}
          onBecomeDriverPress={() => this.onBecomeDriverPress()}
          updateEmailPhoneNumber={emailPhoneNumber => this.updateEmailPhoneNumber(emailPhoneNumber)}
          emailPhoneNumber={this.state.emailPhoneNumber}
          updatePassword={emailPhoneNumber => this.updatePassword(emailPhoneNumber)}
          password={this.state.password}
          isFromCustomer={this.props.navigation.state.params.isFromCustomer}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}

App.propTypes = {
  userSignupRequest: PropTypes.func,
  navigation: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
  ]),
  userSignupResponse: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.any),
    PropTypes.objectOf(PropTypes.any),
  ]),
};

App.defaultProps = {
  userSignupRequest: () => {},
  navigation: {},
  userSignupResponse: {},
};

const mapStateToProps = state => ({
  isLoading: state.login.isLoading,
  userLoginResponse: state.login.userLoginResponse,
});

const mapDispatchToProps = () => UserActions;

const AppScreen = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppScreen;
