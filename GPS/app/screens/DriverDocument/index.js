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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from 'react-navigation';
import DriverDocument from './components/DriverDocument';
import UserActions from '../../actions';
import Utils from '../../utils/utils';
import Loader from '../../components/Loader';
import { showPopupAlert } from '../../utils/showAlert';

let driverID = '';
let isCalledDocAPI = false;

class DriverDocumentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otpNumber: '',
      dlNumber: '',
      ssnNumber: '',
      address: '',
    };
  }

  componentDidMount() {
    const utils = new Utils();
    utils.getDriverID((response) => {
      driverID = response;
    });
    new Utils().getItemWithKey('DRIVER_USER_DETAILS', (response) => {
      if (response) {
        this.setState({ ssnNumber: response.ssn, address:response.address, dlNumber: response.dlnumber });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && isCalledDocAPI
      && nextProps.updateDocDataResponse.response
      && nextProps.updateDocDataResponse.status === 200) {
        isCalledDocAPI = false;
      showPopupAlert(nextProps.updateDocDataResponse.response.message);
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        key: null, // black magic
        actions: [NavigationActions.navigate({ routeName: 'driverStack' })],
      });
      this.props.navigation.dispatch(actionToDispatch);
    } else if (!nextProps.isLoading && nextProps.updateDocDataResponse.response
      && isCalledDocAPI
      && (nextProps.updateDocDataResponse.status !== 200)) {
      if (nextProps.updateDocDataResponse.response.message && typeof nextProps.updateDocDataResponse.response.message === 'string') {
        isCalledDocAPI = false;
        showPopupAlert(nextProps.updateDocDataResponse.response.message);
        return;
      }
      isCalledDocAPI = false;
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  updateDocumentData() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        isCalledDocAPI = true;
        this.props.updateDriverDocumentNumberRequest(driverID, this.state.dlNumber, this.state.ssnNumber, this.state.address);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  onNextPress() {
    const type = this.props.navigation.state.params.isFromCustomer;
    if (type) {
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        key: null, // black magic
        actions: [NavigationActions.navigate({ routeName: 'drawerStack' })],
      });
      this.props.navigation.dispatch(actionToDispatch);
    } else {
      this.updateDocumentData();
    }
  }

  onUploadPress() {
    const { navigate } = this.props.navigation;
    navigate('UploadDocument');
  }

  updateSSN(value) {
    let tmpString = value;
    const index1 = this.state.ssnNumber.endsWith(' ')
    if (tmpString) {
      if (tmpString.length === 3 && !index1) {
        tmpString = `${tmpString} `
      } else  if (tmpString.length === 6 && !index1) {
        tmpString = `${tmpString} `
      }
    }
    this.setState({ ssnNumber: tmpString });
  }

  updateDL(value) {
    this.setState({ dlNumber: value });
  }
 
  updateAddress(value) {
    this.setState({ address: value });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DriverDocument
          onNextPress={() => this.onNextPress()}
          onUploadPress={() => this.onUploadPress()}
          ssnNumber={this.state.ssnNumber}
          updateSSN={ssnNumber => this.updateSSN(ssnNumber)}
          dlNumber={this.state.dlNumber}
          updateDL={dlNumber => this.updateDL(dlNumber)}
          address={this.state.address}
          updateAddress={address => this.updateAddress(address)}
        />
      {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.updateDocData.isLoading,
  updateDocDataResponse: state.updateDocData.updateDocDataResponse,
});

const mapDispatchToProps = () => UserActions;

const DriverDocumentViewScreen = connect(mapStateToProps, mapDispatchToProps)(DriverDocumentView);

export default DriverDocumentViewScreen;
