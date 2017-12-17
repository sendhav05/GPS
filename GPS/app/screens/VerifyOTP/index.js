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

class VerifyOTPView extends Component {
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
   // this.props.navigation.navigate('drawerStack')
    const { navigate } = this.props.navigation;
    navigate('drawerStack');
  }

  onResendOTPPress() {
    console.log('***** onResendOTPPress ');
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  updateOTPNumber(value) {
    this.setState({ otpNumber: value });
  }

  render() {
    return (
      <VerifyOTP
        onVerifyOTPPress={() => this.onVerifyOTPPress()}
        onResendOTPPress={() => this.onResendOTPPress()}
        onBacnkPress={() => this.onBacnkPress()}
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

const VerifyOTPViewScreen = connect(mapStateToProps, mapDispatchToProps)(VerifyOTPView);

export default VerifyOTPViewScreen;
