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
import NotificationCell from './components/NotificationCell';

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
      dataArray: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && nextProps.helpResponse.response
      && nextProps.helpResponse.status === 200) {
      // && nextProps.helpResponse.response.status === 1) {
      if (nextProps.helpResponse.response.data && nextProps.helpResponse.response.data.help.length > 0) {
        this.setState({ dataArray: nextProps.helpResponse.response.data.help });
      } else {
        showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
      }
    } else if (!nextProps.isLoading && nextProps.helpResponse.response
      && (nextProps.helpResponse.status !== 200
      || nextProps.helpResponse.response.status !== 1)) {
      if (nextProps.helpResponse.response.message && typeof nextProps.helpResponse.response.message === 'string') {
        showPopupAlert(nextProps.helpResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  componentDidMount() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        this.props.helpRequest();
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  onHelpPress() {
    title = 'Help';
    this.setState({ selectedIndex: 1});
  }

  onDocumentPress() {
    title = 'Document';
   // this.setState({ selectedIndex: 2});
    const { navigate } = this.props.navigation;
    navigate('UploadDocument');
  }

  onEarningPress() {
    title = 'Earnings';
   // this.setState({ selectedIndex: 3});
    const { navigate } = this.props.navigation;
    navigate('Earnings', { isFromAccount: true });
  }

  onSettingPress() {
    title = 'Settings';
  //  this.setState({ selectedIndex: 4});
    const { navigate } = this.props.navigation;
    navigate('Settings');
  }

  onLeftMenuPress() {
    const { navigate } = this.props.navigation;
    navigate('DrawerOpen');
  }

  getRenderRow(item) {
    return (
      <NotificationCell
        data={item}
        onCellSelectionPress={selectedItem => this.onCellSelectionPress(selectedItem)}
      />

    );
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
          getRenderRow={item => this.getRenderRow(item)}
          dataArray={this.state.dataArray}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.help.isLoading,
  helpResponse: state.help.helpResponse,
});

const mapDispatchToProps = () => UserActions;

const AccountViewScreen = connect(mapStateToProps, mapDispatchToProps)(AccountView);

export default AccountViewScreen;

