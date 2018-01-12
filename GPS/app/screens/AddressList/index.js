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
import AddressList from './components/AddressList';
import UserActions from '../../actions';
import AddressListCell from './components/AddressListCell';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';

let selectedAddress = {};

class AddressListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      isUpdate: false,
    };
  }

  componentDidMount() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        this.props.addressListRequest(this.props.navigation.state.params.customerid);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && nextProps.addressListResponse.response
      && nextProps.addressListResponse.status === 200) {
      // && nextProps.addressListResponse.response.status === 1) {
      if (nextProps.addressListResponse.response.data.length > 0) {
        const items = nextProps.addressListResponse.response.data;
        items.map((obj) => {
          obj.isSelected = false;
          return obj;
        });
        console.log('$$$$$$ 1 ', this.props.navigation.state.params.selectedAddress);

        if (this.props.navigation.state.params.selectedAddress.delivery_id) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].delivery_id === this.props.navigation.state.params.selectedAddress.delivery_id) {
              items[i].isSelected = true;
            }
          }
        }
        this.setState({ dataArray: items });
      } else {
        showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
      }
    } else if (!nextProps.isLoading && nextProps.addressListResponse.response
      && (nextProps.addressListResponse.status !== 200
      || nextProps.addressListResponse.response.status !== 1)) {
      if (nextProps.addressListResponse.response.message && typeof nextProps.addressListResponse.response.message === 'string') {
        showPopupAlert(nextProps.addressListResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  onCellSelectionPress(selectedItem) {
    selectedAddress = selectedItem;
    console.log('*****  1 ', selectedAddress);

    const someArray = this.state.dataArray;
    const allAddList = someArray.slice(0);
    allAddList.map((obj) => {
      obj.isSelected = false;
      return obj;
    });
    for (let i = 0; i < allAddList.length; i++) {
      if (allAddList[i].delivery_id === selectedItem.delivery_id) {
        allAddList[i].isSelected = true;
      }
    }
    this.setState({ dataArray: allAddList });
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
    console.log('*****  2 ', selectedAddress);

    this.props.navigation.state.params.onSelectAddress({ selectedAddress });
  }

  getRenderRow(item) {
    return (
      <AddressListCell
        data={item}
        onCellSelectionPress={selectedItem => this.onCellSelectionPress(selectedItem)}
      />

    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AddressList
          onBacnkPress={() => this.onBacnkPress()}
          getRenderRow={item => this.getRenderRow(item)}
          dataArray={this.state.dataArray}
          isUpdate={this.state.isUpdate}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.addressList.isLoading,
  addressListResponse: state.addressList.addressListResponse,
});

const mapDispatchToProps = () => UserActions;

const AddressListViewScreen = connect(mapStateToProps, mapDispatchToProps)(AddressListView);

export default AddressListViewScreen;

