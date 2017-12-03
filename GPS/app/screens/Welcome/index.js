/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import runRootSaga from '../../sagas';
import Welcome from './components/Welcome';
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
    navigate('Login');
  }

  onBecomeDriverPress() {
    console.log('***** onBecomeDriverPress ');
    const { navigate } = this.props.navigation;
    navigate('Signup');
  }

  updateEmailPhoneNumber(value) {
    this.setState({ emailPhoneNumber: value });
  }

  updatePassword(value) {
    this.setState({ password: value });
  }

  render() {
    return (
        <Welcome
          onForgotPassowrdPress={() => this.onForgotPassowrdPress()}
          onLoginPress={() => this.onLoginPress()}
          onBecomeDriverPress={() => this.onBecomeDriverPress()}
          updateEmailPhoneNumber={emailPhoneNumber => this.updateEmailPhoneNumber(emailPhoneNumber)}
          emailPhoneNumber={this.state.emailPhoneNumber}
          updatePassword={emailPhoneNumber => this.updatePassword(emailPhoneNumber)}
          password={this.state.password}
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
