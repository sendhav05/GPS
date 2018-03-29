/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* eslint-disable react/sort-comp, react/prop-types */

import React, { Component } from 'react';
import {
  View,
  DatePickerIOS,
  DatePickerAndroid,
  TimePickerAndroid,
  Alert,
  Platform,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import stripe from 'tipsi-stripe';
import Geocoder from 'react-native-geocoding';
import OrderPlace from './components/OrderPlace';
import UserActions from '../../actions';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import Utils from '../../utils/utils';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';

Geocoder.setApiKey('AIzaSyAaW89mTb3_GuMBIg2zd1XGm-GT0anAd0I'); // use a valid API key

stripe.init({
  publishableKey: 'pk_test_hOZxCqv7UGfeRixTnH3S54rv',
});

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
let oneItemPrice = 0.0;
let isCalledOrderPlaceAPI = false;

let isOpenDOBPicker = false;

class OrderPlaceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '1',
      deliveryCharge: 0,
      distanceMiles: 0,
      deliveryDatetime: new Date(),
      isShowDatePicker: false,
    };
    this.onSelectAddress = this.onSelectAddress.bind(this);
    this.refreshDistanceData = this.refreshDistanceData.bind(this);
    this.setDOBDate = this.setDOBDate.bind(this);
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

  // Picker
  showDOBPicker() {
    isOpenDOBPicker = true;
    if (Platform.OS === 'ios') {
      return (<DatePickerIOS
        date={this.state.deliveryDatetime}
        mode="datetime"
        onDateChange={this.setDOBDate}
      />);
    }
    this.androidPicker();
    return null;
  }

  async androidTimePicker (date) {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        //const date = new Date(year, month, day);
        date.setMinutes(date.getMinutes() + minute);
        date.setHours(date.getHours() + hour);
        this.setState({ isShowDatePicker: false, deliveryDatetime: date });
      } else {
        this.setState({ isShowDatePicker: false });
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }
  
  async androidPicker() {
    try {
      const {
        action, year, month, day
      } = await DatePickerAndroid.open({
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const date = new Date(year, month, day);
        this.androidTimePicker(date)
       // this.setState({ isShowDatePicker: false, deliveryDatetime: date });
      } else {
        this.setState({ isShowDatePicker: false });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  setDOBDate(newDate) {
    this.setState({ deliveryDatetime: newDate });
  }

  updateStateDOB() {
    this.setState({ isShowDatePicker: !this.state.isShowDatePicker });
  }

  getCustomerDetails() {
    new Utils().getItemWithKey('CUSTOMER_USER_DETAILS', (response) => {
      if (response) {
        customerDetails = response;
      }
    });
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
        lat = location.lat;
        lng = location.lng;
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
    const tmpdistanceMiles = dMiles.toFixed(2);

    // delivery charge
    const minimumMiles = Number(wareHouseItem.minimumMiles);
    const minimumMileRate = Number(wareHouseItem.minimumMileRate);
    const perMileRate = Number(wareHouseItem.perMileRate);
    let dCharge = 0;
    if (tmpdistanceMiles) {
      if (tmpdistanceMiles <= minimumMiles) {
        dCharge = minimumMileRate;
      } else {
        const diff = tmpdistanceMiles - minimumMiles;
        dCharge = minimumMileRate + (diff * perMileRate);
      }
    }
    // Total Price
    const oneItemPrice = Number(this.props.navigation.state.params.selectedProductItem.price);
    const price = this.state.quantity * oneItemPrice;
    totalPrice = dCharge + price;
    totalPrice = totalPrice.toFixed(2);
    this.setState({ deliveryCharge: dCharge.toFixed(2), distanceMiles: tmpdistanceMiles });
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
    const deliverytime = new Utils().convertDateToString(this.state.deliveryDatetime);

    const isValid = this.validateAllField();
    if (isValid) {
      const utils = new Utils();
      utils.checkInternetConnectivity((reach) => {
        if (reach) {
          isCalledOrderPlaceAPI = true;
          this.props.orderPlaceRequest(
            name, contectno, email, pincode, state,
            city, address, landmark, paymentid, paymenttype, paymentstatus,
            totallamount, customerid, itemid, warehouseid, lat, lng, deliverytime,
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

  onChoosePaymentPress() {
    this.handleCardPayPress();
  }


  async handleCardPayPress() {
    try {
      this.setState({ token: null });
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Gunilla Haugeh',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: 'Georgia',
            country: 'US',
            postalCode: '31217',
            email: 'ghaugeh0@printfriendly.com',
          },
        },
      });
      console.log('stripe token', this.state.token);
      this.setState({ token });
    } catch (error) {
      console.log('stripe error');
    }
  }
  
  dismissKeyboard() {
    Keyboard.dismiss();
    if (this.state.isShowDatePicker) {
      this.setState({ isShowDatePicker: false });
    }
  }

  render() {
    oneItemPrice = Number(this.props.navigation.state.params.selectedProductItem.price);
    oneItemPrice = oneItemPrice.toFixed(2);
    let price = this.state.quantity * oneItemPrice;
    price = Number(price).toFixed(2);
    if (this.state.deliveryCharge) {
      totalPrice = Number(this.state.deliveryCharge) + Number(price);
    } else {
      totalPrice = Number(price);
    }
    totalPrice = totalPrice.toFixed(2);
    const dateString = new Utils().convertDateToString(this.state.deliveryDatetime);

    return (
      <View style={{ flex: 1 }}>
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
          deliveryDatetime={isOpenDOBPicker ? dateString : 'Delivery Date Time'}
          updateStateDOB={() => this.updateStateDOB()}
          showDOBPicker={() => this.showDOBPicker()}
          dismissKeyboard={() => this.dismissKeyboard()}
          isShowDatePicker={this.state.isShowDatePicker}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
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

