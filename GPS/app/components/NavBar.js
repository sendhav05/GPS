import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { StatusBarHeight, BlueColor, FontFamilyName, HeaderFontSize, WhiteColor } from '../utils/constants';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: BlueColor,
    height: 44,
    width,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: StatusBarHeight,
    paddingHorizontal: 10,
  },
  leftNavBarIcon: {
    width: 25,
    height: 22,
    alignSelf: 'center',

  },
  rightNavBarIcon: {
    width: 25,
    height: 22,
    alignSelf: 'center',
  },
  title: {
    fontSize: HeaderFontSize,
    color: WhiteColor,
    alignSelf: 'center',
    fontFamily: FontFamilyName,
  },
});

const NavBar = ({
 leftMenuIcon, leftMenuPress, title, isShowRightIcon, rightMenuIcon, rightMenuPress 
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={leftMenuPress}>
      <Image style={styles.leftNavBarIcon} source={leftMenuIcon} />
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
    {isShowRightIcon ?
      <TouchableOpacity onPress={rightMenuPress}>
        <Image style={styles.rightNavBarIcon} source={rightMenuIcon} />
      </TouchableOpacity>
      : <View style={styles.rightNavBarIcon} />
    }
  </View>
);

NavBar.propTypes = {
  leftMenuPress: PropTypes.func,
  rightMenuPress: PropTypes.func,
  title: PropTypes.string,
  isShowAddIcon: PropTypes.bool,
};

NavBar.defaultProps = {
  leftMenuPress: undefined,
  rightMenuPress: undefined,
  title: 'No Title',
  isShowAddIcon: true,
};
export default NavBar;
