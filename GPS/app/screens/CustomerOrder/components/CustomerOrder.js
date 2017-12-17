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
    borderColor: 'red',
    borderRadius: 5,
    borderWidth: 1,
  },
  logo: {
    width: 161,
    height: 169,
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
    marginTop: 60,
  },
  productCountText: {
    color: blueTextColor,
    fontSize: 20,
    fontWeight: '500',
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
    height: 60,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});

const CustomerOrder = props => (
  <View style={styles.container}>
    <NavBar
      leftMenuIcon={Images.menu}
      leftMenuPress={() => props.onBacnkPress()}
      title="Order"
      isShowRightIcon={Boolean(true)}
      rightMenuIcon={Images.editOder}
      rightMenuPress={() => props.onEditOrderPress()}
    />
  </View>
);

CustomerOrder.propTypes = {
};

CustomerOrder.defaultProps = {
};

export default CustomerOrder;
