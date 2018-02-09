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

let isCalledAddAddessAPI = false;

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

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && isCalledAddAddessAPI
      && nextProps.updateAddressListResponse.response
      && nextProps.updateAddressListResponse.status === 200) {
        isCalledAddAddessAPI = false;
      this.onBacnkPress();
    } else if (!nextProps.isLoading && nextProps.updateAddressListResponse.response
      && (nextProps.updateAddressListResponse.status !== 200
      && isCalledAddAddessAPI
      || nextProps.updateAddressListResponse.response.status !== 1)) {
      if (nextProps.updateAddressListResponse.response.message && typeof nextProps.updateAddressListResponse.response.message === 'string') {
        showPopupAlert(nextProps.updateAddressListResponse.response.message);
        console.log('@@@@@@@@@@@@@@ 2');
        isCalledAddAddessAPI = false;
        return;
      }
      isCalledAddAddessAPI = false;
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
    const shppingAddress = {
      pincode: this.state.spinCode,
      state: this.state.sstate,
      city: this.state.schooseCity,
      address: this.state.saddLineOne,
      landmark: this.state.slandmark,
    }
    this.props.navigation.state.params.onSelectAddress({ selectedAddress: shppingAddress });
  }

  onAddButtonPress() {
    const utils = new Utils();
    const customerid = this.props.navigation.state.params.customerid;
    const type = 'add';
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        isCalledAddAddessAPI = true;
        this.props.addAddressListRequest(type, this.state.chooseCity, this.state.pinCode, this.state.state, this.state.addLineOne, this.state.landmark, customerid,
          this.state.spinCode, this.state.sstate, this.state.saddLineOne, this.state.slandmark, this.state.schooseCity,);
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

  supdateState1(value) {
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
            {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
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
