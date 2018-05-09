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
    marginTop: 10,
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

const CustomerOrder = props => (
  <View style={styles.container}>
    <NavBar
      leftMenuIcon={Images.menu}
      leftMenuPress={() => props.onLeftMenuPress()}
      title="Orders"
      isShowRightIcon={Boolean(false)}
      rightMenuIcon={Images.editOder}
    />
    <View style={styles.headerView}>
      <TouchableOpacity
        style={styles.pendingOrderButton}
        onPress={() => props.onPendingOrderPress()}
      >
        <Text style={styles.buttonText}>
          Pending
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.CompletedOrderButton}
        onPress={() => props.onCompletedOrderPres()}
      >
        <Text style={styles.buttonText}>
          Completed
        </Text>
      </TouchableOpacity>
    </View>
    <View style={styles.bodyView}>
      <FlatList
        style={styles.flatListStyle}
        data={props.leftMenuItems}
        renderItem={data => props.getRenderRow(data)}
        keyExtractor={item => item.order_id}
        extraData={props.extraData}
      />
    </View>
  </View>
);

CustomerOrder.propTypes = {
};

CustomerOrder.defaultProps = {
};

export default CustomerOrder;
