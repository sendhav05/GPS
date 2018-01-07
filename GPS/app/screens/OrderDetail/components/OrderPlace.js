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
const blueTextColor = 'rgba(97,90,188,1)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  productView: {
    height: 120,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
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
  logo: {
    width: 100,
    height: 108,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: brownOrangeColor,
    borderRadius: 10,
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
  headerText: {
    color: blueTextColor,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 3,
  },
  bodyView: {
    flex: 1,
    marginTop: 20,
    width,
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    borderRadius: 25,
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
  totalCellView: {
    height: 40,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});

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
        title={props.selectedOrderItem.name}
        isShowRightIcon={Boolean(false)}
        rightMenuIcon={Images.editOder}
        rightMenuPress={() => props.onOrderAddedPress()}
      />
      <View style={styles.productView}>
        <View
          style={styles.logo}
          resizeMode="contain"
        >
          <Text style={[styles.productCountText, { color: 'white', fontSize: 22 }]}>
            Order
          </Text>
        </View>
        <View style={styles.productPriceView}>
          <Text style={styles.headerText}>
            {`Distance: ${(props.selectedOrderItem.distance).toFixed(1)} mi.`}
          </Text>
          <Text style={styles.headerText}>
            {`Payment Type: ${(props.selectedOrderItem.payment_type)}`}
          </Text>
          <Text style={styles.headerText}>
            {`Payment Status: ${(props.selectedOrderItem.payment_status)}`}
          </Text>
          <Text style={styles.headerText}>
            {`Date: ${(props.selectedOrderItem.date)}`}
          </Text>
          <Text style={styles.headerText}>
            {`Order Status: ${(props.selectedOrderItem.order_status)}`}
          </Text>
        </View>
      </View>
      <View style={styles.bodyView}>
        <View style={styles.cellView}>
          <Text style={styles.productCountText}>
            Contact
          </Text>
          <Text style={styles.productCountText}>
            {`${props.selectedOrderItem.contact_no}`}
          </Text>
        </View>
        <View style={styles.cellView}>
          <Text style={styles.productCountText}>
            Email
          </Text>
          <Text style={styles.productCountText}>
            {`${props.selectedOrderItem.email}`}
          </Text>
        </View>
        <View style={styles.cellView}>
          <Text style={styles.productCountText}>
            Address
          </Text>
          <Text style={styles.productCountText}>
            {`${props.selectedOrderItem.address}`}
          </Text>
        </View>
        <View style={styles.cellView}>
          <Text style={styles.productCountText}>
            City
          </Text>
          <Text style={styles.productCountText}>
            {`${props.selectedOrderItem.city}`}
          </Text>
        </View>
        <View style={styles.cellView}>
          <Text style={styles.productCountText}>
            Landmark
          </Text>
          <Text style={styles.productCountText}>
            {`${props.selectedOrderItem.landmark}`}
          </Text>
        </View>
        <View style={styles.cellView}>
          <Text style={styles.productCountText}>
            State
          </Text>
          <Text style={styles.productCountText}>
            {`${props.selectedOrderItem.state}`}
          </Text>
        </View>
        <View style={styles.totalCellView}>
          <Text style={[styles.productCountText, { fontSize: 20 }]}>
            Total
          </Text>
          <Text style={[styles.productCountText, { fontSize: 20, color: brownOrangeColor }]}>
            {`${props.selectedOrderItem.totall_amount} $`}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => props.onOrderAddedPress()}
          >
            <Text style={styles.buttonText}>
              Add To My Order List
            </Text>
          </TouchableOpacity>
        </View>
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
