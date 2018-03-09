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

let isCalledEarningAPI = false;
let earningData = {};
let amount = '';
let isSelectedTabComplete = false;
let isFromCustomer = false;

class EarningView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
      isFromAccount: false,
      earningData: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && isCalledEarningAPI
      && nextProps.earingResponse.response
      && nextProps.earingResponse.status === 200) {
      isCalledEarningAPI = false;
      earningData = nextProps.earingResponse.response.data;
      amount = earningData.weekly;
      this.setState({ selectedIndex: 1 });
    } else if (!nextProps.isLoading && nextProps.earingResponse.response
      && isCalledEarningAPI
      && (nextProps.earingResponse.status !== 200
      || nextProps.earingResponse.response.status !== 1)) {
      isCalledEarningAPI = false;
      if (nextProps.earingResponse.response.message && typeof nextProps.earingResponse.response.message === 'string') {
        showPopupAlert(nextProps.earingResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  componentDidMount() {
    this.getEarningDetails();
    const utils = new Utils();
    utils.getDriverID((response) => {
      driverID = response;
    });
    if (this.props.navigation.state.params && this.props.navigation.state.params.isFromAccount) {
      this.setState({ isFromAccount: this.props.navigation.state.params.isFromAccount });
    }
  }

  getEarningDetails() {
    const utils = new Utils();
    utils.getDriverID((response) => {
      utils.checkInternetConnectivity((reach) => {
        if (reach && response) {
          isCalledEarningAPI = true;
          this.props.earningDataRequest(response);
        } else {
          showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
        }
      });
    });
  }
  onInviteToFriends() {
    if (earningData.invite_friends_link) {
      Linking.openURL(earningData.invite_friends_link);
    }
  }

  onHistryPress() {
  }

  onDailyPress() {
    amount = earningData.weekly;
    this.setState({ selectedIndex: 1});
  }

  onWeeklyPress() {
    amount = earningData.monthly;
    this.setState({ selectedIndex: 2});
  }

  onMonthlyPress() {
    amount = earningData.yearly;
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
          amount={amount}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.earning.isLoading,
  earingResponse: state.earning.earingResponse,
});

const mapDispatchToProps = () => UserActions;

const EarningViewScreen = connect(mapStateToProps, mapDispatchToProps)(EarningView);

export default EarningViewScreen;

