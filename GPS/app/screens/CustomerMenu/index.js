/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Image,
  Platform,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import MenuCell from './components/MenuCell';
import UserActions from '../../actions';
import Images from '../../assets/images';
import Utils from '../../utils/utils';

import constants, { BlueColor, OrangeColor, ButtonFontSize, GrayColor, HeaderFontSize, WhiteColor, FontFamilyName } from '../../utils/constants';

const { width, height } = Dimensions.get('window');
const leftPadding = (Platform.OS === 'android') ? 56 : 64;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: WhiteColor,
  },
  logo: {
    marginTop: 50,
    width: 118,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyView: {
    flex: 1,
    marginTop: 90,
    backgroundColor: OrangeColor,
    width: width - leftPadding,
  },
  flatListStyle: {
    flex: 1,
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: OrangeColor,
  },
});

class CustomerMenuView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFromCustomer: true,
      leftMenuItems: [{ icon: Images.home, name: 'Home' },
        { icon: Images.order, name: 'Orders' },
        { icon: Images.logout, name: 'Logout' }],
    };
  }

  componentDidMount() {
    const utils = new Utils();
    utils.isFlowFromCustomer((response) => {
      this.setState({
        isFromCustomer: response,
      }, () => this.refreshData());
    });
  }

  onCellSelectionPress(selectedItem) {
    console.log('********** selectedItem', selectedItem);
    if (this.state.isFromCustomer) {
      this.selectCustomerMenu(selectedItem);
    } else {
      this.selectDriverMenu(selectedItem);
    }
  }

  getRenderRow(item) {
    return (
      <MenuCell
        data={item}
        onCellSelectionPress={selectedItem => this.onCellSelectionPress(selectedItem)}
      />
    );
  }

  selectCustomerMenu(selectedItem) {
    const { navigate } = this.props.navigation;

    if (selectedItem.name === 'Home') {
      navigate('WareHouseList');
    } else if (selectedItem.name === 'Logout') {
      this.logout();
    } else if (selectedItem.name === 'Orders') {
      navigate('CustomerOrder');
    } else if (selectedItem.name === 'Notifications') {
      navigate('Notification');
    }
  }

  selectDriverMenu(selectedItem) {
    const { navigate } = this.props.navigation;

    if (selectedItem.name === 'Home') {
      navigate('DriverWareHouseList');
    } else if (selectedItem.name === 'Logout') {
      this.logout();
    } else if (selectedItem.name === 'Orders') {
      navigate('CustomerOrder');
    } else if (selectedItem.name === 'Notifications') {
      navigate('Notification');
    }
  }

  refreshData() {
    if (this.state.isFromCustomer) {
      this.setState({
        leftMenuItems: [{ icon: Images.home, name: 'Home' },
          { icon: Images.order, name: 'Orders' },
          { icon: Images.notifi, name: 'Notifications' },
          { icon: Images.logout, name: 'Logout' }],
      });
    } else {
      this.setState({
        leftMenuItems: [{ icon: Images.home, name: 'Home' },
          { icon: Images.order, name: 'Orders' },
          { icon: Images.account, name: 'Accounts' },
          { icon: Images.earn, name: 'Earnings' },
          { icon: Images.review, name: 'Performance/Reviews' },
          { icon: Images.notifi, name: 'Notifications' },
          { icon: Images.logout, name: 'Logout' }],
      });
    }
  }


  logout() {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null, // black magic
      actions: [NavigationActions.navigate({ routeName: 'loginStack' })],
    });
    this.props.navigation.dispatch(actionToDispatch);
  }

  render() {
    const type = this.state.isFromCustomer;
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={Images.logo}
        />
        <View style={styles.bodyView}>
          <FlatList
            style={styles.flatListStyle}
            data={this.state.leftMenuItems}
            renderItem={data => this.getRenderRow(data)}
            keyExtractor={item => item.name}
            scrollEnabled={Boolean(!type)}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = () => UserActions;

const CustomerMenuScreen = connect(mapStateToProps, mapDispatchToProps)(CustomerMenuView);

export default CustomerMenuScreen;
