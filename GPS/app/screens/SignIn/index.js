/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import runRootSaga from '../../sagas';
import SignIn from './components/SignIn.js';
import UserActions from '../../actions';
import { connect } from 'react-redux';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps :', nextProps.isLoading);
  }
  
  onButtonClick() {
    console.log('sign in screen 1');
    this.props.signInUser();
  }

  render() {
    return (
        <SignIn
          onButtonClick={() => this.onButtonClick()}
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
