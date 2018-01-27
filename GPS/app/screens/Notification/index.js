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
import NotificationList from './components/NotificationList';
import UserActions from '../../actions';
import NotificationCell from './components/NotificationCell';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';

class NotificationListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
    };
  }

  componentDidMount() {
    const utils = new Utils();
    utils.getCustomerid((response) => {
      utils.checkInternetConnectivity((reach) => {
        if (reach && response) {
          this.props.notificationListRequest(response);
        } else {
          showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
        }
      });
    });
  }

  componentWillReceiveProps(nextProps) {

    if (!nextProps.isLoading
      && nextProps.notificationListResponse.response
      && nextProps.notificationListResponse.status === 200) {
      // && nextProps.notificationListResponse.response.status === 1) {
      if (nextProps.notificationListResponse.response.data.length > 0) {
        this.setState({ dataArray: nextProps.notificationListResponse.response.data });
      } else {
        showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
      }
    } else if (!nextProps.isLoading && nextProps.notificationListResponse.response
      && (nextProps.notificationListResponse.status !== 200
      || nextProps.notificationListResponse.response.status !== 1)) {
      if (nextProps.notificationListResponse.response.message && typeof nextProps.notificationListResponse.response.message === 'string') {
        showPopupAlert(nextProps.notificationListResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  onCellSelectionPress(selectedItem) {
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
        <NotificationList
          onLeftMenuPress={() => this.onLeftMenuPress()}
          getRenderRow={item => this.getRenderRow(item)}
          dataArray={this.state.dataArray}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.notification.isLoading,
  notificationListResponse: state.notification.notificationListResponse,
});

const mapDispatchToProps = () => UserActions;

const NotificationListScreen = connect(mapStateToProps, mapDispatchToProps)(NotificationListView);

export default NotificationListScreen;

