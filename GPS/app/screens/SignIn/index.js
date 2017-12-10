/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { store } from '../../store';
import runRootSaga from '../../sagas';
import SignIn from './components/SignIn.js';
import UserActions from '../../actions';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailPhoneNumber: '',
      password: '',
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  onForgotPassowrdPress() {
    console.log('***** onForgotPassowrdPress ');
  }

  onLoginPress() {
    console.log('***** onLoginPress ');
    const { navigate } = this.props.navigation;
    navigate('VerifyOTP');
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
  isLoading: state.signIn.isLoading,
});

const mapDispatchToProps = () => UserActions;

const AppScreen = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppScreen;
