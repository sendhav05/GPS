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
    height: 50,
    width: width - 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
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

const CustomerFeedback = props => (
  <View style={styles.container}>
    <NavBar
      leftMenuIcon={Images.backArrow}
      leftMenuPress={() => props.onBacnkPress()}
      title="Feedback"
      isShowRightIcon={Boolean(false)}
      rightMenuIcon={Images.menu}
    />
    <View style={styles.headerView}>
      <Text style={styles.deliveredText}>
          Rate our service
      </Text>
    </View>
    <View style={styles.bodyView}>
     
    </View>
    <View style={{ width, height: 200, marginBottom: 10, marginTop: 30 }}>
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => props.cancelOrderPress()}
      >
        <Text style={styles.buttonText}>
          Send Feedback
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

CustomerFeedback.propTypes = {
};

CustomerFeedback.defaultProps = {
};

export default CustomerFeedback;
