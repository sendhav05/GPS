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
const lat = '0.0';
const lng = '0.0';
let selectedAddress = {};
let customerDetails = {};
let wareHouseItem = {};
let oneItemPrice = 0.0;
let isCalledOrderPlaceAPI = false;

class OrderPlaceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '1',
      deliveryCharge: 0,
      distanceMiles: 0,
    };
    this.onSelectAddress = this.onSelectAddress.bind(this);
    this.refreshDistanceData = this.refreshDistanceData.bind(this);
  }

  componentDidMount() {
    pincode = '';
    state = '';
    city = '';
    address = '';
    landmark = '';

    wareHouseItem = this.props.navigation.state.params.selectedWareHouseItem;
    this.getCustomerDetails();
    const utils = new Utils();
    utils.getCustomerid((response) => {
      customerid = response;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && isCalledOrderPlaceAPI
      && nextProps.orderPlaceResponse.response
      && nextProps.orderPlaceResponse.status === 200) {
      isCalledOrderPlaceAPI = false;
      Alert.alert(
        'GPS',
        'Thank you for your order. We will notify you when groceries are on the way.',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Track', onPress: () => this.gotToOrderStatusTrack(nextProps.orderPlaceResponse.response.data) },
        ],
      );
    } else if (!nextProps.isLoading && nextProps.orderPlaceResponse.response
      && isCalledOrderPlaceAPI
      && (nextProps.orderPlaceResponse.status !== 200)) {
      isCalledOrderPlaceAPI = false;
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
        console.log('***** customerDetails ', customerDetails);
      }
    });
  }

  onChoosePaymentPress() {
    console.log('***** onChoosePaymentPress ');
  }

  onDeliveryAddressPress() {
    const { navigate } = this.props.navigation;
    navigate('ChooseAddress', {
      onSelectAddress: this.onSelectAddress, customerid, selectedAddress, customerDetails,
    });
  }

  gotToOrderStatusTrack(item) {
    const { navigate } = this.props.navigation;
    navigate('CustomerOrderStatus', { selectedOrderItem: item });
  }

  onSelectAddress(sAddress) {
    selectedAddress = sAddress.selectedAddress;
    if (selectedAddress.address) {
      this.refreshDistanceData(selectedAddress);
    }
  }

  refreshDistanceData(selectedAddress) {
    pincode = selectedAddress.pincode ? selectedAddress.pincode : '';
    state = selectedAddress.state ? selectedAddress.state : '';
    city = selectedAddress.city ? selectedAddress.city : '';
    address = selectedAddress.address ? selectedAddress.address : '';
    landmark = selectedAddress.landmark ? selectedAddress.landmark : '';
    const finalAddressStr = `${address} ${city}, ${landmark}, ${state}`;
    Geocoder.getFromLocation(finalAddressStr).then(
      (json) => {
        const location = json.results[0].geometry.location;
        this.refreshDisAndPaymentData(location.lat, location.lng);
      },
      (error) => {
      },
    );
  }

  refreshDisAndPaymentData(lat1, lng1) {
    const warehouseLat = wareHouseItem.lat ? parseFloat(wareHouseItem.lat) : 0.0;
    const warehouseLng = wareHouseItem.lng ? parseFloat(wareHouseItem.lng) : 0.0;

    const utils = new Utils();
    const dMiles = utils.distanceBetweenCord(lat1, lng1, warehouseLat, warehouseLng, true);
    const tmpdistanceMiles = dMiles.toFixed(3);

    // delivery charge
    const minimumMiles = Number(wareHouseItem.minimumMiles);
    const minimumMileRate = Number(wareHouseItem.minimumMileRate);
    const perMileRate = Number(wareHouseItem.perMileRate);
    let dCharge = 0;
    if (tmpdistanceMiles) {
      if (tmpdistanceMiles <= minimumMiles) {
        dCharge = minimumMiles * minimumMileRate;
      } else {
        dCharge = tmpdistanceMiles * perMileRate;
      }
    }
    // Total Price
    const oneItemPrice = Number(this.props.navigation.state.params.selectedProductItem.price);
    const price = this.state.quantity * oneItemPrice;
    totalPrice = dCharge + price;
    totalPrice = totalPrice.toFixed(3);
    this.setState({ deliveryCharge: dCharge.toFixed(3), distanceMiles: tmpdistanceMiles });
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
          isCalledOrderPlaceAPI = true;
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
    if (!address) {
      showPopupAlert('Please enter delivery address.');
      return false;
    }
    return true;
  }

  render() {
    oneItemPrice = Number(this.props.navigation.state.params.selectedProductItem.price);
    oneItemPrice = oneItemPrice.toFixed(3);
    let price = this.state.quantity * oneItemPrice;
    price = Number(price).toFixed(3);
    if (this.state.deliveryCharge) {
      totalPrice = Number(this.state.deliveryCharge) + Number(price);
    } else {
      totalPrice = Number(price);
    }

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
        distanceMiles={this.state.distanceMiles}
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

