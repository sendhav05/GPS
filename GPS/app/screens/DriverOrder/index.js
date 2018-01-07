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

class CustomerOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
    };
  }

  componentDidMount() {
    const navigationParams = this.props.navigation.state.params;
    const utils = new Utils();
    console.log('********** nav', navigationParams.lat);

    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        this.props.driverOrderListRequest(navigationParams.lat, navigationParams.lng, navigationParams.selectedWareHouseID);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('********** nextProps.driverOrderListResponse', nextProps.driverOrderListResponse);

    if (!nextProps.isLoading
      && nextProps.driverOrderListResponse.response
      && nextProps.driverOrderListResponse.status === 200) {
      // && nextProps.driverOrderListResponse.response.status === 1) {
      if (nextProps.driverOrderListResponse.response.data.length > 0) {
        this.setState({ dataArray: nextProps.driverOrderListResponse.response.data });
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
    console.log('********** selectedItem', selectedItem);
    const { navigate } = this.props.navigation;
    navigate('OrderDetail', { selectedOrderItem: selectedItem });
  }

  onConfirmOrderAddedPress() {
    console.log('********** selectedItem');
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

