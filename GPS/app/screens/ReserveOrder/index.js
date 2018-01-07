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

class OrderPlaceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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

  onOrderAddedPress() {
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
    return (
      <OrderPlace
        onBacnkPress={() => this.onBacnkPress()}
        onOrderAddedPress={() => this.onOrderAddedPress()}
        selectedOrderItem={this.props.navigation.state.params.selectedOrderItem}
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

