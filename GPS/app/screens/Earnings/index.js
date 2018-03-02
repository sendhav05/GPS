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
import Earning from './components/Earning';
import UserActions from '../../actions';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';

let isCompleteOrderAPI = false;
let isPendingOrderAPI = false;
let pedingOrders = [];
let completeOrders = [];
let isSelectedTabComplete = false;
let isFromCustomer = false;

class EarningView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
      isFromAccount: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // Pending Orders
    // if (!nextProps.isLoading
    //   && isPendingOrderAPI
    //   && nextProps.customerPendingOrdersResponse.response
    //   && nextProps.customerPendingOrdersResponse.status === 200) {
    //   // && nextProps.customerPendingOrdersResponse.response.status === 1) {
    //   isPendingOrderAPI = false;
    //   if (nextProps.customerPendingOrdersResponse
    //     && nextProps.customerPendingOrdersResponse.response.data) {
    //     pedingOrders = nextProps.customerPendingOrdersResponse.response.data;
    //     this.setState({ orderList: nextProps.customerPendingOrdersResponse.response.data });
    //   } else {
    //     showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
    //   }
    // } else if (!nextProps.isLoading && nextProps.customerPendingOrdersResponse.response
    //   && isPendingOrderAPI
    //   && (nextProps.customerPendingOrdersResponse.status !== 200
    //   || nextProps.customerPendingOrdersResponse.response.status !== 1)) {
    //   isPendingOrderAPI = false;
    //   if (nextProps.customerPendingOrdersResponse.response.message && typeof nextProps.customerPendingOrdersResponse.response.message === 'string') {
    //     showPopupAlert(nextProps.customerPendingOrdersResponse.response.message);
    //     return;
    //   }
    //   showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    // }
  }

  componentDidMount() {
    if (this.props.navigation.state.params && this.props.navigation.state.params.isFromAccount) {
      this.setState({ isFromAccount: this.props.navigation.state.params.isFromAccount });
    }
    // const utils = new Utils();
    // utils.isFlowFromCustomer((response) => {
    //   if (response) {
    //     isFromCustomer = true;
    //     this.getCustomerDetails();
    //   } 
    // });
  }

  getCustomerDetails() {
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
  onInviteToFriends() {
    Linking.openURL('https://www.google.co.in/');
  }

  onHistryPress() {
  }

  onDailyPress() {
    this.setState({ selectedIndex: 1});
  }

  onWeeklyPress() {
    this.setState({ selectedIndex: 2});
  }

  onMonthlyPress() {
    this.setState({ selectedIndex: 3});
  }

  onLeftMenuPress() {
    if (this.state.isFromAccount) {
      const { goBack } = this.props.navigation;
      goBack(null);
    } else {
      const { navigate } = this.props.navigation;
      navigate('DrawerOpen');
    }
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <Earning
          onLeftMenuPress={() => this.onLeftMenuPress()}
          onInviteToFriends={() => this.onInviteToFriends()}
          onHistryPress={() => this.onHistryPress()}
          onDailyPress={() => this.onDailyPress()}
          onWeeklyPress={() => this.onWeeklyPress()}
          onMonthlyPress={() => this.onMonthlyPress()}
          getRenderRow={item => this.getRenderRow(item)}
          selectedIndex={this.state.selectedIndex}
          isFromAccount={this.state.isFromAccount}
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

const EarningViewScreen = connect(mapStateToProps, mapDispatchToProps)(EarningView);

export default EarningViewScreen;

