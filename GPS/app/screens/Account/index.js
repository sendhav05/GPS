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
import Account from './components/Account';
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
let title = 'Help';

class AccountView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
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

  onHelpPress() {
    title = 'Help';
    this.setState({ selectedIndex: 1});
  }

  onDocumentPress() {
    title = 'Document';
    this.setState({ selectedIndex: 2});
    const { navigate } = this.props.navigation;
    navigate('UploadDocument');
  }

  onEarningPress() {
    title = 'Earnings';
    this.setState({ selectedIndex: 3});
    const { navigate } = this.props.navigation;
    navigate('Earning', { isFromAccount: true });
  }

  onSettingPress() {
    title = 'Settings';
    this.setState({ selectedIndex: 4});
  }

  onLeftMenuPress() {
    const { navigate } = this.props.navigation;
    navigate('DrawerOpen');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Account
          onLeftMenuPress={() => this.onLeftMenuPress()}
          onHelpPress={() => this.onHelpPress()}
          onDocumentPress={() => this.onDocumentPress()}
          onEarningPress={() => this.onEarningPress()}
          onSettingPress={() => this.onSettingPress()}
          selectedIndex={this.state.selectedIndex}
          title={title}
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

const AccountViewScreen = connect(mapStateToProps, mapDispatchToProps)(AccountView);

export default AccountViewScreen;

