/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import getDirections from 'react-native-google-maps-directions';
import OrderPlace from './components/OrderPlace';
import UserActions from '../../actions';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import Utils from '../../utils/utils';
import LocationUpdate from '../../utils/LocationUpdate';
import constant from '../../utils/constants';

let driverID = '-1';
let timerId = '';
let locationTimerId = '';
let reserveID = '-1';

class OrderPlaceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSecond: '60',
    };
  }
orderPutBackRequest
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
        reserveID = nextProps.reserveOrderResponse.response.data.reserve_order_id;
        console.log('@@@@@@ reserveID', reserveID);
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
    locationTimerId = setInterval(() => this.fetchCurrentLocation(), 5000);
    this.handleGetDirections();
  }

  setTimePassed() {
    if (this.state.currentSecond <= 0) {
      showPopupAlert('Your order is passed to other driver.');
      clearInterval(timerId);

      const navigationParams = this.props.navigation.state.params;
      let orderids = '';
      const datas = [];
      for (let i = 0; i < navigationParams.confirmOrders.length; i++) {
        datas.push(navigationParams.confirmOrders[i].id);
      }
      orderids = datas.toString();
      const utils = new Utils();
      utils.checkInternetConnectivity((reach) => {
        if (reach) {
          this.props.orderPutBackRequest(orderids);
        } else {
          showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
        }
      });
      setTimeout(() => {
        this.props.navigation.goBack(null);
        this.props.navigation.goBack(null);
      }, 50);
    } else {
      const decreasedValue = Number(this.state.currentSecond) - 1;
      this.setState({ currentSecond: decreasedValue });
    }
  }

  handleGetDirections() {
    const navigationParams = this.props.navigation.state.params;
    let desLat = 0.0;
    let desLng = 0.0;
    for (let i = 0; i < navigationParams.confirmOrders.length; i++) {
      const item = navigationParams.confirmOrders[i];
      if (item.lat && item.lng) {
        desLat = Number(item.lat);
        desLng = Number(item.lng);
      }
    }

    const data = {
      source: {
        latitude: navigationParams.lat,
        longitude: navigationParams.lng,
      },
      destination: {
        latitude: desLat,
        longitude: desLng,
      },
      params: [
        {
          key: 'dirflg',
          value: 'w',
        },
      ],
    };
    getDirections(data);
  }

  fetchCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('@@@@@@@@@@ postion', position);
      if (position.coords.latitude && position.coords.longitude) {
        this.props.sendDriverLocationToserverRequest(reserveID, position.coords.latitude, position.coords.longitude);
      } else {
        // showPopupAlert('Not Found Location.');
      }
    }, (error) => {
      showPopupAlert(JSON.stringify(error));
    }, {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000,
    });
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

