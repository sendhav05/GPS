/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import runRootSaga from '../../sagas';
import Signup from './components/Signup';
import UserActions from '../../actions';
import { connect } from 'react-redux';

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
   
  }

  onForgotPassowrdPress() {
    console.log('***** onForgotPassowrdPress ');
  }

  onSignupPress() {
    console.log('***** onSignupPress ');
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

  render() {
    return (
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
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.signIn.isLoading,
});

const mapDispatchToProps = () => UserActions;

const SignupUserScreen = connect(mapStateToProps, mapDispatchToProps)(SignupUser);

export default SignupUserScreen;
