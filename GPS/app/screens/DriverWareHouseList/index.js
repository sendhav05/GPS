/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View,} from 'react-native';
import { connect } from 'react-redux';
import call from 'react-native-phone-call';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import WareHouseList from './components/WareHouseList';
import UserActions from '../../actions';
import WareHouseListCell from './components/WareHouseListCell';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';
import { defaultLat, defaultLng } from '../../utils/constants';

let selectedWareHouse = {};
let driverID = '';
let isCalledOnlineAPI = false;
let onlineStats = 0;

class WareHouseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: 0,
      dataArray: [],
      region: {
        latitude: defaultLat,
        longitude: defaultLng,
        latitudeDelta: 0.722,
        longitudeDelta: 0.421,
      },
      markers: [{
        coordinate: { longitude: defaultLng, latitude: defaultLat },
        identifier: '11',
        title: 'Warehouse 1',
        description: 'Warehouse details wiil be here',
      },
      {
        coordinate: { longitude: defaultLng, latitude: defaultLat },
        identifier: '12',
        title: 'Warehouse 2',
        description: 'Warehouse details wiil be here',
      }],
    };
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount() {
    this.fetchCurrentLocation();
    new Utils().getItemWithKey('DRIVER_USER_DETAILS', (response) => {
      if (response) {
        this.setState({ switchValue: Number(response.online_status) });
      }
    });
    const utils = new Utils();
    utils.getDriverID((response) => {
      driverID = response;
    });
  }

  manageOnlineStatusResponse(nextProps) {
    if (!nextProps.isLoading
      && isCalledOnlineAPI
      && nextProps.onlineStatusResponse.response
      && nextProps.onlineStatusResponse.status === 200) {
      isCalledOnlineAPI = false;
      if (nextProps.onlineStatusResponse.response.message && typeof nextProps.onlineStatusResponse.response.message === 'string') {
        showPopupAlert(nextProps.onlineStatusResponse.response.message);
        isCalledOnlineAPI = false;
        new Utils().getItemWithKey('DRIVER_USER_DETAILS', (response) => {
          if (response) {
            response.online_status = onlineStats;
            new Utils().setItemWithKeyAndValue('DRIVER_USER_DETAILS', response);
          }
        });
        return;
      }
      showPopupAlert('You have successfully updated profile.');
      isCalledOnlineAPI = false;
    } else if (!nextProps.isLoading && nextProps.onlineStatusResponse.response
      && isCalledOnlineAPI
      && (nextProps.onlineStatusResponse.status !== 200)) {
      if (nextProps.onlineStatusResponse.response.message && typeof nextProps.onlineStatusResponse.response.message === 'string') {
        showPopupAlert(nextProps.onlineStatusResponse.response.message);
        isCalledOnlineAPI = false;
        this.setState({ switchValue: !this.state.switchValue });
        return;
      }
      this.setState({ switchValue: !this.state.switchValue });
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
      isCalledOnlineAPI = false;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.manageOnlineStatusResponse(nextProps);
    if (!nextProps.isLoading
      && nextProps.driverWareHouseResponse.response
      && nextProps.driverWareHouseResponse.status === 200) {
      // && nextProps.driverWareHouseResponse.response.status === 1) {
      if (nextProps.driverWareHouseResponse.response.data) {
        const arrayDatas = nextProps.driverWareHouseResponse.response.data;
        if (arrayDatas.length > 0) {
          arrayDatas.sort((obj1, obj2) => {
            return obj1.distance - obj2.distance;
          });
        } else {
          showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
        }
        this.setState({ dataArray: arrayDatas });
      } else {
        showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
      }
    } else if (!nextProps.isLoading && nextProps.driverWareHouseResponse.response
      && (nextProps.driverWareHouseResponse.status !== 200
      || nextProps.driverWareHouseResponse.response.status !== 1)) {
      if (nextProps.driverWareHouseResponse.response.message && typeof nextProps.driverWareHouseResponse.response.message === 'string') {
        showPopupAlert(nextProps.driverWareHouseResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  compare(a, b) {
    if (a.distance < b.distance)
      {return -1;}
    if (a.distance > b.distance)
      {return 1;}
    return 0;
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  onCellSelectionPress(selectedItem) {
    const { navigate } = this.props.navigation;
    // navigate('DriverOrder', { selectedWareHouse: selectedItem, lat: this.state.region.latitude, lng: this.state.region.longitude });
    navigate('ReserveOrder', {
      isShowReserveOrderView: true,
      selectedWareHouse: selectedItem,
      lat: this.state.region.latitude,
      lng: this.state.region.longitude,
      refreshData: this.refreshData,
      isCalledRefresh: true,
    });
  }

  onLeftMenuPress() {
    const { navigate } = this.props.navigation;
    navigate('DrawerOpen');
  }

  onCalloutPress(e) {
    const { navigate } = this.props.navigation;
    // navigate('DriverOrder', { selectedWareHouse, lat: this.state.region.latitude, lng: this.state.region.longitude });
    navigate('ReserveOrder', {
      isShowReserveOrderView: true,
      selectedWareHouse,
      lat: this.state.region.latitude,
      lng: this.state.region.longitude,
      refreshData: this.refreshData,
      isCalledRefresh: true,
    });
  }

  onPinPress(e) {
    console.log(e.nativeEvent);
    for (let i = 0; i < this.state.dataArray.length; i += 1) {
      if (this.state.dataArray[i].warehouse_id === e.nativeEvent.id) {
        selectedWareHouse = this.state.dataArray[i].warehouse_id;
      }
    }
  }

  onCallPress(phone) {
    const utils = new Utils();
    utils.onCallPress(phone);
  }

  toggleSwitch(value) {
    onlineStats = value ? 1 : 0;
    this.setState({ switchValue: onlineStats }, () => this.updateOnlineStatus());
  }

  updateOnlineStatus() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        isCalledOnlineAPI = true;
        this.props.onlineStatusRequest(driverID, onlineStats);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  getRenderRow(item) {
    return (
      <WareHouseListCell
        data={item}
        onCellSelectionPress={selectedItem => this.onCellSelectionPress(selectedItem)}
        onCallPress={phone => this.onCallPress(phone)}
      />

    );
  }

  getWareHouseDataFromServer() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        this.props.fetchDriverWarehouseRequest(this.state.region.latitude, this.state.region.longitude);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  fetchCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position.coords.latitude && position.coords.longitude) {
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: this.state.region.latitudeDelta,
          longitudeDelta: this.state.region.longitudeDelta,
        };
        this.setState({ region: data }, () => this.getWareHouseDataFromServer());
      } else {
        showPopupAlert(constant.LOCATION_MESSAGE);
      }
    }, (error) => {
      showPopupAlert(constant.LOCATION_MESSAGE);
    }, {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000,
    });
  }

  refreshData() {
    this.getWareHouseDataFromServer();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WareHouseList
          onLeftMenuPress={() => this.onLeftMenuPress()}
          onCalloutPress={e => this.onCalloutPress(e)}
          onPinPress={e => this.onPinPress(e)}
          getRenderRow={item => this.getRenderRow(item)}
          onRegionChange={region => this.onRegionChange(region)}
          region={this.state.region}
          dataArray={this.state.dataArray}
          markers={this.state.markers}
          toggleSwitch={value => this.toggleSwitch(value)}
          switchValue={this.state.switchValue}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.driverWareHouse.isLoading || state.onlineStatus.isLoading,
  driverWareHouseResponse: state.driverWareHouse.driverWareHouseResponse,
  onlineStatusResponse: state.onlineStatus.onlineStatusResponse,
});

const mapDispatchToProps = () => UserActions;

const WareHouseViewScreen = connect(mapStateToProps, mapDispatchToProps)(WareHouseView);

export default WareHouseViewScreen;

