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
import { OrangeColor } from '../../../utils/constants';

const { width } = Dimensions.get('window');
const brownOrangeColor = 'rgba(255,101,70,1)';
const blueTextColor = 'rgba(97,90,188,1)';
const disbaledBrownOrangeColor = 'rgba(255,101,70,0.6)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  productView: {
    height: 70,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  confirmButtonView: {
    height: 40,
    width,
    flexDirection: 'row',
    marginTop: 50,
  },
  confirmButton: {
    backgroundColor: blueTextColor,
    marginLeft: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: (width / 2) - 60,
  },
  plusButtonView: {
    height: 40,
    width,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  plusButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: 40,
    borderWidth: 2,
    borderColor: blueTextColor,
  },
  productCountView: {
    height: 52,
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderRadius: 5,
    borderWidth: 1,
  },
  productPriceView: {
    flexDirection: 'column',
    marginLeft: 10,
    height: 52,
    width: width - 130,
  },
  textInputView: {
    marginTop: 60,
    height: 100,
    justifyContent: 'flex-start',
  },
  forgotPasswordButton: {
    marginTop: 80,
  },
  productCountText: {
    color: blueTextColor,
    fontSize: 12,
    fontWeight: '500',
  },
  timerText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 30,
  },
  headerText: {
    color: blueTextColor,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 3,
  },
  bodyView: {
    marginTop: 20,
    width,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'red',

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
  supportView: {
    alignItems: 'center',
    width: 110,
    height: 30,
  },
  cellView: {
    height: 20,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  totalView: {
    height: 30,
    width,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
  },
  totalCellView: {
    height: 40,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});

const OrderView = props => (
  <Text style={[styles.productCountText, { marginLeft: 80, marginTop: 3 }]}>
    {`- ${props.order.name}`}
  </Text>
);

const CustomerHome = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => Keyboard.dismiss()}
  >
    <View style={styles.container}>
      <NavBar
        leftMenuIcon={Images.backArrow}
        leftMenuPress={() => props.onBacnkPress()}
        title="Reserve Orders"
        isShowRightIcon={Boolean(false)}
        rightMenuIcon={Images.editOder}
        rightMenuPress={() => props.onBacnkPress()}
      />
      <View style={styles.productView}>
        <View style={styles.productPriceView}>
          <Text style={styles.headerText}>
            {'Select No. Of Orders:'}
          </Text>
        </View>
      </View>
      <View style={styles.plusButtonView}>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => props.onMinusePress()}
        >
          <Text style={[styles.buttonText, { color: blueTextColor }]}>
                -
          </Text>
        </TouchableOpacity>
        <Text style={[styles.buttonText, {
 color: OrangeColor, marginLeft: 15, marginRight: 15, marginTop: 10 
}]}>
          {props.totalorder}
        </Text>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => props.onPlusPress()}
        >
          <Text style={[styles.buttonText, { color: blueTextColor }]}>
              +
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.confirmButtonView}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => props.onConfirmPress()}
        >
          <Text style={styles.buttonText}>
            Confirm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => props.onCancelPress()}
        >
          <Text style={styles.buttonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.totalView}>
        <Text style={[styles.productCountText, { fontSize: 20 }]}>
          Total Order:
        </Text>
        <Text style={[styles.productCountText, { fontSize: 20, color: brownOrangeColor, marginLeft: 30 }]}>
          {`${props.totalorder}`}
        </Text>
      </View>
      <Text style={[styles.timerText]}>
        Your orders going to end!
      </Text>
      <Text style={[styles.timerText, { fontSize: 20 }]}>
        {`${props.currentSecond} sec`}
      </Text>
      <View style={{ flex: 1, marginTop: 30 }}>
        <TouchableOpacity
          style={[styles.orderButton, { backgroundColor: props.isEnabledGotoPickupButton ? brownOrangeColor : disbaledBrownOrangeColor }]}
          disabled={!props.isEnabledGotoPickupButton}
          activeOpacity={props.isEnabledGotoPickupButton ? 0.3 : 1}
          onPress={() => (props.isEnabledGotoPickupButton ? props.onGoToPickupPress() : {})}
        >
          <Text style={styles.buttonText}>
            Go to Pickup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>

);

CustomerHome.propTypes = {
  onForgotPassowrdPress: PropTypes.func,
};

CustomerHome.defaultProps = {
  onForgotPassowrdPress: () => {},
};

export default CustomerHome;
