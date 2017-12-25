/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import runRootSaga from '../../sagas';
import OrderPlace from './components/OrderPlace';
import UserActions from '../../actions';
import { connect } from 'react-redux';

const deliveryCharge = 10;

class OrderPlaceView extends Component {
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
    const { goBack } = this.props.navigation;
    goBack(null);
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
    const totalPrice = deliveryCharge + Number(this.props.navigation.state.params.selectedProductItem.price);
    return (
      <OrderPlace
        onChoosePaymentPress={() => this.onChoosePaymentPress()}
        onDeliveryAddressPress={() => this.onDeliveryAddressPress()}
        onBacnkPress={() => this.onBacnkPress()}
        onEditOrderPress={() => this.onEditOrderPress()}
        onOrderPress={() => this.onOrderPress()}
        updateEmailPhoneNumber={emailPhoneNumber => this.updateEmailPhoneNumber(emailPhoneNumber)}
        emailPhoneNumber={this.state.emailPhoneNumber}
        updatePassword={emailPhoneNumber => this.updatePassword(emailPhoneNumber)}
        password={this.state.password}
        selectedProductItem={this.props.navigation.state.params.selectedProductItem}
        totalPrice={totalPrice}
        deliveryCharge={deliveryCharge}
      />
    );
  }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = () => UserActions;
//const drawerConnected = drawer(OrderPlaceView);

const OrderPlaceViewScreen = connect(mapStateToProps, mapDispatchToProps)(OrderPlaceView);

export default OrderPlaceViewScreen;

