/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import DriverDocument from './components/DriverDocument';
import UserActions from '../../actions';

class DriverDocumentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otpNumber: '',
    };
  }

  componentWillReceiveProps(nextProps) {

  }

  onNextPress() {
    const type = this.props.navigation.state.params.isFromCustomer;
    if (type) {
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        key: null, // black magic
        actions: [NavigationActions.navigate({ routeName: 'drawerStack' })],
      });
      this.props.navigation.dispatch(actionToDispatch);
    } else {
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        key: null, // black magic
        actions: [NavigationActions.navigate({ routeName: 'driverStack' })],
      });
      this.props.navigation.dispatch(actionToDispatch);
    }
  }

  onResendOTPPress() {
    const { navigate } = this.props.navigation;
    navigate('UploadDocument');
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  render() {
    return (
      <DriverDocument
        onBacnkPress={() => this.onBacnkPress()}
        onResendOTPPress={() => this.onResendOTPPress()}
        onBacnkPress={() => this.onBacnkPress()}
      />
    );
  }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = () => UserActions;

const DriverDocumentViewScreen = connect(mapStateToProps, mapDispatchToProps)(DriverDocumentView);

export default DriverDocumentViewScreen;
