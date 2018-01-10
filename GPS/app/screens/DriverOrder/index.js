/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import CustomerOrder from './components/CustomerOrder';
import UserActions from '../../actions';
import { connect } from 'react-redux';
import OrderCell from './components/OrderCell';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';

const confirmOrders = [];
let allOrder = [];

class CustomerOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
    };
    this.onAddedOrderItem = this.onAddedOrderItem.bind(this);
  }

  componentDidMount() {
    const navigationParams = this.props.navigation.state.params;
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        this.props.driverOrderListRequest(navigationParams.lat, navigationParams.lng, navigationParams.selectedWareHouseID);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && nextProps.driverOrderListResponse.response
      && nextProps.driverOrderListResponse.status === 200) {
      // && nextProps.driverOrderListResponse.response.status === 1) {
      if (nextProps.driverOrderListResponse.response.data.length > 0) {
        const items = nextProps.driverOrderListResponse.response.data;
        items.map((obj) => {
          obj.isReserved = false;
          return obj;
        });
        for (let i = 0; i < items.length; i++) {
          for (let j = 0; j < confirmOrders.length; j++) {
            if (items[i].id === confirmOrders[j].id) {
              items[i].isReserved = true;
            }
          }
        }
        allOrder = items;
        this.setState({ dataArray: items });
      } else {
        showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
      }
    } else if (!nextProps.isLoading && nextProps.driverOrderListResponse.response
      && (nextProps.driverOrderListResponse.status !== 200
      || nextProps.driverOrderListResponse.response.status !== 1)) {
      if (nextProps.driverOrderListResponse.response.message && typeof nextProps.driverOrderListResponse.response.message === 'string') {
        showPopupAlert(nextProps.driverOrderListResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  onCellSelectionPress(selectedItem) {
    const { navigate } = this.props.navigation;
    navigate('OrderDetail', { selectedOrderItem: selectedItem, onAddedOrderItem: this.onAddedOrderItem });
  }

  onConfirmOrderAddedPress() {
    const { navigate } = this.props.navigation;
    const navigationParams = this.props.navigation.state.params;
    navigate('ReserveOrder', { selectedWareHouseID: navigationParams.selectedWareHouseID, confirmOrders, lat: navigationParams.lat, lng: navigationParams.lng });
  }

  onAddedOrderItem(addedOrderItem) {
    const item = addedOrderItem.addedOrderItem;
    allOrder = this.state.dataArray;

    if (item.isReserved) {
      let index = -1;
      for (let i = 0; i < confirmOrders.length; i++) {
        if (confirmOrders[i].id === item.id) {
          index = i;
        }
      }

      if (index !== -1) {
        confirmOrders.splice(index, 1);
      }
      console.log('******* confirmOrders', confirmOrders);
      for (let i = 0; i < allOrder.length; i++) {
        if (allOrder[i].id === item.id) {
          allOrder[i].isReserved = false;
        }
      }
    } else if (confirmOrders.length < 3) {
      confirmOrders.push(item);
      for (let i = 0; i < allOrder.length; i++) {
        if (allOrder[i].id === item.id) {
          allOrder[i].isReserved = true;
        }
      }
    } else {
      showPopupAlert('You can not add more than 3 orders.');
    }
  }

  onLeftButtonPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  onRightButtonPress() {
    // const { navigate } = this.props.navigation;
    // navigate('OrderDetail');
  }

  getRenderRow(item) {
    return (
      <OrderCell
        data={item}
        onCellSelectionPress={selectedItem => this.onCellSelectionPress(selectedItem)}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomerOrder
          onLeftButtonPress={() => this.onLeftButtonPress()}
          onRightButtonPress={() => this.onRightButtonPress()}
          onConfirmOrderAddedPress={() => this.onConfirmOrderAddedPress()}
          getRenderRow={item => this.getRenderRow(item)}
          dataArray={this.state.dataArray}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.driverOrderList.isLoading,
  driverOrderListResponse: state.driverOrderList.driverOrderListResponse,
});
const mapDispatchToProps = () => UserActions;

const CustomerOrderViewScreen = connect(mapStateToProps, mapDispatchToProps)(CustomerOrderView);

export default CustomerOrderViewScreen;

