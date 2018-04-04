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
} from 'react-native';
import { connect } from 'react-redux';
import Settings from './components/Settings';
import UserActions from '../../actions';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import ChooseImagePopup from '../../components/ChooseImagePopup';
import Images from '../../assets/images';

let isUploadDocumentAPI = false;
let isCalledFetchDocAPI = false;
let driverID = '';
let profileData = {};

class SettingsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
      isFromAccount: false,
      isShowImagePopup: false,
      imageSource: '',
      imageMultipartBody: {},
      hasImage: false,
    };
    this.refreshProfileData = this.refreshProfileData.bind(this);
  }

  componentDidMount() {
    const utils = new Utils();
    utils.getDriverID((response) => {
      driverID = response;
    });
   this.getProfileDetails();
   if (this.props.navigation.state.params && this.props.navigation.state.params.isFromAccount) {
    this.setState({ isFromAccount: this.props.navigation.state.params.isFromAccount });
    }
  }

  getProfileDetails() {
    const utils = new Utils();
    utils.getDriverID((response) => {
      utils.checkInternetConnectivity((reach) => {
        if (reach && response) {
          isCalledFetchDocAPI = true;
          this.props.fetchProfileRequest(response);
        } else {
          showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
        }
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.manageDocResponse(nextProps);
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

  manageDocResponse(nextProps) {
    if (!nextProps.isLoading
      && isCalledFetchDocAPI
      && nextProps.fetchProfileResponse.response
      && nextProps.fetchProfileResponse.status === 200) {
      if (nextProps.fetchProfileResponse.response.data) {
        isCalledFetchDocAPI = false;
        profileData = nextProps.fetchProfileResponse.response.data;
        const path = profileData.vehicle_image_path;
        if (profileData.vehicle_image) {
          const imgurl = `${path}/${profileData.vehicle_image}`
          this.setState({ imageSource: imgurl });
        }
        return;
      }
      isCalledFetchDocAPI = false;
    } else if (!nextProps.isLoading && nextProps.fetchProfileResponse.response
      && isCalledFetchDocAPI
      && (nextProps.fetchProfileResponse.status !== 200)) {
      if (nextProps.fetchProfileResponse.response.message && typeof nextProps.fetchProfileResponse.response.message === 'string') {
        showPopupAlert(nextProps.fetchProfileResponse.response.message);
        isCalledFetchDocAPI = false;
        return;
      }
      isCalledFetchDocAPI = false;
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }
  refreshProfileData() {
    this.getProfileDetails();
  }

  onInviteToFriends() {
    const { navigate } = this.props.navigation;
    navigate('MyProfile', { profileData, refreshProfileData: this.refreshProfileData });
  }

  onHistryPress() {
    const { navigate } = this.props.navigation;
    navigate('Review', { isShowBackButton: true});
  }

  onLeftMenuPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
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
        this.props.uploadVehiclePhotoRequest(this.state.imageMultipartBody, driverID);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  render() {
    let vehicleImg = '';
    if (this.state.imageSource) {
      vehicleImg = { uri: this.state.imageSource };
//      vehicleImg = Images.vlogo;

    } else {
      vehicleImg = Images.vlogo;
    }
    return (
      <View style={{ flex: 1 }}>
        <Settings
          onLeftMenuPress={() => this.onLeftMenuPress()}
          onInviteToFriends={() => this.onInviteToFriends()}
          onHistryPress={() => this.onHistryPress()}
          takePicture={() => this.takePicture()}
          vehicleImg={vehicleImg}
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
  isLoading: state.uploadDocument.isLoading || state.fetchProfile.isLoading,
  uploadDocumentResponse: state.uploadDocument.uploadDocumentResponse,
  fetchProfileResponse: state.fetchProfile.fetchProfileResponse,
});

const mapDispatchToProps = () => UserActions;

const SettingsViewScreen = connect(mapStateToProps, mapDispatchToProps)(SettingsView);

export default SettingsViewScreen;

