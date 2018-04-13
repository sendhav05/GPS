/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* eslint-disable react/sort-comp, react/prop-types */

import React, { Component } from 'react';
import {
  View,
  Linking,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import MyProfile from './components/MyProfile';
import UserActions from '../../actions';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import ChooseImagePopup from '../../components/ChooseImagePopup';
import Images from '../../assets/images';

let isUploadDocumentAPI = false;
let isCalledFetchDocAPI = false;
let isCalledUpdateProfileAPI = false;
let isCalledOnlineAPI = false;
let driverID = '';
let customerDetails = {};
let userProfileData = {};
let onlineStats = 0;

class MyProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowImagePopup: false,
      imageSource: '',
      imageMultipartBody: {},
      hasImage: false,
      phoneNumber: '',
      email: '',
      ssn: '',
      address: '',
      state: '',
      city: '',
      zipcode: '',
      switchValue: 0,
    };
  }

  componentDidMount() {
    this.getCustomerDetails();
    const utils = new Utils();
    utils.getDriverID((response) => {
      driverID = response;
    });
   if (this.props.navigation.state.params && this.props.navigation.state.params.isFromAccount) {
    this.setState({ isFromAccount: this.props.navigation.state.params.isFromAccount });
    }
    new Utils().getItemWithKey('DRIVER_USER_DETAILS', (response) => {
      if (response) {
        this.setState({ switchValue: !Number(response.online_status) });
      }
    });
  }

  getCustomerDetails() {
    if (this.props.navigation.state.params && this.props.navigation.state.params.profileData) {
      userProfileData = this.props.navigation.state.params.profileData;
      const path = userProfileData.profile_image_path;
        if (userProfileData.profile_pic) {
          const imgurl = `${path}/${userProfileData.profile_pic}`
          this.setState({ imageSource: imgurl });
        }
      this.setState({ 
        phoneNumber: userProfileData.contect_no,
        email: userProfileData.email,
        ssn: userProfileData.ssn,
        address: userProfileData.address,
        state: userProfileData.state,
        city: userProfileData.city,
        zipcode: userProfileData.zipcode,
      });

    } else {
      new Utils().getItemWithKey('CUSTOMER_USER_DETAILS', (response) => {
        if (response) {
          userProfileData = response;
          const path = userProfileData.profile_image_path;
          if (userProfileData.profile_pic) {
            const imgurl = `${path}/${userProfileData.profile_pic}`
            this.setState({ imageSource: imgurl });
          }
          this.setState({ 
            phoneNumber: response.contect_no,
            email: response.email,
            ssn: response.ssn,
            address: response.address,
            state: response.state,
            city: response.city,
            zipcode: response.zipcode,
          });  
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.manageProfileResponse(nextProps);
    this.manageOnlineStatusResponse(nextProps);
    if (!nextProps.isLoading
      && isUploadDocumentAPI
      && nextProps.uploadDocumentResponse.response
      && nextProps.uploadDocumentResponse.status === 200) {
      if (nextProps.uploadDocumentResponse.response.message && typeof nextProps.uploadDocumentResponse.response.message === 'string') {
        showPopupAlert(nextProps.uploadDocumentResponse.response.message);
        isUploadDocumentAPI = false;
        return;
      }
      isUploadDocumentAPI = false;
      showPopupAlert('Successfully uploaded document.');
    } else if (!nextProps.isLoading && nextProps.uploadDocumentResponse.response
      && isUploadDocumentAPI
      && (nextProps.uploadDocumentResponse.status !== 200)) {
      if (nextProps.uploadDocumentResponse.response.message && typeof nextProps.uploadDocumentResponse.response.message === 'string') {
        showPopupAlert(nextProps.uploadDocumentResponse.response.message);
        isUploadDocumentAPI = false;
        return;
      }
      isUploadDocumentAPI = false;
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  manageProfileResponse(nextProps) {
    if (!nextProps.isLoading
      && isCalledUpdateProfileAPI
      && nextProps.userSignupResponse.response
      && nextProps.userSignupResponse.status === 200) {
      isCalledUpdateProfileAPI = false;
      this.props.navigation.state.params.refreshProfileData();
      this.onLeftMenuPress();
      if (nextProps.userSignupResponse.response.message && typeof nextProps.userSignupResponse.response.message === 'string') {
        showPopupAlert(nextProps.userSignupResponse.response.message);
        isCalledUpdateProfileAPI = false;
        return;
      }
      showPopupAlert('You have successfully updated profile.');
      isCalledUpdateProfileAPI = false;
      // const { navigate } = this.props.navigation;
      // navigate('VerifyOTP', { isFromCustomer: this.props.navigation.state.params.isFromCustomer });
      // this.props.resetUserSignupData();
    } else if (!nextProps.isLoading && nextProps.userSignupResponse.response
      && isCalledUpdateProfileAPI
      && (nextProps.userSignupResponse.status !== 200)) {
      if (nextProps.userSignupResponse.response.message && typeof nextProps.userSignupResponse.response.message === 'string') {
        showPopupAlert(nextProps.userSignupResponse.response.message);
        isCalledUpdateProfileAPI = false;

        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
      isCalledUpdateProfileAPI = false;

      // this.props.resetUserSignupData();
    }
  }

  manageOnlineStatusResponse(nextProps) {
    if (!nextProps.isLoading
      && isCalledOnlineAPI
      && nextProps.onlineStatusResponse.response
      && nextProps.onlineStatusResponse.status === 200) {
      isCalledOnlineAPI = false;
      if (nextProps.onlineStatusResponse.response.message && typeof nextProps.onlineStatusResponse.response.message === 'string') {
        showPopupAlert(nextProps.onlineStatusResponse.response.message);
        isCalledOnlineAPI = false;
        new Utils().getItemWithKey('DRIVER_USER_DETAILS', (response) => {
          if (response) {
            response.online_status = onlineStats;
            new Utils().setItemWithKeyAndValue('DRIVER_USER_DETAILS', response);
          }
        });
        return;
      }
      showPopupAlert('You have successfully updated profile.');
      isCalledOnlineAPI = false;
    } else if (!nextProps.isLoading && nextProps.onlineStatusResponse.response
      && isCalledOnlineAPI
      && (nextProps.onlineStatusResponse.status !== 200)) {
      if (nextProps.onlineStatusResponse.response.message && typeof nextProps.onlineStatusResponse.response.message === 'string') {
        showPopupAlert(nextProps.onlineStatusResponse.response.message);
        isCalledOnlineAPI = false;
      this.setState({ switchValue: !this.state.switchValue });
        
        return;
      }
      this.setState({ switchValue: !this.state.switchValue });
      
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
      isCalledOnlineAPI = false;
    }
  }

  toggleSwitch(value) {
    onlineStats = value ? 0 : 1;
    this.setState({ switchValue: !onlineStats }, () => this.updateOnlineStatus());
  }

  updateOnlineStatus() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        isCalledOnlineAPI = true;
        this.props.onlineStatusRequest(driverID, onlineStats);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  onLeftMenuPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  updatePhoneNumber(value) {
    this.setState({ phoneNumber: value });
  }

  updateEmail(value) {
    this.setState({ email: value });
  }

  updatessn(value) {
    this.setState({ ssn: value });
  }

  updatAddress(value) {
    this.setState({ address: value });
  }

  updateState(value) {
    this.setState({ state: value });
  }

  updateCity(value) {
    this.setState({ city: value });
  }

  updateZipcode(value) {
    this.setState({ zipcode: value });
  }

   // #### Take picture and upload image
  takePicture() {
    this.setState({
      isShowImagePopup: true,
    });
  }

  isShowPopupDialog(isShow) {
    this.setState({
      isShowImagePopup: isShow,
    });
  }

  setAvaterSource(uri, multipartBody) {
    if (uri && uri.length > 0 && multipartBody) {
      this.setState({
        imageSource: uri,
        imageMultipartBody: multipartBody,
        hasImage: true,
      }, () => this.uploadDocumentReq());
    } else {
      this.setState({
        imageSource: '',
        imageMultipartBody: multipartBody,
        hasImage: false,
      });
    }
  }

  uploadDocumentReq() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        isUploadDocumentAPI = true;
        this.props.uploadPhotoRequest(this.state.imageMultipartBody, driverID);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  onSignupPress() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        isCalledUpdateProfileAPI = true;
        this.props.updateProfileRequest(driverID,
            this.state.phoneNumber,
            this.state.email,
            this.state.address,
            this.state.pincode,
            this.state.city,
            this.state.state,
            this.state.ssn,
          );
        Keyboard.dismiss();
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  render() {
    let vehicleImg = '';
    if (this.state.imageSource) {
      vehicleImg = { uri: this.state.imageSource };
    } else {
      vehicleImg = Images.profileimg;
    }
    return (
      <View style={{ flex: 1 }}>
        <MyProfile
          onLeftMenuPress={() => this.onLeftMenuPress()}
          takePicture={() => this.takePicture()}
          onSignupPress={() => this.onSignupPress()}
          vehicleImg={vehicleImg}
        
          updateEmail={email => this.updateEmail(email)}
          email={this.state.email}
         
          toggleSwitch={value => this.toggleSwitch(value)}
          switchValue={this.state.switchValue}

          updatePhoneNumber={phoneNumber => this.updatePhoneNumber(phoneNumber)}
          phoneNumber={this.state.phoneNumber}

          updatessn={ssn => this.updatessn(ssn)}
          ssn={this.state.ssn}

          updatAddress={address => this.updatAddress(address)}
          address={this.state.address}

          updateState={state => this.updateState(state)}
          state={this.state.state}

          updateCity={city => this.updateCity(city)}
          city={this.state.city}

          updateZipcode={zipcode => this.updateZipcode(zipcode)}
          zipcode={this.state.zipcode}

          name={userProfileData.name}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
        {
          this.state.isShowImagePopup &&
          <ChooseImagePopup
            isHaveImage={this.state.hasImage}
            isShowPopup={this.state.isShowImagePopup}
            setAvaterSource={(source, multipartBody) =>
              this.setAvaterSource(source, multipartBody)}
            isShowPopupDialog={isShow => this.isShowPopupDialog(isShow)}
          />
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.uploadDocument.isLoading || state.signup.isLoading || state.onlineStatus.isLoading,
  uploadDocumentResponse: state.uploadDocument.uploadDocumentResponse,
  fetchDocumentResponse: state.uploadDocument.fetchDocumentResponse,
  userSignupResponse: state.signup.userSignupResponse,
  onlineStatusResponse: state.onlineStatus.onlineStatusResponse,
});

const mapDispatchToProps = () => UserActions;

const MyProfileViewScreen = connect(mapStateToProps, mapDispatchToProps)(MyProfileView);

export default MyProfileViewScreen;

