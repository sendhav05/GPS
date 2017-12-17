import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import runRootSaga from './app/sagas';
import Navigator from './app/navigator';
import createStore from './app/Redux'
import ReduxNavigation from './app/navigator/ReduxNavigation'
import AppNavigation from './app/navigator/AppNavigation'

import SignIn from './app/screens/Welcome/index';
//const store = createStore()

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
    runRootSaga();
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}
