
import React, { PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Stars from 'react-native-stars';

import { BlueColor, OrangeColor, ButtonFontSize, GrayColor, HeaderFontSize, SmallFontSize, WhiteColor, FontFamilyName } from '../../../utils/constants';
import Images from '../../../assets/images';

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
  user: {
    padding: 10,
  },
  userTitle: {
    fontFamily: FontFamilyName,
    fontSize: ButtonFontSize,
    color: BlueColor,
    fontWeight: '800',
  },
  time: {
    fontFamily: FontFamilyName,
    fontSize: SmallFontSize,
    color: 'black',
    paddingTop: 10,
  },
  address: {
    fontFamily: FontFamilyName,
    fontSize: SmallFontSize,
    color: '#a9a9a8',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 45,
    position: 'absolute',
  },
  dividerLine: {
    height: 0.5,
    opacity: 0.2,
    width,
    backgroundColor: 'black',
  },
  bodyView: {
    height: 50,
    width: 150,
    right: 0,
    top: 5,
    position: 'absolute',
  },
});

const NotificationCell = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
  >
    <View style={style.user}>
      <Text style={style.userTitle} numberOfLines={10} ellipsizeMode="tail" >
        {props.data.item.question}
      </Text>
      <Text style={style.time} numberOfLines={10} ellipsizeMode="tail" >
        {props.data.item.answer ? props.data.item.answer : ''}
      </Text>
    </View>
    <View style={[style.dividerLine]} />
  </TouchableOpacity>
);

NotificationCell.propTypes = {
};

NotificationCell.defaultProps = {
};

export default NotificationCell;
