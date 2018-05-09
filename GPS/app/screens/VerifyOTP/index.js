/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* eslint-disable react/sort-comp, react/prop-types */

import React, { Component } from 'react';
import {
  View,
  Keyboard,
  Platform,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import VerifyOTP from './components/VerifyOTP';
import UserActions from '../../actions';
import Utils from '../../utils/utils';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';

let isCalledVerifyAPI = false;
let isCalledResendOTPAPI = false;

class VerifyOTPView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otpNumber: '',
    };
  }

  componentWillReceiveProps(nextProps) {
     this.manageResendOTPResponse(nextProps);

    if (!nextProps.isLoading
      && isCalledVerifyAPI
      && nextProps.verifyOTPResponse.response
      && nextProps.verifyOTPResponse.response.status_code === 200) {
      this.navigateToNextScreen();
      isCalledVerifyAPI = false;
    } else if (!nextProps.isLoading && nextProps.verifyOTPResponse.response
      && isCalledVerifyAPI
      && (nextProps.verifyOTPResponse.response.status_code !== 200)) {
      if (nextProps.verifyOTPResponse.response.message && typeof nextProps.verifyOTPResponse.response.message === 'string') {
        showPopupAlert(nextProps.verifyOTPResponse.response.message);
        isCalledVerifyAPI = false;
        return;
      }
      isCalledVerifyAPI = false;
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  manageResendOTPResponse(nextProps) {
    if (!nextProps.isLoading
      && isCalledResendOTPAPI
      && nextProps.resendOTPResponse.response
      && nextProps.resendOTPResponse.response.status_code === 200) {
      if (nextProps.resendOTPResponse.response.message && typeof nextProps.resendOTPResponse.response.message === 'string') {
        showPopupAlert(nextProps.resendOTPResponse.response.message);
        isCalledResendOTPAPI = false;
        return;
      }
      isCalledResendOTPAPI = false;
      showPopupAlert('Successfully Sent OTP.');
    } else if (!nextProps.isLoading && nextProps.resendOTPResponse.response
      && isCalledResendOTPAPI
      && (nextProps.resendOTPResponse.response.status_code !== 200)) {
      if (nextProps.resendOTPResponse.response.message && typeof nextProps.resendOTPResponse.response.message === 'string') {
        showPopupAlert(nextProps.resendOTPResponse.response.message);
        isCalledResendOTPAPI = false;
        return;
      }
      isCalledResendOTPAPI = false;
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  submitVerifyOTP(userid) {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        isCalledVerifyAPI = true;
        this.props.verifyOTPRequest(userid, this.state.otpNumber);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  resendOTP() {
    const utils = new Utils();
    const emailPhoneNumber = this.props.navigation.state.params.emailPhoneNumber;
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        isCalledResendOTPAPI = true;
        this.props.resendOTPRequest(emailPhoneNumber);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  onVerifyOTPPress() {
    const utils = new Utils();
    const type = this.props.navigation.state.params.isFromCustomer;
    if (type) {
      utils.getCustomerid((response) => {
        this.submitVerifyOTP(response);
      });
    } else {
      utils.getDriverID((response) => {
        this.submitVerifyOTP(response);
      });
    }
  }

  navigateToNextScreen() {
    const utils = new Utils();
    const type = this.props.navigation.state.params.isFromCustomer;
    if (type) {
      utils.setItemWithKeyAndValue('CUSTOMER_USER_PASSWORD', this.props.navigation.state.params.password );
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        key: null, // black magic
        actions: [NavigationActions.navigate({ routeName: 'drawerStack' })],
      });
      this.props.navigation.dispatch(actionToDispatch);
    } else {
      utils.setItemWithKeyAndValue('DRIVER_USER_PASSWORD', this.props.navigation.state.params.password );
      const { navigate } = this.props.navigation;
      navigate('DriverDocument', { isFromCustomer: type });
    }
  }

  onResendOTPPress() {
    console.log('***** onResendOTPPress ');
    this.resendOTP();
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  updateOTPNumber(value) {
    this.setState({ otpNumber: value });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <VerifyOTP
          onVerifyOTPPress={() => this.onVerifyOTPPress()}
          onResendOTPPress={() => this.onResendOTPPress()}
          onBacnkPress={() => this.onBacnkPress()}
          updateOTPNumber={otpNumber => this.updateOTPNumber(otpNumber)}
          otpNumber={this.state.otpNumber}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.verifyOTP.isLoading,
  verifyOTPResponse: state.verifyOTP.verifyOTPResponse,
  resendOTPResponse: state.verifyOTP.resendOTPResponse,
});

const mapDispatchToProps = () => UserActions;

const VerifyOTPViewScreen = connect(mapStateToProps, mapDispatchToProps)(VerifyOTPView);

export default VerifyOTPViewScreen;
