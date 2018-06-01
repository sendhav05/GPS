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
let isCalledForgotAPI = false;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailPhoneNumber: '',
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && isCalledForgotAPI
      && nextProps.forgotPasswordResponse.response
      && nextProps.forgotPasswordResponse.response.status_code === 200) {
      if (nextProps.forgotPasswordResponse.response.message && typeof nextProps.forgotPasswordResponse.response.message === 'string') {
        showPopupAlert(nextProps.forgotPasswordResponse.response.message);
        isCalledForgotAPI = false;
        this.onBacnkPress();
        return;
      }
      this.onBacnkPress();
      isCalledForgotAPI = false;
      showPopupAlert('Please check your email.');
    } else if (!nextProps.isLoading && nextProps.forgotPasswordResponse.response
      && (nextProps.forgotPasswordResponse.status_code !== 200
        && isCalledForgotAPI)) {
      if (nextProps.forgotPasswordResponse.response.message && typeof nextProps.forgotPasswordResponse.response.message === 'string') {
        isCalledForgotAPI = false;
        showPopupAlert(nextProps.forgotPasswordResponse.response.message);
        return;
      }
      isCalledForgotAPI = false;
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
          isCalledForgotAPI = true;
          this.props.forgotPasswordRequest(this.state.emailPhoneNumber);
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
  isLoading: state.forgotPassword.isLoading,
  forgotPasswordResponse: state.forgotPassword.forgotPasswordResponse,
});

const mapDispatchToProps = () => UserActions;

const AppScreen = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppScreen;
