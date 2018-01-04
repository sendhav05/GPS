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
      && nextProps.wareHouseResponse.response
      && nextProps.wareHouseResponse.status === 200) {
      // && nextProps.wareHouseResponse.response.status === 1) {
      if (nextProps.wareHouseResponse.response.data.length > 0) {
        this.setState({ dataArray: nextProps.wareHouseResponse.response.data });
      } else {
        showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
      }
    } else if (!nextProps.isLoading && nextProps.wareHouseResponse.response
      && (nextProps.wareHouseResponse.status !== 200
      || nextProps.wareHouseResponse.response.status !== 1)) {
      if (nextProps.wareHouseResponse.response.message && typeof nextProps.wareHouseResponse.response.message === 'string') {
        showPopupAlert(nextProps.wareHouseResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  onCellSelectionPress(selectedItem) {
    const { navigate } = this.props.navigation;
    navigate('DriverOrder', { selectedWareHouseID: selectedItem.id });
  }

  onLeftMenuPress() {
    const { navigate } = this.props.navigation;
    navigate('DrawerOpen');
  }

  onCalloutPress(e) {
    console.log('****', selectedWareHouseID);
    const { navigate } = this.props.navigation;
    navigate('DriverOrder', { selectedWareHouseID });
  }

  onPinPress(e) {
    console.log(e.nativeEvent);
    selectedWareHouseID = e.nativeEvent.id;
  }

  getRenderRow(item) {
    return (
      <WareHouseListCell
        data={item}
        onCellSelectionPress={selectedItem => this.onCellSelectionPress(selectedItem)}
      />

    );
  }

  getWareHouseDataFromServer() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        this.props.fetchWareHouseRequest();
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

        console.log('********** value : ', data);
        console.log('********** value : ', this.state.region);
        this.setState({ region: data }, () => this.getWareHouseDataFromServer());
      } else {
        this.getWareHouseDataFromServer();
      }
    }, (error) => {
      showPopupAlert(JSON.stringify(error));
    }, {
      enableHighAccuracy: true,
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
  isLoading: state.wareHouse.isLoading,
  wareHouseResponse: state.wareHouse.wareHouseResponse,
});

const mapDispatchToProps = () => UserActions;

const WareHouseViewScreen = connect(mapStateToProps, mapDispatchToProps)(WareHouseView);

export default WareHouseViewScreen;

