import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import Images from '../../../assets/images';
import NavBar from '../../../components/NavBar';

const { width } = Dimensions.get('window');
const brownOrangeColor = 'rgba(255,101,70,1)';
const disbaledBrownOrangeColor = 'rgba(255,101,70,0.6)';
const blueTextColor = 'rgba(97,90,188,1)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  confirmButtonView: {
    height: 40,
    width,
    flexDirection: 'row',
    marginTop: 50,
  },
  confirmButton: {
    backgroundColor: brownOrangeColor,
    marginLeft: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: (width / 2) - 60,
  },
  orderIDStyle: {
    color: blueTextColor,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  nameStyle: {
    color: blueTextColor,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 50,
    position: 'absolute',
    left: 80,
  },
  orderButton: {
    backgroundColor: brownOrangeColor,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 15,
    marginBottom: 30,
    height: 40,
    width: width - 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  cellView: {
    height: 100,
    width,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  phoneView: {
    height: 50,
    width,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  cellSubview: {
    height: 100,
    width,
    paddingLeft: 20,
    paddingRight: 20,
  },
  deliveryTextStyle: {
    color: 'black',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
    left: 25,
  },
  iconStyle: {
    height: 25,
    width: 16,
  },
});


const PendingPickupOrder = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => Keyboard.dismiss()}
  >
    <View style={styles.container}>
      <NavBar
        leftMenuIcon={Images.backArrow}
        leftMenuPress={() => props.onBacnkPress()}
        title="Pending Pickup Orders"
        isShowRightIcon={Boolean(false)}
        rightMenuIcon={Images.editOder}
        rightMenuPress={() => props.onBacnkPress()}
      />
      <View style={styles.container}>
        <Text style={styles.orderIDStyle}>
          {''}
        </Text>
        <Text style={styles.nameStyle}>
          {props.name}
        </Text>
        <TouchableOpacity
          onPress={() => props.showLocationOnMAp()}
        >
          <View style={styles.cellView}>
            <Image
              source={Images.locatBlue}
              style={styles.iconStyle}
            />
            <View style={styles.cellSubview}>
              <Text style={[styles.deliveryTextStyle, { color: blueTextColor }]}>
                {'Pickup Address'}
              </Text>
              <Text style={[styles.deliveryTextStyle]}>
                {props.address}
              </Text>
              <Text style={styles.deliveryTextStyle}>
                {props.city}
              </Text>
              <Text style={styles.deliveryTextStyle}>
                {props.state}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onCallPress(props.phoneNum)}
        >
          <View style={styles.phoneView}>
            <Image
              source={Images.callBlue}
              style={{ width: 16, height: 16 }}
            />
            <Text style={[styles.deliveryTextStyle, { left: 45 }]}>
              {props.phoneNum}
            </Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.phoneView}>
            <Image
              source={Images.clock1}
              style={{ width: 16, height: 16 }}
            />
            <Text style={[styles.deliveryTextStyle, { left: 45 }]}>
              {'Delivery Address'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.phoneView}>
            <Image
              source={Images.clock2}
              style={{ width: 16, height: 16 }}
            />
            <Text style={[styles.deliveryTextStyle, { left: 45 }]}>
              {'Delivery Address'}
            </Text>
          </View>
        </TouchableOpacity> */}
        <View style={styles.confirmButtonView}>
          <TouchableOpacity
            style={[styles.confirmButton, { backgroundColor: !props.deliveredBtnEnabled ? brownOrangeColor : disbaledBrownOrangeColor }]}
            disabled={props.deliveredBtnEnabled}
            activeOpacity={!props.deliveredBtnEnabled ? 1 : 0.5}
            onPress={() => props.pickupDonePress()}
          >
            <Text style={styles.buttonText}>
              Pickup Done
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.confirmButton, { backgroundColor: props.deliveredBtnEnabled ? brownOrangeColor : disbaledBrownOrangeColor }]}
            disabled={!props.deliveredBtnEnabled}
            activeOpacity={props.deliveredBtnEnabled ? 1 : 0.5}
            onPress={() => props.deliveredPress()}
          >
            <Text style={styles.buttonText}>
              Delivered
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </TouchableOpacity>

);

PendingPickupOrder.propTypes = {
};

PendingPickupOrder.defaultProps = {
};

export default PendingPickupOrder;
