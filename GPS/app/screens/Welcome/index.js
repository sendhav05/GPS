/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Welcome from './components/Welcome';
import UserActions from '../../actions';
import Utils from '../../utils/utils';

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
    const { navigate } = this.props.navigation;
    const utils = new Utils();
    utils.setFlowFromCustomer(true);
    navigate('Login', { isFromCustomer: true });
  }

  onBecomeDriverPress() {
    const { navigate } = this.props.navigation;
    const utils = new Utils();
    utils.setFlowFromCustomer(false);
    navigate('Login', { isFromCustomer: false });
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
});

const mapDispatchToProps = () => UserActions;

const AppScreen = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppScreen;
