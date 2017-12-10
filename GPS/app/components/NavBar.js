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
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: StatusBarHeight,
    paddingVertical: 8,
  },
  innerContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginHorizontal: 12,
    paddingVertical: 8,
  },
  leftNavBarIcon: {
    width: 16,
    height: 16,
  },
  rightNavBarIcon: {
    width: 25,
    height: 25,
    marginLeft: 20,
  },
  title: {
    fontSize: HeaderFontSize,
    color: WhiteColor,
    alignSelf: 'center',
    fontFamily: FontFamilyName,
    marginLeft: (width / 2) - 52,
  },
  agenda: {
    fontSize: 14,
    color: '#2544A7',
    fontFamily: FontFamilyName,
    fontWeight: 'bold',
  },
  navBarViewStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
});

const NavBar = ({ leftMenuIcon, leftMenuPress, title, isShowRightIcon, rightMenuIcon, rightMenuPress }) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <TouchableOpacity onPress={leftMenuPress}>
        <Image style={styles.leftNavBarIcon} source={leftMenuIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.navBarViewStyle}>
        {isShowRightIcon &&
          <TouchableOpacity onPress={rightMenuPress}>
            <Image style={styles.rightNavBarIcon} source={rightMenuIcon} />
          </TouchableOpacity>
        }
      </View>
    </View>
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
