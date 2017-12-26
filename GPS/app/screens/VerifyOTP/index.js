/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import VerifyOTP from './components/VerifyOTP';
import UserActions from '../../actions';

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
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null, // black magic
      actions: [NavigationActions.navigate({ routeName: 'drawerStack'})],
    });
    this.props.navigation.dispatch(actionToDispatch);

  //  const { navigate } = this.props.navigation;
  //   navigate('drawerStack', { isFromCustomer: this.props.navigation.state.params.isFromCustomer });
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
});

const mapDispatchToProps = () => UserActions;

const VerifyOTPViewScreen = connect(mapStateToProps, mapDispatchToProps)(VerifyOTPView);

export default VerifyOTPViewScreen;
