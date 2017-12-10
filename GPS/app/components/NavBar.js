import React, { PropTypes } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Images from '../assets';
import { styles as navBarStyles } from './styles/NavBarStyles';

const NavBar = ({ toggleDrawer, activityAction, title, isShowAddIcon }) => (
  <View style={navBarStyles.container}>
    <View style={navBarStyles.innerContainer}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image style={navBarStyles.leftNavBarIcon} source={Images.leftMenuIcon} />
      </TouchableOpacity>
      <Text style={navBarStyles.title}>{title}</Text>
      <View style={navBarStyles.navBarViewStyle}>
        {isShowAddIcon &&
          <TouchableOpacity onPress={activityAction}>
            <Image style={navBarStyles.rightNavBarIcon} source={Images.addIcon} />
          </TouchableOpacity>
        }
      </View>
    </View>
    <View style={navBarStyles.greySeparator} />
  </View>
);

NavBar.propTypes = {
  toggleDrawer: PropTypes.func,
  activityAction: PropTypes.func,
  title: PropTypes.string,
  isShowAddIcon: PropTypes.bool,
};

NavBar.defaultProps = {
  toggleDrawer: undefined,
  activityAction: undefined,
  title: 'No Title',
  isShowAddIcon: true,
};
export default NavBar;
