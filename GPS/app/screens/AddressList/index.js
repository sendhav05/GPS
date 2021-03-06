/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* eslint-disable react/sort-comp, react/prop-types */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import AddressList from './components/AddressList';
import UserActions from '../../actions';
import AddressListCell from './components/AddressListCell';
import SelectedAddressListCell from './components/SelectedAddressListCell';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';

let selectedAddress = {};
let customerid = '';
let isLoadFirstTime = true;

class AddressListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      isUpdate: false,
    };
    this.onAddAddress = this.onAddAddress.bind(this);
  }

  componentDidMount() {
    customerid = this.props.navigation.state.params.customerid;
    this.reloadAddressData();
  }

  componentWillReceiveProps(nextProps) {
    this.handleDeleteAddressData(nextProps);
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
        this.setState({ dataArray: [] });
        if (isLoadFirstTime) {
          showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
          isLoadFirstTime = false;
        }
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

  handleDeleteAddressData(nextProps) {
    if (!nextProps.isLoading
      && nextProps.deleteAddressListResponse.response
      && nextProps.deleteAddressListResponse.status === 200) {
      // && nextProps.deleteAddressListResponse.response.status === 1) {
      if (nextProps.deleteAddressListResponse.response.message && typeof nextProps.deleteAddressListResponse.response.message === 'string') {
        showPopupAlert(nextProps.deleteAddressListResponse.response.message);
        this.props.resetAddressData();
        this.reloadAddressData();
        return;
      }
      showPopupAlert('Your order send successfully.');
      const { goBack } = this.props.navigation;
      goBack(null);
    } else if (!nextProps.isLoading && nextProps.deleteAddressListResponse.response
      && (nextProps.deleteAddressListResponse.status !== 200
      || nextProps.deleteAddressListResponse.response.status !== 1)) {
      if (nextProps.deleteAddressListResponse.response.message && typeof nextProps.deleteAddressListResponse.response.message === 'string') {
        showPopupAlert(nextProps.deleteAddressListResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  reloadAddressData() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        this.props.addressListRequest(this.props.navigation.state.params.customerid);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  onCellSelectionPress(selectedItem) {
    selectedAddress = selectedItem;

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
    this.props.navigation.state.params.onSelectAddress({ selectedAddress });
  }

  onEditPress(selectedItem) {
    const { navigate } = this.props.navigation;
    navigate('ChooseAddress', { customerid: this.props.navigation.state.params.customerid, onAddAddress: this.onAddAddress, isEdit: true, selectedAddress });
  }

  onDeletePress(selectedItem) {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        this.props.deleteAddressListRequest(selectedItem.delivery_id);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  onAddAddress() {
    this.props.addressListRequest(customerid);
  }

  onAddNewAddressPress() {
    const { navigate } = this.props.navigation;
    navigate('ChooseAddress', { customerid: this.props.navigation.state.params.customerid, onAddAddress: this.onAddAddress });
  }

  getRenderRow(item) {
    if (!item.item.isSelected) {
      return (
        <AddressListCell
          data={item}
          onCellSelectionPress={selectedItem => this.onCellSelectionPress(selectedItem)}
          onBacnkPress={() => this.onBacnkPress()}
          onEditPress={selectedItem => this.onEditPress(selectedItem)}
          onDeletePress={selectedItem => this.onDeletePress(selectedItem)}
        />

      );
    }
    return (
      <SelectedAddressListCell
        data={item}
        onCellSelectionPress={selectedItem => this.onCellSelectionPress(selectedItem)}
        onBacnkPress={() => this.onBacnkPress()}
        onEditPress={selectedItem => this.onEditPress(selectedItem)}
        onDeletePress={selectedItem => this.onDeletePress(selectedItem)}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AddressList
          onBacnkPress={() => this.onBacnkPress()}
          onAddNewAddressPress={() => this.onAddNewAddressPress()}
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
  deleteAddressListResponse: state.addressList.deleteAddressListResponse,
});

const mapDispatchToProps = () => UserActions;

const AddressListViewScreen = connect(mapStateToProps, mapDispatchToProps)(AddressListView);

export default AddressListViewScreen;

