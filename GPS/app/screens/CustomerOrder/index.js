/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import runRootSaga from '../../sagas';
import CustomerOrder from './components/CustomerOrder';
import UserActions from '../../actions';
import { connect } from 'react-redux';
import drawer from '../../utils/drawer';

class CustomerOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailPhoneNumber: '',
      password: '',
    };
  }

  componentWillReceiveProps(nextProps) {
   
  }

  onChoosePaymentPress() {
    console.log('***** onChoosePaymentPress ');
  }

  onDeliveryAddressPress() {
    console.log('***** onDeliveryAddressPress ');
    const { navigate } = this.props.navigation;
    navigate('ChooseAddress');
    
  }

  onOrderPress() {
    console.log('***** onOrderPress ');
  }

  onBacnkPress() {
    //this.props.toggleDrawer();
    const { navigate } = this.props.navigation;
    navigate('DrawerOpen');
  }

  onEditOrderPress() {
    console.log('***** onEditOrderPress ');
  }

  updateEmailPhoneNumber(value) {
    this.setState({ emailPhoneNumber: value });
  }

  updatePassword(value) {
    this.setState({ password: value });
  }

  render() {
    return (
      <CustomerOrder
        onChoosePaymentPress={() => this.onChoosePaymentPress()}
        onDeliveryAddressPress={() => this.onDeliveryAddressPress()}
        onBacnkPress={() => this.onBacnkPress()}
        onEditOrderPress={() => this.onEditOrderPress()}
        onOrderPress={() => this.onOrderPress()}
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
//const drawerConnected = drawer(CustomerOrderView);

const CustomerOrderViewScreen = connect(mapStateToProps, mapDispatchToProps)(CustomerOrderView);

export default CustomerOrderViewScreen;

