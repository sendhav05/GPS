/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* eslint-disable react/sort-comp, react/prop-types */

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
      && nextProps.userSignupResponse.response.status_code === 200) {
      const utils = new Utils();
      if (nextProps.userSignupResponse.response.status) {
        if (this.props.navigation.state.params.isFromCustomer) {
          utils.setCustomerID(nextProps.userSignupResponse.response.data.user_id);
          utils.setItemWithKeyAndValue('CUSTOMER_USER_DETAILS', nextProps.userSignupResponse.response.data);
          utils.setItemWithKeyAndValue('CUSTOMER_USER_PASSWORD', this.state.password );
        } else {
          utils.setDriverID(nextProps.userSignupResponse.response.data.user_id);
          utils.setItemWithKeyAndValue('DRIVER_USER_DETAILS', nextProps.userSignupResponse.response.data);
          utils.setItemWithKeyAndValue('DRIVER_USER_PASSWORD', this.state.password );
        }
        this.navigateTOScreen(Number(nextProps.userSignupResponse.response.data.status));
      } else {
        if (this.props.navigation.state.params.isFromCustomer) {
          utils.setCustomerID(nextProps.userSignupResponse.response.data.user_id);
          utils.setItemWithKeyAndValue('CUSTOMER_USER_DETAILS', nextProps.userSignupResponse.response.data);
          // utils.setItemWithKeyAndValue('CUSTOMER_USER_PASSWORD', this.state.password );
        } else {
          utils.setDriverID(nextProps.userSignupResponse.response.data.user_id);
          utils.setItemWithKeyAndValue('DRIVER_USER_DETAILS', nextProps.userSignupResponse.response.data);
          // utils.setItemWithKeyAndValue('DRIVER_USER_PASSWORD', this.state.password );
        }
        this.navigateTOScreen(Number(0));
      }
    } else if (!nextProps.isLoading && nextProps.userSignupResponse.response
      && nextProps.userSignupResponse.response.status_code !== 200) {
      if (nextProps.userSignupResponse.response.message && typeof nextProps.userSignupResponse.response.message === 'string') {
        showPopupAlert(nextProps.userSignupResponse.response.message);
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
          showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
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
