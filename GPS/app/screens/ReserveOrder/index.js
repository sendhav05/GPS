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

class OrderPlaceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    let orderids = '';
    const datas = [];

    for (let i = 0; i < navigationParams.confirmOrders.length; i++) {
      datas.push(navigationParams.confirmOrders[i].id);
    }

    orderids = datas.toString();
    console.log('***** orderids ' , orderids);
    console.log('***** datas ', datas);

    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        this.props.reserveOrderRequest(driverID, orderids, navigationParams.selectedWareHouseID);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
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
  isLoading: state.reserveOrder.isLoading,
  reserveOrderResponse: state.reserveOrder.reserveOrderResponse,
});

const mapDispatchToProps = () => UserActions;

const OrderPlaceViewScreen = connect(mapStateToProps, mapDispatchToProps)(OrderPlaceView);

export default OrderPlaceViewScreen;

