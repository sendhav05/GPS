/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderPlace from './components/OrderPlace';
import UserActions from '../../actions';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import Utils from '../../utils/utils';
import constant from '../../utils/constants';

class OrderPlaceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onCancelPress() {
    console.log('***** onChoosePaymentPress ');
  }

  onConfirmPress() {
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  onGoToPickupPress() {
    console.log('***** onEditOrderPress ');
  }

  render() {
    return (
      <OrderPlace
        onBacnkPress={() => this.onBacnkPress()}
        onGoToPickupPress={() => this.onGoToPickupPress()}
        onCancelPress={() => this.onCancelPress()}
        onConfirmPress={() => this.onConfirmPress()}
        confirmOrders={this.props.navigation.state.params.confirmOrders}
      />
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.orderPlace.isLoading,
  orderPlaceResponse: state.orderPlace.orderPlaceResponse,
});

const mapDispatchToProps = () => UserActions;

const OrderPlaceViewScreen = connect(mapStateToProps, mapDispatchToProps)(OrderPlaceView);

export default OrderPlaceViewScreen;

