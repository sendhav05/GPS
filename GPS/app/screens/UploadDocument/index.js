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
    };
  }

  componentWillReceiveProps(nextProps) {

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
      if (uri && uri.length > 0 && multipartBody) {
        this.setState({
          dlImageSource: uri,
          imageMultipartBody: multipartBody,
          hasImage: true,
        });
      } else {
        this.setState({
          dlImageSource: '',
          imageMultipartBody: multipartBody,
          hasImage: false,
        });
      }
    } else if (currentDocIndex === 1) {
      if (uri && uri.length > 0 && multipartBody) {
        this.setState({
          sslImageSource: uri,
          imageMultipartBody: multipartBody,
          hasImage: true,
        });
      } else {
        this.setState({
          sslImageSource: '',
          imageMultipartBody: multipartBody,
          hasImage: false,
        });
      }
    } if (currentDocIndex === 2) {
      if (uri && uri.length > 0 && multipartBody) {
        this.setState({
          addressImageSource: uri,
          imageMultipartBody: multipartBody,
          hasImage: true,
        });
      } else {
        this.setState({
          addressImageSource: '',
          imageMultipartBody: multipartBody,
          hasImage: false,
        });
      }
    }
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
});

const mapDispatchToProps = () => UserActions;

const DriverDocumentViewScreen = connect(mapStateToProps, mapDispatchToProps)(DriverDocumentView);

export default DriverDocumentViewScreen;
