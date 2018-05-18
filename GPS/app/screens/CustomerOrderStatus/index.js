/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import OrderStatus from './components/OrderStatus';
import UserActions from '../../actions';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';
import call from 'react-native-phone-call'
import { defaultLat, defaultLng } from '../../utils/constants';

class OrderStatusView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      region: {
        latitude: defaultLat,
        longitude: defaultLng,
        latitudeDelta: 0.722,
        longitudeDelta: 0.421,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && nextProps.cancelOrderResponse.response
      && nextProps.cancelOrderResponse.status === 200) {
      showPopupAlert('Your order cancel successfully.');
      const { goBack } = this.props.navigation;
      goBack(null);
    } else if (!nextProps.isLoading && nextProps.cancelOrderResponse.response
      && (nextProps.cancelOrderResponse.status !== 200
      || nextProps.cancelOrderResponse.response.status !== 1)) {
      if (nextProps.cancelOrderResponse.response.message && typeof nextProps.cancelOrderResponse.response.message === 'string') {
        showPopupAlert(nextProps.cancelOrderResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  onCellSelectionPress(selectedItem) {
    const { navigate } = this.props.navigation;
    navigate('CustomerOrderStatus');
   }

   onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  onCallPress() {
    console.log('******** data');
    const navigationParams = this.props.navigation.state.params;
    console.log('******** navigationParams', navigationParams.selectedOrderItem);

    if (navigationParams && navigationParams.selectedOrderItem && navigationParams.selectedOrderItem.contact) {
      new Utils().onCallPress();
    }
  }

  cancelOrderPress() {
    const utils = new Utils();
    const navigationParams = this.props.navigation.state.params;

    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        this.props.cancelOrderRequest(navigationParams.selectedOrderItem.order_id);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  render() {
    const navigationParams = this.props.navigation.state.params;
    const lat = navigationParams.selectedOrderItem.warehouse_lat ? parseFloat(navigationParams.selectedOrderItem.warehouse_lat) : 0.0
    const lng = navigationParams.selectedOrderItem.warehouse_lng ? parseFloat(navigationParams.selectedOrderItem.warehouse_lng) : 0.0
    const origin = {latitude: lat, longitude: lng};

    const deslat = navigationParams.selectedOrderItem.customer_lat ? parseFloat(navigationParams.selectedOrderItem.customer_lat) : 0.0
    const deslng = navigationParams.selectedOrderItem.customer_lng ? parseFloat(navigationParams.selectedOrderItem.customer_lng) : 0.0
    const destination = {latitude: deslat, longitude: deslng};

    let region = this.state.region;

    region.latitude = origin.latitude;
    region.longitude = origin.longitude;

    const GOOGLE_MAPS_APIKEY = 'AIzaSyA6lbmQw7CuM5Ziw02m97CjiNQ4ZzEmKvw';

    return (
      <View style={{ flex: 1 }}>
        <OrderStatus
          onBacnkPress={() => this.onBacnkPress()}
          onCallPress={() => this.onCallPress()}
          cancelOrderPress={() => this.cancelOrderPress()}
          origin={origin}
          destination={destination}
          mapKey={GOOGLE_MAPS_APIKEY}
          region={this.state.region}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.orderPlace.isLoading,
  cancelOrderResponse: state.orderPlace.cancelOrderResponse,
});

const mapDispatchToProps = () => UserActions;

const OrderStatusViewScreen = connect(mapStateToProps, mapDispatchToProps)(OrderStatusView);

export default OrderStatusViewScreen;

