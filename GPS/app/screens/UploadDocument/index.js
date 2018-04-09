/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* eslint-disable react/sort-comp, react/prop-types */

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';
import ChooseImagePopup from '../../components/ChooseImagePopup';
import Utils from '../../utils/utils';
import { NavigationActions } from 'react-navigation';
import DriverDocument from './components/DriverDocument';
import UserActions from '../../actions';
import Images from '../../assets/images';

let currentDocIndex = -1;
let driverID = -1;
let nameOfDocument = '';
let isUploadDocumentAPI = false;
let isCalledFetchDocAPI = false
class DriverDocumentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowImagePopup: false,
      dlImageSource: '',
      sslImageSource: '',
      addressImageSource: '',
      imageMultipartBody: {},
      hasImage: false,
      docData: [],
    };
  }

  componentDidMount() {
    const utils = new Utils();
    utils.getDriverID((response) => {
      driverID = response;
    });
    this.getDriverDocDetails();
  }

  getDriverDocDetails() {
    const utils = new Utils();
    utils.getDriverID((response) => {
      utils.checkInternetConnectivity((reach) => {
        if (reach && response) {
          isCalledFetchDocAPI = true;
          this.props.fetchDriverDocRequest(response);
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
      && nextProps.fetchDocumentResponse.response
      && nextProps.fetchDocumentResponse.status === 200) {
      if (nextProps.fetchDocumentResponse.response.data && nextProps.fetchDocumentResponse.response.data.document_data) {
        isCalledFetchDocAPI = false;
        //this.setState({ docData: nextProps.fetchDocumentResponse.response.data.document_data })
        const docs = nextProps.fetchDocumentResponse.response.data.document_data;
        const path = nextProps.fetchDocumentResponse.response.data.imagepath;
        console.log('************ data', nextProps.fetchDocumentResponse.response);
         for (let i = 0; i < docs.length; i++) {
            const object = docs[i];
            if (object.document_name === 'CertificateOfRegistration') {
               const imgurl = `${path}/${object.document}`
               this.setState({ addressImageSource: imgurl });
            } else if (object.document_name === 'Insurance') {
              const imgurl = `${path}/${object.document}`
              this.setState({ sslImageSource: imgurl });
            } else if (object.document_name === 'DriverLicense') {
              const imgurl = `${path}/${object.document}`
              this.setState({ dlImageSource: imgurl });
            } 
          }
        return;
      }
      isCalledFetchDocAPI = false;
    } else if (!nextProps.isLoading && nextProps.fetchDocumentResponse.response
      && isCalledFetchDocAPI
      && (nextProps.fetchDocumentResponse.status !== 200)) {
      if (nextProps.fetchDocumentResponse.response.message && typeof nextProps.fetchDocumentResponse.response.message === 'string') {
        showPopupAlert(nextProps.fetchDocumentResponse.response.message);
        isCalledFetchDocAPI = false;
        return;
      }
      isCalledFetchDocAPI = false;
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
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
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        key: null, // black magic
        actions: [NavigationActions.navigate({ routeName: 'driverStack' })],
      });
      this.props.navigation.dispatch(actionToDispatch);
    }
  }

  onResendOTPPress() {
    const { navigate } = this.props.navigation;
    navigate('UploadDocument');
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  // #### Take picture and upload image
  takePicture(index) {
    currentDocIndex = index;
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
    console.log('******** uri', uri, multipartBody);
    if (currentDocIndex === 0) {
      nameOfDocument = 'DriverLicense';
      if (uri && uri.length > 0 && multipartBody) {
        this.setState({
          dlImageSource: uri,
          imageMultipartBody: multipartBody,
          hasImage: true,
        }, () => this.uploadDocumentReq());
      } else {
        this.setState({
          dlImageSource: '',
          imageMultipartBody: multipartBody,
          hasImage: false,
        });
      }
    } else if (currentDocIndex === 1) {
      nameOfDocument = 'Insurance';
      if (uri && uri.length > 0 && multipartBody) {
        this.setState({
          sslImageSource: uri,
          imageMultipartBody: multipartBody,
          hasImage: true,
        }, () => this.uploadDocumentReq());
      } else {
        this.setState({
          sslImageSource: '',
          imageMultipartBody: multipartBody,
          hasImage: false,
        });
      }
    } if (currentDocIndex === 2) {
      nameOfDocument = 'CertificateOfRegistration';
      if (uri && uri.length > 0 && multipartBody) {
        this.setState({
          addressImageSource: uri,
          imageMultipartBody: multipartBody,
          hasImage: true,
        }, () => this.uploadDocumentReq());
      } else {
        this.setState({
          addressImageSource: '',
          imageMultipartBody: multipartBody,
          hasImage: false,
        });
      }
    }
  }

  uploadDocumentReq() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        isUploadDocumentAPI = true;
        this.props.uploadDocumentRequest(this.state.imageMultipartBody, driverID, 'image', nameOfDocument);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  render() {
    let dlImage = '';
    let sslImage = '';
    let rcImage = '';
    if (this.state.dlImageSource) {
      dlImage = { uri: this.state.dlImageSource };
    } else {
      dlImage = Images.documenticon;
    }
    
    if (this.state.sslImageSource) {
      sslImage = { uri: this.state.sslImageSource };
    } else {
      sslImage = Images.documenticon;
    }
    
    if (this.state.addressImageSource) {
      rcImage = { uri: this.state.addressImageSource };
    } else {
      rcImage = Images.documenticon;
    }


    return (
      <View style={{ flex: 1 }}>
        <DriverDocument
          onBacnkPress={() => this.onBacnkPress()}
          dlImage={dlImage}
          sslImage={sslImage}
          rcImage={rcImage}
          takePicture={index => this.takePicture(index)}
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
  isLoading: state.uploadDocument.isLoading,
  uploadDocumentResponse: state.uploadDocument.uploadDocumentResponse,
  fetchDocumentResponse: state.uploadDocument.fetchDocumentResponse,
});

const mapDispatchToProps = () => UserActions;

const DriverDocumentViewScreen = connect(mapStateToProps, mapDispatchToProps)(DriverDocumentView);

export default DriverDocumentViewScreen;
