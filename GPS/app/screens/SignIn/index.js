/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { store } from '../../store';
import runRootSaga from '../../sagas';
import SignIn from './components/SignIn';
import UserActions from '../../actions';
import { showPopupAlert } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailPhoneNumber: this.props.navigation.state.params.isFromCustomer ? 'customer@gmail.com' : 'driver@gmail.com',
      password: '123456',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userLoginResponse.response && nextProps.userLoginResponse.status === 200 && nextProps.userLoginResponse.response.status === 1) {
      // const { navigate } = this.props.navigation;
      // navigate('VerifyOTP');
      return;
    }
    if (nextProps.userLoginResponse.response && (nextProps.userLoginResponse.status !== 200 || nextProps.userLoginResponse.response.status !== 1)) {
      if (nextProps.userLoginResponse.response.message && typeof nextProps.userLoginResponse.response.message === 'string') {
        showPopupAlert(nextProps.userLoginResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
    const { navigate } = this.props.navigation;
    navigate('VerifyOTP', { isFromCustomer: this.props.navigation.state.params.isFromCustomer });
  }

  onForgotPassowrdPress() {
    console.log('***** onForgotPassowrdPress ');
  }

  onLoginPress() {
    const type = this.props.navigation.state.params.isFromCustomer ? 2 : 3;
    this.props.userLoginRequest(this.state.emailPhoneNumber, this.state.password, type);
  }

  onBecomeDriverPress() {
    const { navigate } = this.props.navigation;
    navigate('Signup');
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
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
  signInUser: PropTypes.func,
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
  signInUser: () => {},
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
