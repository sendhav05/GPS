/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import runRootSaga from '../../sagas';
import CustomerOrder from './components/CustomerOrder';
import UserActions from '../../actions';
import { connect } from 'react-redux';
import OrderCell from './components/OrderCell';

class CustomerOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftMenuItems: [{ time: '04:00 PM', name: 'Mr. Sham', address: '12, 3rt floor rajagi salai, Kanchipuram' },
        { time: '04:00 PM', name: 'Mr. Raheja', address: '12, 3rt floor rajagi salai, Kanchipuram' },
        { time: '04:00 PM', name: 'Mr. Jhon', address: '12, 3rt floor rajagi salai, Kanchipuram' },
        { time: '04:00 PM', name: 'Mr. Kumar', address: '12, 3rt floor rajagi salai, Kanchipuram' }],
    };
  }

  componentWillReceiveProps(nextProps) {

  }

  onCellSelectionPress(selectedItem) {
    console.log('********** selectedItem', selectedItem);
  }

  onPendingOrderPress() {
    console.log('********** selectedItem');
  }

  onCompletedOrderPres() {
    console.log('********** selectedItem');
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
      <CustomerOrder
        onLeftMenuPress={() => this.onLeftMenuPress()}
        onPendingOrderPress={() => this.onPendingOrderPress()}
        onCompletedOrderPres={() => this.onCompletedOrderPres()}
        getRenderRow={item => this.getRenderRow(item)}
        leftMenuItems={this.state.leftMenuItems}
      />
    );
  }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = () => UserActions;

const CustomerOrderViewScreen = connect(mapStateToProps, mapDispatchToProps)(CustomerOrderView);

export default CustomerOrderViewScreen;

