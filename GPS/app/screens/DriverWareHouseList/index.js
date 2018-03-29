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
import { defaultLat, defaultLng } from '../../../utils/constants';

let selectedWareHouse = {};

class WareHouseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  componentDidMount() {
    this.fetchCurrentLocation();
  }

  componentWillReceiveProps(nextProps) {
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
    console.log('********** data aaa', a, a.distance);
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
    });
  }

  onLeftMenuPress() {
    const { navigate } = this.props.navigation;
    navigate('DrawerOpen');
  }

  onCalloutPress(e) {
    console.log('****', selectedWareHouse);
    const { navigate } = this.props.navigation;
    // navigate('DriverOrder', { selectedWareHouse, lat: this.state.region.latitude, lng: this.state.region.longitude });
    navigate('ReserveOrder', {
      isShowReserveOrderView: true,
      selectedWareHouse,
      lat: this.state.region.latitude,
      lng: this.state.region.longitude,
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
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.driverWareHouse.isLoading,
  driverWareHouseResponse: state.driverWareHouse.driverWareHouseResponse,
});

const mapDispatchToProps = () => UserActions;

const WareHouseViewScreen = connect(mapStateToProps, mapDispatchToProps)(WareHouseView);

export default WareHouseViewScreen;

