/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Keyboard,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import Signup from './components/Signup';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Utils from '../../utils/utils';
import Loader from '../../components/Loader';

class SignupUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && nextProps.userSignupResponse.response
      && nextProps.userSignupResponse.status === 200
      && (nextProps.userSignupResponse.response.status === 1 || nextProps.userSignupResponse.response.status === 'success')) {
      const { navigate } = this.props.navigation;
      navigate('VerifyOTP', { isFromCustomer: this.props.navigation.state.params.isFromCustomer });
      // this.props.resetUserSignupData();
    } else if (!nextProps.isLoading && nextProps.userSignupResponse.response
      && (nextProps.userSignupResponse.status !== 200
      || nextProps.userSignupResponse.response.status !== 1)) {
      if (nextProps.userSignupResponse.response.message && typeof nextProps.userSignupResponse.response.message === 'string') {
        showPopupAlert(nextProps.userSignupResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
      // this.props.resetUserSignupData();
    }
  }

  onForgotPassowrdPress() {
    console.log('***** onForgotPassowrdPress ');
  }

  onSignupPress() {
    const isValid = this.validateAllField();
    if (isValid) {
      const utils = new Utils();
      utils.checkInternetConnectivity((reach) => {
        if (reach) {
          const type = this.props.navigation.state.params.isFromCustomer ? 2 : 3;
          this.props.userSignupRequest(this.state.email, this.state.password, type, this.state.phone, this.state.name);
          Keyboard.dismiss();
        } else {
          showPopupAlertWithTile(constant.OFFLINE_TITLE, constants.OFFLINE_MESSAGE);
        }
      });
    }
  }

  onBecomeDriverPress() {
    console.log('***** onBecomeDriverPress ');
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  updateName(value) {
    this.setState({ name: value });
  }

  updateEmail(value) {
    this.setState({ email: value });
  }

  updatePhone(value) {
    this.setState({ phone: value });
  }

  updatePassword(value) {
    this.setState({ password: value });
  }

  updateConfirmPassword(value) {
    this.setState({ confirmPassword: value });
  }

  validateAllField() {
    if (!this.state.name) {
      showPopupAlert('Please enter correct name');
      return false;
    }
    if (!this.state.email) {
      showPopupAlert('Please enter correct email');
      return false;
    }
    if (!this.state.phone) {
      showPopupAlert('Please enter correct phone');
      return false;
    }
    if (!this.state.password) {
      showPopupAlert('Please enter correct passowrd');
      return false;
    }
    if (this.state.password !== this.state.confirmPassword) {
      showPopupAlert('Password does not match the confirm password');
      return false;
    }
    return true;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Signup
          onForgotPassowrdPress={() => this.onForgotPassowrdPress()}
          onSignupPress={() => this.onSignupPress()}
          onBacnkPress={() => this.onBacnkPress()}
          onBecomeDriverPress={() => this.onBecomeDriverPress()}
          updateName={name => this.updateName(name)}
          name={this.state.name}
          updateEmail={email => this.updateEmail(email)}
          email={this.state.email}
          updatePhone={phone => this.updatePhone(phone)}
          phone={this.state.phone}
          updatePassword={password => this.updatePassword(password)}
          password={this.state.password}
          updateConfirmPassword={confirmPassword => this.updateConfirmPassword(confirmPassword)}
          confirmPassword={this.state.confirmPassword}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}

SignupUser.defaultProps = {
  userSignupRequest: () => {},
  navigation: {},
  userSignupResponse: {},
};

const mapStateToProps = state => ({
  isLoading: state.signup.isLoading,
  userSignupResponse: state.signup.userSignupResponse,
});

const mapDispatchToProps = () => UserActions;

const SignupUserScreen = connect(mapStateToProps, mapDispatchToProps)(SignupUser);

export default SignupUserScreen;
