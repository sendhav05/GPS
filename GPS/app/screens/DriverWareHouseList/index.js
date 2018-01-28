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
import NavigationExperimental from 'react-native-deprecated-custom-components';
import WareHouseList from './components/WareHouseList';
import UserActions from '../../actions';
import WareHouseListCell from './components/WareHouseListCell';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';
import call from 'react-native-phone-call'

let selectedWareHouseID = '';

class WareHouseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      region: {
        latitude: 22.862824,
        longitude: 75.881695,
        latitudeDelta: 0.722,
        longitudeDelta: 0.421,
      },
      markers: [{
        coordinate: { longitude: 75.881695, latitude: 22.862824 },
        identifier: '11',
        title: 'Warehouse 1',
        description: 'Warehouse details wiil be here',
      },
      {
        coordinate: { longitude: 75.965795, latitude: 22.736884 },
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
      if (nextProps.driverWareHouseResponse.response.data.length > 0) {
        let arrayDatas = nextProps.driverWareHouseResponse.response.data;
        if (arrayDatas.length > 0) {
          arrayDatas.sort(function(obj1, obj2) {
            return obj1.distance - obj2.distance;
          });
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

  compare(a,b) {
    console.log('********** data aaa', a, a.distance);
    if (a.distance < b.distance)
      return -1;
    if (a.distance > b.distance)
      return 1;
    return 0;
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  onCellSelectionPress(selectedItem) {
    console.log('**** selectedWareHouseID', selectedWareHouseID);

    const { navigate } = this.props.navigation;
    navigate('DriverOrder', { selectedWareHouseID: selectedItem.warehouse_id, lat: this.state.region.latitude, lng: this.state.region.longitude });
  }

  onLeftMenuPress() {
    const { navigate } = this.props.navigation;
    navigate('DrawerOpen');
  }

  onCalloutPress(e) {
    console.log('****', selectedWareHouseID);
    const { navigate } = this.props.navigation;
    navigate('DriverOrder', { selectedWareHouseID, lat: this.state.region.latitude, lng: this.state.region.longitude });
  }

  onPinPress(e) {
    console.log(e.nativeEvent);
    selectedWareHouseID = e.nativeEvent.id;
  }

  onCallPress(phone) {
    const args = {
      number: phone, // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
    call(args).catch(console.error)
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
        showPopupAlert('Not Found Location.');
      }
    }, (error) => {
      showPopupAlert(JSON.stringify(error));
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

