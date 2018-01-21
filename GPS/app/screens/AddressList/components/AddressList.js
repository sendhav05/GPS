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
import NavBar from './NavBar';
import { BlueColor, OrangeColor, ButtonFontSize, GrayColor, HeaderFontSize, WhiteColor, FontFamilyName } from '../../../utils/constants';

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
    marginBottom: 70,
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
  orderButton: {
    backgroundColor: OrangeColor,
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
  redButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  bottomButtonView: {
    flex: 1,
    position: 'absolute',
    bottom: 10,
    height: 60,
  },
});

const AddressList = props => (
  <View style={styles.container}>
    <NavBar
      leftMenuIcon={Images.backArrow}
      leftMenuPress={() => props.onBacnkPress()}
      title="Select a delivery address"
      isShowRightIcon={Boolean(false)}
      rightMenuIcon={Images.addIcon}
      rightMenuPress={() => props.onAddNewAddressPress()}
    />
    <View style={styles.bodyView}>
      <FlatList
        style={styles.flatListStyle}
        extraData={this.state}
        data={props.dataArray}
        renderItem={data => props.getRenderRow(data)}
        keyExtractor={item => item.delivery_id}
      />
    </View>
    <View style={styles.bottomButtonView}>
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => props.onAddNewAddressPress()}
      >
        <Text style={styles.redButtonText}>
          Add New Delivery Address
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

AddressList.propTypes = {
};

AddressList.defaultProps = {
};

export default AddressList;
