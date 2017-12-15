import React, { PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { BlueColor, OrangeColor, ButtonFontSize, GrayColor, HeaderFontSize, WhiteColor, FontFamilyName } from '../../../utils/constants';


const style = StyleSheet.create({
  user: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  profilePic: {
    width: 40,
    height: 40,
  },
  userTitle: {
    fontFamily: FontFamilyName,
    fontSize: ButtonFontSize,
    color: WhiteColor,
    marginLeft: 20,
  },
});

const MenuCell = props => (
  <View style={style.user}>
    <Image
      source={props.data.item.icon}
      style={style.profilePic}
    />
    <Text style={style.userTitle}>
      {props.data.item.name}
    </Text>
  </View>
);

MenuCell.propTypes = {
};

MenuCell.defaultProps = {
};

export default MenuCell;
