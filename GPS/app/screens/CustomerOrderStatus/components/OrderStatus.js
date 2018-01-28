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
import MapViewDirections from 'react-native-maps-directions';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bodyView: {
    flex: 1,
    width,
    flexDirection: 'row'
  },
  headerView: {
    height: 70,
    flexDirection: 'row',
    marginTop: 30,
  },
  map: {
    flex: 1,
    borderRadius: 5,
  },
  orderButton: {
    backgroundColor: OrangeColor,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    height: 40,
    width: width - 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  pickedView: {
    flex: 1,
    height: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 5,
    borderColor: OrangeColor
  },
  pickedText: {
    color: BlueColor,
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  orderWayView: {
    flex: 1,
    height: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 5,
    borderColor: 'rgba(54, 56, 58, 1.0)'
  },
  deliveredText: {
    color: 'rgba(134, 135, 136, 1.0)',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  deliveredView: {
    flex: 1,
    height: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 5,
    borderColor: 'rgba(54, 56, 58, 1.0)'
  },
});

const NotificationList = props => (
  <View style={styles.container}>
    <NavBar
      leftMenuIcon={Images.backArrow}
      leftMenuPress={() => props.onBacnkPress()}
      title="Order Status"
      isShowRightIcon={Boolean(false)}
      rightMenuIcon={Images.menu}
    />
    <View style={styles.headerView}>
      <View style={styles.pickedView}>
        <Text style={styles.pickedText}>
          Order Picked
        </Text>
      </View>
      <View style={styles.orderWayView}>
        <Text style={styles.deliveredText}>
          Order On the Way
        </Text>
      </View>
      <View style={styles.deliveredView}>
        <Text style={styles.deliveredText}>
          Delivered
        </Text>
      </View>
    </View>
    <View style={styles.bodyView}>
      <MapView 
        style={styles.map}
        initialRegion={props.region}
        showsUserLocation={Boolean(true)}
      >
        <MapView.Marker
          coordinate={{ longitude: props.origin.longitude, latitude: props.origin.latitude }}
          title={'Origin'}
        />
        <MapView.Marker
          coordinate={{ longitude: props.destination.longitude, latitude: props.destination.latitude }}
          title={'Delivery'}
        />
        <MapViewDirections
          origin={props.origin}
          destination={props.destination}
          apikey={props.mapKey}
          strokeWidth={3}
          strokeColor="red"
        />
      </MapView>
    </View>
    <View style={{ width, height: 200, marginBottom: 10, marginTop: 30 }}>
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => props.onCallPress()}
      >
        <Text style={styles.buttonText}>
          Call to Delivery Person
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => props.onCallPress()}
      >
        <Text style={styles.buttonText}>
          Contact Help
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => props.cancelOrderPress()}
      >
        <Text style={styles.buttonText}>
          Cancel the Order
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

NotificationList.propTypes = {
};

NotificationList.defaultProps = {
};

export default NotificationList;
