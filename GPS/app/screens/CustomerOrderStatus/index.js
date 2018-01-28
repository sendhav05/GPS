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

class OrderStatusView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      region: {
        latitude: 22.862824,
        longitude: 75.881695,
        latitudeDelta: 0.722,
        longitudeDelta: 0.421,
      },
    };
  }

  componentDidMount() {
    // const utils = new Utils();
    // utils.getCustomerid((response) => {
    //   utils.checkInternetConnectivity((reach) => {
    //     if (reach && response) {
    //       this.props.notificationListRequest(response);
    //     } else {
    //       showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
    //     }
    //   });
    // });
  }

  componentWillReceiveProps(nextProps) {

    if (!nextProps.isLoading
      && nextProps.notificationListResponse.response
      && nextProps.notificationListResponse.status === 200) {
      // && nextProps.notificationListResponse.response.status === 1) {
      if (nextProps.notificationListResponse.response.data.length > 0) {
        this.setState({ dataArray: nextProps.notificationListResponse.response.data });
      } else {
        showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
      }
    } else if (!nextProps.isLoading && nextProps.notificationListResponse.response
      && (nextProps.notificationListResponse.status !== 200
      || nextProps.notificationListResponse.response.status !== 1)) {
      if (nextProps.notificationListResponse.response.message && typeof nextProps.notificationListResponse.response.message === 'string') {
        showPopupAlert(nextProps.notificationListResponse.response.message);
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

  render() {
    const origin = {latitude: 19.078194, longitude: 72.872471};
    const destination = {latitude: 22.731080, longitude: 75.860752};
    const GOOGLE_MAPS_APIKEY = 'AIzaSyA6lbmQw7CuM5Ziw02m97CjiNQ4ZzEmKvw';

    return (
      <View style={{ flex: 1 }}>
        <OrderStatus
          onBacnkPress={() => this.onBacnkPress()}
          origin={origin}
          destination={destination}
          mapKey={GOOGLE_MAPS_APIKEY}
          region={this.state.region}
         // dataArray={this.state.dataArray}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.notification.isLoading,
  notificationListResponse: state.notification.notificationListResponse,
});

const mapDispatchToProps = () => UserActions;

const OrderStatusViewScreen = connect(mapStateToProps, mapDispatchToProps)(OrderStatusView);

export default OrderStatusViewScreen;

