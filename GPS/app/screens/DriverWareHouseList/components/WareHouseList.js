import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  Switch,
} from 'react-native';
import PropTypes from 'prop-types';
import Images from '../../../assets/images';
import { StatusBarHeight, BlueColor, OrangeColor, ButtonFontSize, GrayColor, HeaderFontSize, WhiteColor, FontFamilyName } from '../../../utils/constants';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bodyView: {
    width: width - 30,
    height: height * 0.3,
    marginTop: 10,
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 0.2,
  },
  mapView: {
    flex: 1,
    width: width - 30,
    marginTop: 10,
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 25,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
    borderRadius: 5,
  },
  headerView: {
    height: 40,
    flexDirection: 'row',
    marginTop: 10,
  },
  flatListStyle: {
    flex: 1,
  },
  pendingOrderButton: {
    backgroundColor: OrangeColor,
    height: 35,
    width: (width / 2) - 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
  },
  CompletedOrderButton: {
    backgroundColor: '#a9a9a9',
    height: 35,
    width: (width / 2) - 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  headrcontainer: {
    backgroundColor: BlueColor,
    height: 44,
    width,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBarHeight,
  },
  leftNavBarIcon: {
    width: 25,
    height: 22,
    alignSelf: 'center',
    position: 'absolute',
    left: 10,
    top: 6,
  },
  rightNavBarIcon: {
    width: 25,
    height: 22,
    alignSelf: 'center',
  },
  title: {
    fontSize: HeaderFontSize,
    color: WhiteColor,
    alignSelf: 'center',
    fontFamily: FontFamilyName,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 70,

  },
  subHeaderView: {
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 50,
    backgroundColor: 'transparent',
  },
  offlineText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    left: 10,
  },
});

const WareHouseList = props => (
  <View style={styles.container}>
  <View style={styles.headrcontainer}>
    <TouchableOpacity style={styles.leftNavBarIcon} onPress={() => props.onLeftMenuPress()}>
      <Image style={styles.leftNavBarIcon} source={Images.menu} />
    </TouchableOpacity>
    <Text style={styles.title}>Pick Warehouse</Text>
    <View style={styles.subHeaderView}>
        <Switch
          onValueChange = {(value) => props.toggleSwitch(value)}
          value={props.switchValue ? true : false}
        />
        <Text style={styles.offlineText}>
          Offline
        </Text>
      </View>
  </View>
    <View style={styles.bodyView}>
      <FlatList
        style={styles.flatListStyle}
        data={props.dataArray}
        renderItem={data => props.getRenderRow(data)}
        keyExtractor={item => item.warehouse_id}
      />
    </View>
    <View style={styles.mapView}>
      <MapView
        style={styles.map}
        showsUserLocation={Boolean(true)}
        region={props.region}
      >
        {props.dataArray.map(marker => (
          <MapView.Marker
            style={styles.map}
            key={marker.warehouse_id}
            identifier={marker.warehouse_id}
            coordinate={{ longitude: marker.lng ? parseFloat(marker.lng) : 0.0, latitude: marker.lat ? parseFloat(marker.lat) : 0.0 }}
            title={`Total Orders(${marker.totalorder})`}
            description={marker.address}
            onPress={e => props.onPinPress(e)}
            onCalloutPress={e => props.onCalloutPress(e)}
          />
        ))}
      </MapView>
    </View>
  </View>
);

WareHouseList.propTypes = {
};

WareHouseList.defaultProps = {
};

export default WareHouseList;
