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
  bottomView: {
    position: 'absolute',
    height: 50,
    flexDirection: 'row',
    bottom: 0,
    backgroundColor: blueTextColor,
  },
  tabStyle: {
    backgroundColor: 'transparent',
    height: 50,
    width: (width / 4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '500',
    backgroundColor: 'transparent',
    marginTop: 3,
  },
  rightNavBarIcon: {

  },
});

const Account = props => (
  <View style={styles.container}>
    <NavBar
      leftMenuIcon={Images.menu}
      leftMenuPress={() => props.onLeftMenuPress()}
      title={props.title}
      isShowRightIcon={Boolean(false)}
      rightMenuIcon={Images.editOder}
    />
    <View style={styles.bodyView}>
    </View>
    <View style={styles.bottomView}>
      <TouchableOpacity
          style={[styles.tabStyle]}
          onPress={() => props.onHelpPress()}
        >
        <Image
          style={styles.rightNavBarIcon}
          source={props.selectedIndex === 1 ? images.selectedHelp : images.help}
        />
        <Text style={[styles.buttonText, { color: props.selectedIndex === 1 ? OrangeColor : 'white' }]}>
          Help
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabStyle]}
        onPress={() => props.onDocumentPress()}
      >
        <Image
          style={styles.rightNavBarIcon}
          source={props.selectedIndex === 2 ? images.selectedDocument : images.document}
        />
        <Text style={[styles.buttonText, { color: props.selectedIndex === 2 ? OrangeColor : 'white' }]}>
          Document
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabStyle]}
        onPress={() => props.onEarningPress()}
      >
        <Image
          style={styles.rightNavBarIcon}
          source={props.selectedIndex === 3 ? images.selectedPayment : images.payment}
        />
        <Text style={[styles.buttonText, { color: props.selectedIndex === 3 ? OrangeColor : 'white' }]}>
          Earning
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabStyle]}
        onPress={() => props.onSettingPress()}
      >
        <Image
          style={styles.rightNavBarIcon}
          source={props.selectedIndex === 4 ? images.selectedSetting : images.setting}
        />
        <Text style={[styles.buttonText, { color: props.selectedIndex === 4 ? OrangeColor : 'white' }]}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
   
  </View>
);

Account.propTypes = {
};

Account.defaultProps = {
};

export default Account;
