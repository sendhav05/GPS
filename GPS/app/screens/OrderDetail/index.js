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

  onChoosePaymentPress() {
    console.log('***** onChoosePaymentPress ');
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  onOrderAddedPress() {
    const addedOrderItem = this.props.navigation.state.params.selectedOrderItem;
    const { goBack } = this.props.navigation;
    goBack(null);
    this.props.navigation.state.params.onAddedOrderItem({ addedOrderItem });
  }

  render() {
    return (
      <OrderPlace
        onBacnkPress={() => this.onBacnkPress()}
        onOrderAddedPress={() => this.onOrderAddedPress()}
        selectedOrderItem={this.props.navigation.state.params.selectedOrderItem}
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

