/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
      emailPhoneNumber: 'N@gmail.com',
      password: '123456',
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
      && nextProps.userLoginResponse.status === 200
      && nextProps.userLoginResponse.response.status === 1) {
      const utils = new Utils();
      console.log('********** data', nextProps.userLoginResponse.response.data);
      if (this.props.navigation.state.params.isFromCustomer) {
        utils.setCustomerID(nextProps.userLoginResponse.response.data.user_id);
        utils.setItemWithKeyAndValue('CUSTOMER_USER_DETAILS', nextProps.userLoginResponse.response.data);
        utils.setItemWithKeyAndValue('CUSTOMER_USER_PASSWORD', this.state.password );
      } else {
        utils.setDriverID(nextProps.userLoginResponse.response.data.user_id);
        utils.setItemWithKeyAndValue('DRIVER_USER_DETAILS', nextProps.userLoginResponse.response.data);
        utils.setItemWithKeyAndValue('DRIVER_USER_PASSWORD', this.state.password );
      }
      const { navigate } = this.props.navigation;
      navigate('VerifyOTP', { isFromCustomer: this.props.navigation.state.params.isFromCustomer });
    } else if (!nextProps.isLoading && nextProps.userLoginResponse.response
      && (nextProps.userLoginResponse.status !== 200
      || nextProps.userLoginResponse.response.status !== 1)) {
      if (nextProps.userLoginResponse.response.message && typeof nextProps.userLoginResponse.response.message === 'string') {
        showPopupAlert(nextProps.userLoginResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }


  onForgotPassowrdPress() {
    console.log('***** onForgotPassowrdPress ');
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
