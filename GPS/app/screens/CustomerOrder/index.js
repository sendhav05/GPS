/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../../store';
import runRootSaga from '../../sagas';
import CustomerOrder from './components/CustomerOrder';
import UserActions from '../../actions';
import { connect } from 'react-redux';
import OrderCell from './components/OrderCell';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';

let isCompleteOrderAPI = false;
let isPendingOrderAPI = false;
let pedingOrders = [];
let completeOrders = [];

class CustomerOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    // Pending Orders
    if (!nextProps.isLoading
      && isPendingOrderAPI
      && nextProps.customerPendingOrdersResponse.response
      && nextProps.customerPendingOrdersResponse.status === 200) {
      // && nextProps.customerPendingOrdersResponse.response.status === 1) {
        isPendingOrderAPI = false;
      if (nextProps.customerPendingOrdersResponse
        && nextProps.customerPendingOrdersResponse.response.data) {
        pedingOrders = nextProps.customerPendingOrdersResponse.response.data;
        this.setState({ orderList: nextProps.customerPendingOrdersResponse.response.data });
      } else {
        showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
      }
    } else if (!nextProps.isLoading && nextProps.customerPendingOrdersResponse.response
      && isPendingOrderAPI
      && (nextProps.customerPendingOrdersResponse.status !== 200
      || nextProps.customerPendingOrdersResponse.response.status !== 1)) {
        isPendingOrderAPI = false;
      if (nextProps.customerPendingOrdersResponse.response.message && typeof nextProps.customerPendingOrdersResponse.response.message === 'string') {
        showPopupAlert(nextProps.customerPendingOrdersResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }

    //Complete Orders
    if (!nextProps.isLoading
      && isCompleteOrderAPI
      && nextProps.customerCompleteOrdersResponse.response
      && nextProps.customerCompleteOrdersResponse.status === 200) {
      // && nextProps.customerCompleteOrdersResponse.response.status === 1) {
        isCompleteOrderAPI = false;
      if (nextProps.customerCompleteOrdersResponse
        && nextProps.customerCompleteOrdersResponse.response.data) {
        completeOrders = nextProps.customerCompleteOrdersResponse.response.data;
      } else {
        showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
      }
    } else if (!nextProps.isLoading && nextProps.customerCompleteOrdersResponse.response
      && isCompleteOrderAPI
      && (nextProps.customerCompleteOrdersResponse.status !== 200
      || nextProps.customerCompleteOrdersResponse.response.status !== 1)) {
        isCompleteOrderAPI = false;
      if (nextProps.customerCompleteOrdersResponse.response.message && typeof nextProps.customerCompleteOrdersResponse.response.message === 'string') {
        showPopupAlert(nextProps.customerCompleteOrdersResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  componentDidMount() {
    const utils = new Utils();
    utils.getCustomerid((response) => {
      utils.checkInternetConnectivity((reach) => {
        if (reach && response) {
          isPendingOrderAPI = true;
          isCompleteOrderAPI = true;
          this.props.cutomerPendingOrdersRequest(response);
          this.props.cutomerCompleteOrdersRequest(response);
        } else {
          showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
        }
      });
    });
  }

  onCellSelectionPress(selectedItem) {
    console.log('********** selectedItem', selectedItem);
    const { navigate } = this.props.navigation;
    navigate('CustomerOrderStatus');
  }

  onPendingOrderPress() {
    console.log('********** selectedItem');
    this.setState({ orderList: pedingOrders });
  }

  onCompletedOrderPres() {
    console.log('********** selectedItem');
    this.setState({ orderList: completeOrders });
  }

  onLeftMenuPress() {
    const { navigate } = this.props.navigation;
    navigate('DrawerOpen');
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
          onLeftMenuPress={() => this.onLeftMenuPress()}
          onPendingOrderPress={() => this.onPendingOrderPress()}
          onCompletedOrderPres={() => this.onCompletedOrderPres()}
          getRenderRow={item => this.getRenderRow(item)}
          leftMenuItems={this.state.orderList}
        />
      {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.customerOrderStatus.isLoading,
  customerPendingOrdersResponse: state.customerOrderStatus.customerPendingOrdersResponse,
  customerCompleteOrdersResponse: state.customerOrderStatus.customerCompleteOrdersResponse,
});

const mapDispatchToProps = () => UserActions;

const CustomerOrderViewScreen = connect(mapStateToProps, mapDispatchToProps)(CustomerOrderView);

export default CustomerOrderViewScreen;

