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

let isShowBackButton = false;

class NotificationListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
    };
  }

  componentDidMount() {
    isShowBackButton = this.props.navigation.state.params.isShowBackButton;
    const utils = new Utils();
    utils.getDriverID((response) => {
      utils.checkInternetConnectivity((reach) => {
        if (reach && response) {
          this.props.driverReviewRequest('60');
        } else {
          showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
        }
      });
    });
  }

  componentWillReceiveProps(nextProps) {

    if (!nextProps.isLoading
      && nextProps.reviewResponse.response
      && nextProps.reviewResponse.status === 200) {
      // && nextProps.reviewResponse.response.status === 1) {
      if (nextProps.reviewResponse.response.data.length > 0) {
        this.setState({ dataArray: nextProps.reviewResponse.response.data });
      } else {
        showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
      }
    } else if (!nextProps.isLoading && nextProps.reviewResponse.response
      && (nextProps.reviewResponse.status !== 200
      || nextProps.reviewResponse.response.status !== 1)) {
      if (nextProps.reviewResponse.response.message && typeof nextProps.reviewResponse.response.message === 'string') {
        showPopupAlert(nextProps.reviewResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  onCellSelectionPress(selectedItem) {
   }

  onLeftMenuPress() {
    if (isShowBackButton) {
      const { goBack } = this.props.navigation;
      goBack(null);
    } else {
      const { navigate } = this.props.navigation;
      navigate('DrawerOpen');
    }
  }

  getRenderRow(item) {
    const starCount = Number(item.item.rating);
    return (
      <NotificationCell
        data={item}
        starCount={starCount}
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
          isShowBackButton={isShowBackButton}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.review.isLoading,
  reviewResponse: state.review.reviewResponse,
});

const mapDispatchToProps = () => UserActions;

const NotificationListScreen = connect(mapStateToProps, mapDispatchToProps)(NotificationListView);

export default NotificationListScreen;

