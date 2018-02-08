/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* eslint-disable react/sort-comp, react/prop-types */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import getDirections from 'react-native-google-maps-directions';
import OrderPlace from './components/OrderPlace';
import UserActions from '../../actions';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import Utils from '../../utils/utils';
import constant from '../../utils/constants';
import PendingPickupOrder from './components/PendingPickupOrder';

let driverID = '-1';
let timerId = '';
let locationTimerId = '';
let reserveID = '-1';
let warehouseDetails = {};
let driverLat = 0.0;
let driverLng = 0.0;
let isCallPickupDoneAPI = false;
let isCallCompletedAPI = false;
let isCallReserveAPI = false;

class OrderPlaceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSecond: '60',
      deliveredBtnEnabled: false,
      isShowReserveOrderView: props.navigation.state.params.isShowReserveOrderView,
    };
  }

  componentWillMount() {
    this.driverCurrentLocation();
    if (!this.state.isShowReserveOrderView) {
      const navigationParams = this.props.navigation.state.params;
      warehouseDetails = navigationParams.warehouseDetails;

      if (Number(warehouseDetails.order_status) === 5) {
        this.setState({ deliveredBtnEnabled: true });
      }
    }
  }

  componentDidMount() {
    const utils = new Utils();
    utils.getDriverID((response) => {
      driverID = response;
      console.log('***** driverID ', driverID, response);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (isCallPickupDoneAPI) {
      this.managePickupDoneResponse(nextProps);
    }
    if (isCallCompletedAPI) {
      this.manageCompletedResponse(nextProps);
    }
    if (isCallReserveAPI) {
      this.manageReserveResponse(nextProps);
    }
  }

  manageReserveResponse(nextProps) {
    if (!nextProps.isLoading
      && nextProps.reserveOrderResponse.response
      && nextProps.reserveOrderResponse.status === 200) {
      // && nextProps.reserveOrderResponse.response.status === 1) {
      if (nextProps.reserveOrderResponse.response.message && typeof nextProps.reserveOrderResponse.response.message === 'string') {
        showPopupAlert(nextProps.reserveOrderResponse.response.message);
        reserveID = nextProps.reserveOrderResponse.response.data.reserve_order_id;
        warehouseDetails = nextProps.reserveOrderResponse.response.data.warehouse_details;
        timerId = setInterval(() => this.setTimePassed(), 1000);
        isCallReserveAPI = false;
        return;
      }
      showPopupAlert('Successfully delivered orders.');
    } else if (!nextProps.isLoading && nextProps.reserveOrderResponse.response
      && (nextProps.reserveOrderResponse.status !== 200
      || nextProps.reserveOrderResponse.response.status !== 1)) {
      if (nextProps.reserveOrderResponse.response.message && typeof nextProps.reserveOrderResponse.response.message === 'string') {
        isCallReserveAPI = false;
        showPopupAlert(nextProps.reserveOrderResponse.response.message);
        return;
      }
      isCallReserveAPI = false;
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  managePickupDoneResponse(nextProps) {
    if (!nextProps.isLoading
      && nextProps.pickupedUpOrderResponse.response
      && nextProps.pickupedUpOrderResponse.status === 200) {
      if (nextProps.pickupedUpOrderResponse.response.message && typeof nextProps.pickupedUpOrderResponse.response.message === 'string') {
        isCallPickupDoneAPI = false;
        this.setState({ deliveredBtnEnabled: true });
        showPopupAlert(nextProps.pickupedUpOrderResponse.response.message);
       // this.onBacnkPress();
        return;
      }
      showPopupAlert('Successfully pickedup orders.');
    } else if (!nextProps.isLoading && nextProps.pickupedUpOrderResponse.response
      && (nextProps.pickupedUpOrderResponse.status !== 200
      || nextProps.pickupedUpOrderResponse.response.status !== 1)) {
      if (nextProps.pickupedUpOrderResponse.response.message && typeof nextProps.pickupedUpOrderResponse.response.message === 'string') {
        isCallPickupDoneAPI = false;
        showPopupAlert(nextProps.pickupedUpOrderResponse.response.message);
        return;
      }
      isCallPickupDoneAPI = false;
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  manageCompletedResponse(nextProps) {
    if (!nextProps.isLoading
      && nextProps.completedOrderResponse.response
      && nextProps.completedOrderResponse.status === 200) {
      if (nextProps.completedOrderResponse.response.message && typeof nextProps.completedOrderResponse.response.message === 'string') {
        isCallCompletedAPI = false;
        showPopupAlert(nextProps.completedOrderResponse.response.message);
        this.onBacnkPress();
        return;
      }
      showPopupAlert('Successfully reserved orders.');
    } else if (!nextProps.isLoading && nextProps.completedOrderResponse.response
      && (nextProps.completedOrderResponse.status !== 200
      || nextProps.completedOrderResponse.response.status !== 1)) {
      if (nextProps.completedOrderResponse.response.message && typeof nextProps.completedOrderResponse.response.message === 'string') {
        isCallCompletedAPI = false;
        showPopupAlert(nextProps.completedOrderResponse.response.message);
        return;
      }
      isCallCompletedAPI = false;
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
        datas.push(navigationParams.confirmOrders[i].order_id);
      }

      orderids = datas.toString();
      const utils = new Utils();
      utils.checkInternetConnectivity((reach) => {
        if (reach) {
          isCallReserveAPI = true;
          this.props.reserveOrderRequest(driverID, orderids, navigationParams.selectedWareHouse.warehouse_id);
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
    this.setState({ isShowReserveOrderView: false });
  }

  setTimePassed() {
    if (this.state.currentSecond <= 0) {
      showPopupAlert('Your order is passed to other driver.');
      clearInterval(timerId);

      const navigationParams = this.props.navigation.state.params;
      let orderids = '';
      const datas = [];
      for (let i = 0; i < navigationParams.confirmOrders.length; i++) {
        datas.push(navigationParams.confirmOrders[i].order_id);
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
        latitude: navigationParams.warehouse_lat,
        longitude: navigationParams.warehouse_lng,
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
      // showPopupAlert(JSON.stringify(error));
    }, {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000,
    });
  }

  // ###### Pending Pickup Order

  showLocationOnMAp() {
    clearInterval(locationTimerId);
    locationTimerId = setInterval(() => this.fetchCurrentLocation(), 5000);
    if (this.state.deliveredBtnEnabled) {
      this.getCustomerDirectionsonMap();
    } else {
      this.getWarehouseDirectionsonMap();
    }
  }

  pickupDonePress() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        isCallPickupDoneAPI = true;
        this.props.pickedupOrderRequest(warehouseDetails.order_id);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  deliveredPress() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        isCallCompletedAPI = true;
        this.props.completedOrderRequest(warehouseDetails.order_id);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  onCallPress(phone) {
    console.log('@@@@@@@@@@ phone', phone);

    const utils = new Utils();
    utils.onCallPress(phone);
  }

  driverCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position.coords.latitude && position.coords.longitude) {
        driverLat = position.coords.latitude;
        driverLng = position.coords.longitude;
      } else {
        // showPopupAlert('Not Found Location.');
      }
    }, (error) => {
      // showPopupAlert(JSON.stringify(error));
    }, {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000,
    });
  }

  getWarehouseDirectionsonMap() {
    const data = {
      source: {
        latitude: driverLat,
        longitude: driverLng,
      },
      destination: {
        latitude: warehouseDetails.warehouse_lat ? parseFloat(warehouseDetails.warehouse_lat) : 0.0,
        longitude: warehouseDetails.warehouse_lng ? parseFloat(warehouseDetails.warehouse_lng) : 0.0,
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

  getCustomerDirectionsonMap() {
    const data = {
      source: {
        latitude: driverLat,
        longitude: driverLng,
      },
      destination: {
        latitude: warehouseDetails.customer_lat ? parseFloat(warehouseDetails.customer_lat) : 0.0,
        longitude: warehouseDetails.customer_lng ? parseFloat(warehouseDetails.customer_lng) : 0.0,
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

  render() {
    const navigationParams = this.props.navigation.state.params;
    let phoneNum = '';
    if (!this.state.isShowReserveOrderView) {
      if (this.state.deliveredBtnEnabled) {
        phoneNum = warehouseDetails.contact_no;
      } else {
        phoneNum = warehouseDetails.contact;
      }
    }

    return (
      <View style={{ flex: 1 }}>
        { this.state.isShowReserveOrderView ?
          <OrderPlace
            onBacnkPress={() => this.onBacnkPress()}
            onGoToPickupPress={() => this.onGoToPickupPress()}
            onCancelPress={() => this.onCancelPress()}
            onConfirmPress={() => this.onConfirmPress()}
            confirmOrders={navigationParams.confirmOrders}
            currentSecond={this.state.currentSecond}
            isShowReserveOrderView={this.state.isShowReserveOrderView}
          />
     :
          <PendingPickupOrder
            onBacnkPress={() => this.onBacnkPress()}
            pickupDonePress={() => this.pickupDonePress()}
            deliveredPress={() => this.deliveredPress()}
            onCallPress={phone => this.onCallPress(phone)}
            showLocationOnMAp={() => this.showLocationOnMAp()}
            warehouseDetails={warehouseDetails}
            deliveredBtnEnabled={this.state.deliveredBtnEnabled}
            phoneNum={phoneNum}
          />
      }
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.reserveOrder.isLoading,
  reserveOrderResponse: state.reserveOrder.reserveOrderResponse,
  pickupedUpOrderResponse: state.reserveOrder.pickupedUpOrderResponse,
  completedOrderResponse: state.reserveOrder.completedOrderResponse,
});

const mapDispatchToProps = () => UserActions;

const OrderPlaceViewScreen = connect(mapStateToProps, mapDispatchToProps)(OrderPlaceView);

export default OrderPlaceViewScreen;

