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
  }

  componentWillReceiveProps(nextProps) {
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
    const navigationParams = this.props.navigation.state.params;

    const args = {
      number: navigationParams.selectedOrderItem.contact, // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
    call(args).catch(console.error)
  }

  cancelOrderPress() {
    
  }

  render() {
    const origin = {latitude: 19.078194, longitude: 72.872471};
    const destination = {latitude: 22.731080, longitude: 75.860752};
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
});

const mapDispatchToProps = () => UserActions;

const OrderStatusViewScreen = connect(mapStateToProps, mapDispatchToProps)(OrderStatusView);

export default OrderStatusViewScreen;

