/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import runRootSaga from '../../sagas';
import VerifyOTP from './components/VerifyOTP';
import UserActions from '../../actions';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otpNumber: '',
    };
  }

  componentWillReceiveProps(nextProps) {
   
  }

  onVerifyOTPPress() {
    console.log('***** onVerifyOTPPress ');
  }

  onResendOTPPress() {
    console.log('***** onResendOTPPress ');
    const { navigate } = this.props.navigation;
    navigate('Signup');
  }

  updateOTPNumber(value) {
    this.setState({ otpNumber: value });
  }

  render() {
    return (
      <VerifyOTP
        onVerifyOTPPress={() => this.onVerifyOTPPress()}
        onResendOTPPress={() => this.onResendOTPPress()}
        updateOTPNumber={otpNumber => this.updateOTPNumber(otpNumber)}
        otpNumber={this.state.otpNumber}
      />
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.signIn.isLoading,
});

const mapDispatchToProps = () => UserActions;

const AppScreen = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppScreen;
