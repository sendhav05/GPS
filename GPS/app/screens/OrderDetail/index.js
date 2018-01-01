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

const deliveryCharge = 10;
let totalPrice = 0;
let pincode = '';
let state = '';
let city = '';
let address = '';
let landmark = '';

class OrderPlaceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.navigation.state.params.selectedProductItem.quantity,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && nextProps.orderPlaceResponse.response
      && nextProps.orderPlaceResponse.status === 200) {
      // && nextProps.orderPlaceResponse.response.status === 1) {
      if (nextProps.orderPlaceResponse.response.message && typeof nextProps.orderPlaceResponse.response.message === 'string') {
        showPopupAlert(nextProps.orderPlaceResponse.response.message);
        const { goBack } = this.props.navigation;
        goBack(null);
        return;
      }
      showPopupAlert('Your order send successfully.');
      const { goBack } = this.props.navigation;
      goBack(null);
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

  onChoosePaymentPress() {
    console.log('***** onChoosePaymentPress ');
  }

  onDeliveryAddressPress() {
    const { navigate } = this.props.navigation;
    navigate('ChooseAddress', { onSelectAddress: this.onSelectAddress });
  }

  onSelectAddress(data) {
    pincode = data.data.pinCode;
    state = 1;
    city = 1;
    address = data.data.addLineTwo;
    landmark = data.data.landMark;
  }

  onOrderPress() {
    const name = 'Test data';
    const contectno = '9200260565';
    const email = 'test@gmail.com';
    const paymentid = 'pid123';
    const paymenttype = 'online';
    const paymentstatus = 'pending';
    const totallamount = totalPrice;
    const customerid = '1111';
    const itemid = '1111';

    const isValid = this.validateAllField();
    if (isValid) {
      const utils = new Utils();
      utils.checkInternetConnectivity((reach) => {
        if (reach) {
          this.props.orderPlaceRequest(
            name, contectno, email, pincode, state,
            city, address, landmark, paymentid, paymenttype, paymentstatus,
            totallamount, customerid, itemid,
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
    this.setState({ quantity });
  }

  validateAllField() {
    if (!(pincode && state && city && address)) {
      showPopupAlert('Please select delivery address.');
      return false;
    }
    return true;
  }

  render() {
    const oneItemPrice = Number(this.props.navigation.state.params.selectedProductItem.price);
    let price = this.state.quantity * oneItemPrice;
    totalPrice = deliveryCharge + price;
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
        deliveryCharge={deliveryCharge}
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

