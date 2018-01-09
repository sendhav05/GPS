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

let driverID = '-1';
let timerId = '';

class OrderPlaceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSecond: '60',
    };
  }

  componentDidMount() {
    const utils = new Utils();
    utils.getDriverID((response) => {
      driverID = response;
      console.log('***** driverID ', driverID, response);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && nextProps.reserveOrderResponse.response
      && nextProps.reserveOrderResponse.status === 200) {
      // && nextProps.reserveOrderResponse.response.status === 1) {
      if (nextProps.reserveOrderResponse.response.message && typeof nextProps.reserveOrderResponse.response.message === 'string') {
        showPopupAlert(nextProps.reserveOrderResponse.response.message);
        timerId = setInterval(() => this.setTimePassed(), 1000);
        return;
      }
      showPopupAlert('Successfully reserved orders.');
    } else if (!nextProps.isLoading && nextProps.reserveOrderResponse.response
      && (nextProps.reserveOrderResponse.status !== 200
      || nextProps.reserveOrderResponse.response.status !== 1)) {
      if (nextProps.reserveOrderResponse.response.message && typeof nextProps.reserveOrderResponse.response.message === 'string') {
        showPopupAlert(nextProps.reserveOrderResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  onCancelPress() {
    console.log('***** onChoosePaymentPress ');
  }

  onConfirmPress() {
    const navigationParams = this.props.navigation.state.params;
    if (navigationParams.confirmOrders.length > 0) {
      let orderids = '';
      const datas = [];

      for (let i = 0; i < navigationParams.confirmOrders.length; i++) {
        datas.push(navigationParams.confirmOrders[i].id);
      }

      orderids = datas.toString();
      const utils = new Utils();
      utils.checkInternetConnectivity((reach) => {
        if (reach) {
          this.props.reserveOrderRequest(driverID, orderids, navigationParams.selectedWareHouseID);
        } else {
          showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
        }
      });
    } else {
      showPopupAlert('Please add reserve order.');
    }
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  onGoToPickupPress() {
    clearInterval(timerId);
  }

  setTimePassed() {
    if (this.state.currentSecond <= 0) {
      showPopupAlert('Your order is passed to other driver.');
      clearInterval(timerId);
    } else {
      const decreasedValue = Number(this.state.currentSecond) - 1;
      this.setState({ currentSecond: decreasedValue });
    }
  }

  render() {
    return (
      <OrderPlace
        onBacnkPress={() => this.onBacnkPress()}
        onGoToPickupPress={() => this.onGoToPickupPress()}
        onCancelPress={() => this.onCancelPress()}
        onConfirmPress={() => this.onConfirmPress()}
        confirmOrders={this.props.navigation.state.params.confirmOrders}
        currentSecond={this.state.currentSecond}
      />
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.reserveOrder.isLoading,
  reserveOrderResponse: state.reserveOrder.reserveOrderResponse,
});

const mapDispatchToProps = () => UserActions;

const OrderPlaceViewScreen = connect(mapStateToProps, mapDispatchToProps)(OrderPlaceView);

export default OrderPlaceViewScreen;

