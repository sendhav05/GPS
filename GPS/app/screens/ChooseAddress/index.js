/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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


class ChooseAddressView extends Component {
  constructor(props) {
    super(props);
    const isFromEdit = this.props.navigation.state.params.isEdit;
    const selectedAddress = this.props.navigation.state.params.selectedAddress;
    this.state = {
      addLineOne: isFromEdit ? selectedAddress.address : '',
      state: isFromEdit ? selectedAddress.state : '',
      chooseCity: isFromEdit ? selectedAddress.city : '',
      pinCode: isFromEdit ? selectedAddress.pin_code : '',
      landmark: isFromEdit ? selectedAddress.landmark : '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && nextProps.updateAddressListResponse.response
      && nextProps.updateAddressListResponse.status === 200) {
      // && nextProps.updateAddressListResponse.response.status === 1) {
      if (nextProps.updateAddressListResponse.response.message && typeof nextProps.updateAddressListResponse.response.message === 'string') {
        console.log('@@@@@@@@@@@@@@ 1');

        showPopupAlert(nextProps.updateAddressListResponse.response.message);
        const { goBack } = this.props.navigation;
        goBack(null);
        this.props.resetAddressData();
        this.props.navigation.state.params.onAddAddress({ });
        return;
      }
      showPopupAlert('Update address successfully.');
      const { goBack } = this.props.navigation;
      goBack(null);
    } else if (!nextProps.isLoading && nextProps.updateAddressListResponse.response
      && (nextProps.updateAddressListResponse.status !== 200
      || nextProps.updateAddressListResponse.response.status !== 1)) {
      if (nextProps.updateAddressListResponse.response.message && typeof nextProps.updateAddressListResponse.response.message === 'string') {
        showPopupAlert(nextProps.updateAddressListResponse.response.message);
        console.log('@@@@@@@@@@@@@@ 2');
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  onAddButtonPress() {
    console.log('******* this.state.landmark', this.state.landmark);

    const utils = new Utils();
    const isFromEdit = this.props.navigation.state.params.isEdit;
    let customerid = this.props.navigation.state.params.customerid;
    let deliverid = '';
    let type = '';
    if (isFromEdit) {
      type = 'edit';
      deliverid = this.props.navigation.state.params.selectedAddress.delivery_id;
    } else {
      type = 'add';
      deliverid = '';
    }
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        this.props.addAddressListRequest(type, this.state.chooseCity, this.state.pinCode, this.state.state, this.state.addLineOne, this.state.landmark, customerid, deliverid);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
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

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1, justifyContent: 'center' }}
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.container}>
          <KeyboardAwareScrollView>
            <NavBar
              leftMenuIcon={Images.backArrow}
              leftMenuPress={() => this.onBacnkPress()}
              title="Add a New Address"
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
              onAddButtonPress={() => this.onAddButtonPress()}
            />
            {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
          </KeyboardAwareScrollView>
        </View>
      </TouchableOpacity>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.addressList.isLoading,
  updateAddressListResponse: state.addressList.updateAddressListResponse,
});

const mapDispatchToProps = () => UserActions;

const ChooseAddressViewScreen = connect(mapStateToProps, mapDispatchToProps)(ChooseAddressView);

export default ChooseAddressViewScreen;
