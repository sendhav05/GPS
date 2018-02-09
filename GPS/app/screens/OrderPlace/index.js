/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* eslint-disable react/sort-comp, react/prop-types */

import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import Geocoder from 'react-native-geocoding';
import OrderPlace from './components/OrderPlace';
import UserActions from '../../actions';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import Utils from '../../utils/utils';
import constant from '../../utils/constants';

Geocoder.setApiKey('AIzaSyAaW89mTb3_GuMBIg2zd1XGm-GT0anAd0I'); // use a valid API key

let totalPrice = 0;
let pincode = '';
let state = '';
let city = '';
let address = '';
let landmark = '';
let customerid = '-1';
let lat = '0.0';
let lng = '0.0';
let selectedAddress = {};
let customerDetails = {};
let wareHouseItem = {};
let distanceMiles = 0.0;

class OrderPlaceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '1',
      deliveryCharge: 0,
    };
    this.onSelectAddress = this.onSelectAddress.bind(this);
  }


  componentDidMount() {
    wareHouseItem = this.props.navigation.state.params.selectedWareHouseItem;
    this.getCustomerDetails();
    const utils = new Utils();
    utils.getCustomerid((response) => {
      customerid = response;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && nextProps.orderPlaceResponse.response
      && nextProps.orderPlaceResponse.status === 200) {
      Alert.alert(
        'GPS',
        'Thank you for your order. We will notify you when groceries are on the way.',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Track', onPress: () => this.gotToOrderStatusTrack(nextProps.orderPlaceResponse.response.data) },
        ],
      );
    } else if (!nextProps.isLoading && nextProps.orderPlaceResponse.response
      && (nextProps.orderPlaceResponse.status !== 200
      || nextProps.orderPlaceResponse.response.status !== 1)) {
      if (nextProps.orderPlaceResponse.response.message && typeof nextProps.orderPlaceResponse.response.message === 'string') {
        showPopupAlert(nextProps.orderPlaceResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  getCustomerDetails() {
    new Utils().getItemWithKey('CUSTOMER_USER_DETAILS', (response) => {
      if (response) {
        customerDetails = response;
      }
    });
  }

  onChoosePaymentPress() {
    console.log('***** onChoosePaymentPress ');
  }

  onDeliveryAddressPress() {
    const { navigate } = this.props.navigation;
    navigate('ChooseAddress', { onSelectAddress: this.onSelectAddress, customerid, selectedAddress });
  }

  gotToOrderStatusTrack(item) {
    const { navigate } = this.props.navigation;
    navigate('CustomerOrderStatus', { selectedOrderItem: item });
  }

  onSelectAddress(sAddress) {
    selectedAddress = sAddress.selectedAddress;
    pincode = selectedAddress.pin_code;
    state = selectedAddress.state;
    city = selectedAddress.city;
    address = selectedAddress.address;
    landmark = selectedAddress.landMark;
    lat = selectedAddress.lat;
    lng = selectedAddress.lng;

    const finalAddressStr = `${address} ${city}, ${landmark}, ${state}`;
    const warehouseLat = wareHouseItem.lat ? parseFloat(wareHouseItem.lat) : 0.0;
    const warehouseLng = wareHouseItem.lng ? parseFloat(wareHouseItem.lng) : 0.0;

    const utils = new Utils();
    const dMiles = utils.distanceBetweenCord(lat, lng, warehouseLat, warehouseLng, true);
    distanceMiles = dMiles.toFixed(2);
    console.log('***** distanceMiles ', distanceMiles);

    // delivery charge
    const minimumMiles = Number(wareHouseItem.minimumMiles);
    const minimumMileRate = Number(wareHouseItem.minimumMileRate);
    const perMileRate = Number(wareHouseItem.perMileRate);

    let dCharge = 0;
    if (distanceMiles) {
      if (distanceMiles <= minimumMiles) {
        dCharge = minimumMiles * minimumMileRate;
      } else {
        dCharge = distanceMiles * perMileRate;
      }
    }
    this.setState({ deliveryCharge: dCharge });

    // Geocoder.getFromLocation(finalAddressStr).then(
    //   (json) => {
    //     console.log('***** json ', json);

    //     let location = json.results[0].geometry.location;
    //     console.log('***** location ', location.lat, location.lng);
        
    //   },
    //   (error) => {
    //     alert(error);
    //   },
    // );
  }

  onOrderPress() {
    const warehouseid = this.props.navigation.state.params.selectedWareHouseItem.warehouse_id;
    const name = customerDetails.name;
    const contectno = customerDetails.contect_no;
    const email = customerDetails.email;
    const paymentid = Math.floor((Math.random() * 10000) + 1);
    const paymenttype = 'online';
    const paymentstatus = 'confirm';
    const totallamount = totalPrice;
    const itemiddata = { item_id: this.props.navigation.state.params.selectedProductItem.product_id, quantity: this.state.quantity, amount: totallamount };
    const itemid = encodeURIComponent(JSON.stringify(itemiddata));

    const isValid = this.validateAllField();
    if (isValid) {
      const utils = new Utils();
      utils.checkInternetConnectivity((reach) => {
        if (reach) {
          this.props.orderPlaceRequest(
            name, contectno, email, pincode, state,
            city, address, landmark, paymentid, paymenttype, paymentstatus,
            totallamount, customerid, itemid, warehouseid, lat, lng,
          );
        } else {
          showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
        }
      });
    }
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  onEditOrderPress() {
    console.log('***** onEditOrderPress ');
  }

  updateQuantity(quantity) {
    if (quantity <= this.props.navigation.state.params.selectedProductItem.quantity) {
      this.setState({ quantity });
    } else {
      showPopupAlert('Queantity limit is exceeded.');
    }
  }

  validateAllField() {
    if (Object.keys(selectedAddress).length === 0) {
      showPopupAlert('Please enter delivery address.');
      return false;
    }
    return true;
  }

  render() {
    const oneItemPrice = Number(this.props.navigation.state.params.selectedProductItem.price);
    const price = this.state.quantity * oneItemPrice;
    totalPrice = this.state.deliveryCharge + price;
    return (
      <OrderPlace
        onChoosePaymentPress={() => this.onChoosePaymentPress()}
        onDeliveryAddressPress={() => this.onDeliveryAddressPress()}
        onBacnkPress={() => this.onBacnkPress()}
        onEditOrderPress={() => this.onEditOrderPress()}
        onOrderPress={() => this.onOrderPress()}
        updateQuantity={quantity => this.updateQuantity(quantity)}
        quantity={this.state.quantity}
        selectedProductItem={this.props.navigation.state.params.selectedProductItem}
        totalPrice={totalPrice}
        price={price}
        deliveryCharge={this.state.deliveryCharge}
        distanceMiles={distanceMiles}
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

