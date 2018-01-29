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
} from 'react-native';
import PropTypes from 'prop-types';
import Images from '../../../assets/images';
import NavBar from '../../../components/NavBar';
import { BlueColor, OrangeColor, ButtonFontSize, GrayColor, HeaderFontSize, WhiteColor, FontFamilyName } from '../../../utils/constants';
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
});

const WareHouseList = props => (
  <View style={styles.container}>
    <NavBar
      leftMenuIcon={Images.menu}
      leftMenuPress={() => props.onLeftMenuPress()}
      title="Pick Warehouse"
      isShowRightIcon={Boolean(false)}
      rightMenuIcon={Images.menu}
    />
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
            title={`${marker.warehousename} - ${marker.totalorder}`}
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
