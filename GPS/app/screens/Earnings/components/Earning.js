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
import images from '../../../assets/images';

const { width } = Dimensions.get('window');
const brownOrangeColor = 'rgba(255,101,70,1)';
const blueTextColor = 'rgba(97,90,188,1)';
const DarkGrayColor = '#a9a9a9';

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
  topView: {
    height: 120,
    marginTop: 10,
  },
  flatListStyle: {
    flex: 1,
  },
  dailyStyle: {
    backgroundColor: '#a9a9a9',
    height: 35,
    width: (width / 3) - 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
  },
  weeklyStyles: {
    backgroundColor: '#a9a9a9',
    height: 35,
    width: (width / 3) - 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'white',
  },
  monthlyStyles: {
    backgroundColor: '#a9a9a9',
    height: 35,
    width: (width / 3) - 20,
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
  cellView: {
    height: 50,
    width,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  productCountText: {
    color: blueTextColor,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 20,
  },
  rightNavBarIcon: {
    width: 22,
    height: 21,
  },
  bottomcellView: {
    height: 50,
    width: width - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: OrangeColor,
  },
  paymentText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  amountText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 10,
  },
});

const Earning = props => (
  <View style={styles.container}>
    <NavBar
      leftMenuIcon={Images.menu}
      leftMenuPress={() => props.onLeftMenuPress()}
      title="Earnings"
      isShowRightIcon={Boolean(false)}
      rightMenuIcon={Images.editOder}
    />
     <View style={styles.topView}>
        <TouchableOpacity
          onPress={() => props.onInviteToFriends()}
        >
          <View style={styles.cellView}>
            <Image style={styles.rightNavBarIcon} source={images.earnIcon} />
            <Text style={styles.productCountText}>
              Invite to Friends
            </Text>
            <Text style={[styles.productCountText, { position: 'absolute', right: 30 }]}>
              >
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onHistryPress()}
        >
          <View style={styles.cellView}>
            <Image style={styles.rightNavBarIcon} source={images.history} />
            <Text style={styles.productCountText}>
              Trip Histry
            </Text>
            <Text style={[styles.productCountText, { position: 'absolute', right: 30 }]}>
              >
            </Text>
          </View>
        </TouchableOpacity>
    </View>
    <View style={styles.headerView}>
      <TouchableOpacity
        style={[styles.dailyStyle, { backgroundColor: props.selectedIndex === 1 ? blueTextColor:  DarkGrayColor }]}
        onPress={() => props.onDailyPress()}
      >
        <Text style={styles.buttonText}>
          Daily
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.weeklyStyles, { backgroundColor: props.selectedIndex === 2 ? blueTextColor:  DarkGrayColor }]}
        onPress={() => props.onWeeklyPress()}
      >
        <Text style={styles.buttonText}>
          Weekly
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.monthlyStyles, { backgroundColor: props.selectedIndex === 3 ? blueTextColor:  DarkGrayColor }]}
        onPress={() => props.onMonthlyPress()}
      >
        <Text style={styles.buttonText}>
          Monthly
        </Text>
      </TouchableOpacity>
    </View>
    <View style={styles.headerView}>
    <TouchableOpacity
        >
          <View style={styles.bottomcellView}>
            <Text style={styles.paymentText}>
              Estimate Payment
            </Text>
            <Text style={styles.amountText}>
              220 $
            </Text>
          </View>
        </TouchableOpacity>
    </View>
    <View style={styles.bodyView}>
    </View>
  </View>
);

Earning.propTypes = {
};

Earning.defaultProps = {
};

export default Earning;
