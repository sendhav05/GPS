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
    marginTop: 20,
    height: 170,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  productCountView: {
    height: 52,
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'red',
    borderRadius: 5,
    borderWidth: 1,
  },
  productPriceView: {
    height: 52,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 138,
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
    fontSize: 18,
    fontWeight: '500',
  },
  bodyView: {
    flex: 1,
    marginTop: 5,
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
    height: 60,
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
        title={props.selectedProductItem.name}
        isShowRightIcon={Boolean(true)}
        rightMenuIcon={Images.editOder}
        rightMenuPress={() => props.onEditOrderPress()}
      />
      <View style={styles.productView}>
        <View
          style={styles.logo}
          resizeMode="contain"
        >
          <Text style={[styles.productCountText, { color: 'white', fontSize: 22 }]}>
            Product
          </Text>
        </View>
        <View style={styles.productCountView}>
          <TextInput
            style={[styles.productCountText, { width: 52, height: 52, textAlign: 'center' }]}
            keyboardType="numeric"
            placeholderTextColor="rgba(70,64,172,1)"
            onChangeText={quantity => props.updateQuantity(quantity)}
            value={props.quantity}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.productPriceView}>
          <Text style={styles.productCountText}>
            {`${props.price} $`}
          </Text>
        </View>
      </View>
      <View style={styles.bodyView}>
        <View style={styles.cellView}>
          <Text style={styles.productCountText}>
            Delivery Charge
          </Text>
          <Text style={styles.productCountText}>
            {`${props.deliveryCharge} $`}
          </Text>
        </View>
        <View style={styles.cellView}>
          <Text style={[styles.productCountText, { fontSize: 24 }]}>
            Total
          </Text>
          <Text style={[styles.productCountText, { fontSize: 24, color: brownOrangeColor }]}>
            {`${props.totalPrice} $`}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => props.onDeliveryAddressPress()}
        >
          <View style={styles.cellView}>
            <Text style={styles.productCountText}>
              Choose Delivery Address
            </Text>
            <Text style={styles.productCountText}>
              >
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onChoosePaymentPress()}
        >
          <View style={styles.cellView}>
            <Text style={styles.productCountText}>
              Choose Payment
            </Text>
            <Text style={styles.productCountText}>
              >
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => props.onOrderPress()}
          >
            <Text style={styles.buttonText}>
              Order
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
