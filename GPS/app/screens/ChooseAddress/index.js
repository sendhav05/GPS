/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* eslint-disable react/sort-comp, react/prop-types */

import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import ChooseAddress from './components/ChooseAddress';
import UserActions from '../../actions';
import NavBar from '../../components/NavBar';
import Images from '../../assets/images';
import Loader from '../../components/Loader';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import Utils from '../../utils/utils';
import constant from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

let isCalledSaveAddessAPI = false;
let isCalledGetAddessAPI = false;
let shippingAddress = {};
let customerAddress = {};

class ChooseAddressView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addLineOne: '',
      state: '',
      chooseCity: '',
      pinCode: '',
      landmark: '',

      saddLineOne: '',
      sstate: '',
      schooseCity: '',
      spinCode: '',
      slandmark: '',
      isDefaultAddressSelected: true,
    };
  }

  componentDidMount() {
    this.reloadAddressData();
  }

  componentWillReceiveProps(nextProps) {
    this.saveAddressAtServer(nextProps);
    if (!nextProps.isLoading
      && isCalledGetAddessAPI
      && nextProps.addressListResponse.response
      && nextProps.addressListResponse.status === 200) {
      isCalledGetAddessAPI = false;
      if (nextProps.addressListResponse.response.data.delivery_address) {
        shippingAddress = nextProps.addressListResponse.response.data.delivery_address[0];
        console.log('*********** shippingAddress', shippingAddress);
        if (shippingAddress && shippingAddress.shipping_address) {
          this.setState({
            saddLineOne: shippingAddress.shipping_address ? shippingAddress.shipping_address : '',
            sstate: shippingAddress.shipping_state ? shippingAddress.shipping_state : '',
            schooseCity: shippingAddress.shipping_city ? shippingAddress.shipping_city : '',
            spinCode: shippingAddress.shipping_pin_code ? shippingAddress.shipping_pin_code : '',
            slandmark: shippingAddress.shipping_landmark ? shippingAddress.shipping_landmark : '',
          });
        }
      }
      customerAddress = nextProps.addressListResponse.response.data.customer_address[0];
      if (customerAddress && customerAddress.address) {
        this.setState({
          addLineOne: customerAddress.address ? customerAddress.address : '',
          state: customerAddress.state ? customerAddress.state : '',
          chooseCity: customerAddress.city ? customerAddress.city : '',
          pinCode: customerAddress.pin_code ? customerAddress.pin_code : '',
          landmark: customerAddress.landmark ? customerAddress.landmark : '',
        });
      }
    } else if (!nextProps.isLoading && nextProps.addressListResponse.response
      && (nextProps.addressListResponse.status !== 200
      && isCalledGetAddessAPI)) {
      if (nextProps.addressListResponse.response.message && typeof nextProps.addressListResponse.response.message === 'string') {
        showPopupAlert(nextProps.addressListResponse.response.message);
        isCalledGetAddessAPI = false;
        return;
      }
      isCalledGetAddessAPI = false;
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  saveAddressAtServer(nextProps) {
    if (!nextProps.isLoading
      && isCalledSaveAddessAPI
      && nextProps.updateAddressListResponse.response
      && nextProps.updateAddressListResponse.status === 200) {
      isCalledSaveAddessAPI = false;
      this.onBacnkPress();
    } else if (!nextProps.isLoading && nextProps.updateAddressListResponse.response
      && (nextProps.updateAddressListResponse.status !== 200
      && isCalledSaveAddessAPI)) {
      if (nextProps.updateAddressListResponse.response.message && typeof nextProps.updateAddressListResponse.response.message === 'string') {
        showPopupAlert(nextProps.updateAddressListResponse.response.message);
        isCalledSaveAddessAPI = false;
        return;
      }
      isCalledSaveAddessAPI = false;
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  reloadAddressData() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        isCalledGetAddessAPI = true;
        this.props.addressListRequest(this.props.navigation.state.params.customerid);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
    let shppingAddress = {};
    if (this.state.isDefaultAddressSelected) {
      if (this.state.addLineOne && this.state.chooseCity) {
        shppingAddress = {
          pincode: this.state.pinCode,
          state: this.state.state,
          city: this.state.chooseCity,
          address: this.state.addLineOne,
          landmark: this.state.landmark,
          lat: customerAddress.lat ? customerAddress.lat : '',
          lng: customerAddress.lng ? customerAddress.lng : '',
        };
      }
    } else if (this.state.saddLineOne && this.state.schooseCity) {
      shppingAddress = {
        pincode: this.state.spinCode,
        state: this.state.sstate,
        city: this.state.schooseCity,
        address: this.state.saddLineOne,
        landmark: this.state.slandmark,
        lat: shippingAddress.shipping_lat ? shippingAddress.shipping_lat : '',
        lng: shippingAddress.shipping_lng ? shippingAddress.shipping_lng : '',
      };
    }
    this.props.navigation.state.params.onSelectAddress({ selectedAddress: shppingAddress });
  }

  onAddButtonPress() {
    const utils = new Utils();
    const customerid = this.props.navigation.state.params.customerid;
    const type = 'add';
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        isCalledSaveAddessAPI = true;
        this.props.addAddressListRequest(
          type, this.state.chooseCity, this.state.pinCode, this.state.state, this.state.addLineOne, this.state.landmark, customerid,
          this.state.spinCode, this.state.sstate, this.state.saddLineOne, this.state.slandmark, this.state.schooseCity,
        );
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  onCellSelectionPress() {
    this.setState({ isDefaultAddressSelected: !this.state.isDefaultAddressSelected });
  }


  onEditOrderPress() {
    console.log('***** onEditOrderPress ');
  }

  updateAddLineOne(value) {
    this.setState({ addLineOne: value });
  }

  updateState(value) {
    this.setState({ state: value });
  }

  updateChooseCity(value) {
    this.setState({ chooseCity: value });
  }

  updatePinCode(value) {
    this.setState({ pinCode: value });
  }

  updateLandMark(value) {
    this.setState({ landmark: value });
  }

  // #### shipping
  supdateAddLineOne(value) {
    this.setState({ saddLineOne: value });
  }

  supdateState(value) {
    this.setState({ sstate: value });
  }

  supdateChooseCity(value) {
    this.setState({ schooseCity: value });
  }

  supdatePinCode(value) {
    this.setState({ spinCode: value });
  }

  supdateLandMark(value) {
    this.setState({ slandmark: value });
  }

  render() {
    console.log('*********** this.state.saddLineOne', this.state.saddLineOne);

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1, justifyContent: 'center' }}
            onPress={() => Keyboard.dismiss()}
          >
            <NavBar
              leftMenuIcon={Images.backArrow}
              leftMenuPress={() => this.onBacnkPress()}
              title="Address"
              isShowRightIcon={Boolean(false)}
              rightMenuIcon={Images.editOder}
              rightMenuPress={() => this.onEditOrderPress()}
            />
            <ChooseAddress
              updateAddLineOne={addLineOne => this.updateAddLineOne(addLineOne)}
              addLineOne={this.state.addLineOne}
              updateState={state => this.updateState(state)}
              state={this.state.state}
              updateChooseCity={chooseCity => this.updateChooseCity(chooseCity)}
              chooseCity={this.state.chooseCity}
              updatePinCode={pinCode => this.updatePinCode(pinCode)}
              pinCode={this.state.pinCode}
              updateLandMark={landmark => this.updateLandMark(landmark)}
              landmark={this.state.landmark}

              supdateAddLineOne={addLineOne => this.supdateAddLineOne(addLineOne)}
              saddLineOne={this.state.saddLineOne}
              supdateState={state => this.supdateState(state)}
              sstate={this.state.sstate}
              supdateChooseCity={chooseCity => this.supdateChooseCity(chooseCity)}
              schooseCity={this.state.schooseCity}
              supdatePinCode={pinCode => this.supdatePinCode(pinCode)}
              spinCode={this.state.spinCode}
              supdateLandMark={landmark => this.supdateLandMark(landmark)}
              slandmark={this.state.slandmark}

              isDefaultAddressSelected={this.state.isDefaultAddressSelected}
              onAddButtonPress={() => this.onAddButtonPress()}
              onCellSelectionPress={() => this.onCellSelectionPress()}
            />
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.addressList.isLoading,
  updateAddressListResponse: state.addressList.updateAddressListResponse,
  addressListResponse: state.addressList.addressListResponse,

});

const mapDispatchToProps = () => UserActions;

const ChooseAddressViewScreen = connect(mapStateToProps, mapDispatchToProps)(ChooseAddressView);

export default ChooseAddressViewScreen;
