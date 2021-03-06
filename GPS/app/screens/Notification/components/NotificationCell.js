
import React, { PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { BlueColor, OrangeColor, ButtonFontSize, GrayColor, HeaderFontSize, SmallFontSize, WhiteColor, FontFamilyName } from '../../../utils/constants';
import Images from '../../../assets/images';

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
  user: {
    padding: 6,
  },
  userTitle: {
    fontFamily: FontFamilyName,
    fontSize: ButtonFontSize,
    color: BlueColor,
    fontWeight: '800'
  },
  datetime: {
    fontFamily: FontFamilyName,
    fontSize: SmallFontSize,
    color: BlueColor,
    right: 10,
    marginTop: 7,
    position: 'absolute',
    fontWeight: '400'
  },
  time: {
    fontFamily: FontFamilyName,
    fontSize: SmallFontSize,
    color: 'black',
  },
  address: {
    fontFamily: FontFamilyName,
    fontSize: SmallFontSize,
    color: '#a9a9a8',
  },
  dividerLine: {
    height: 0.5,
    opacity: 0.2,
    width,
    backgroundColor: 'black',
  },
});

const NotificationCell = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => props.onCellSelectionPress(props.data.item)}
  >
    <View style={style.user}>
      <Text style={style.userTitle} numberOfLines={1} ellipsizeMode="tail" >
        {props.data.item.name}
      </Text>
      <Text style={style.datetime} numberOfLines={1} ellipsizeMode="tail" >
        {props.data.item.create_date}
      </Text>
      <Text style={style.time}>
        {`${props.data.item.title}`}
      </Text>
      <Text style={style.address} numberOfLines={2} ellipsizeMode="tail" >
        {`${props.data.item.message}`}
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
