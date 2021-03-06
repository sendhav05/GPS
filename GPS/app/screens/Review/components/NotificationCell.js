
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
    padding: 7,
  },
  userTitle: {
    fontFamily: FontFamilyName,
    fontSize: ButtonFontSize,
    color: BlueColor,
    fontWeight: '800'
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
    paddingTop: 7,
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
    onPress={() => props.onCellSelectionPress(props.data.item)}
  >
    <View style={style.user}>
      <Text style={style.userTitle} numberOfLines={1} ellipsizeMode="tail" >
        {props.data.item.name}
      </Text>
      <View style={style.bodyView}>
        <Stars
          half={false}
          rating={props.starCount}
          spacing={6}
          starSize={20}
          count={5}
          fullStar={Images.selectedStart}
          emptyStar={Images.unSelectedStart}
          halfStar={Images.unSelectedStart}
        />
      </View>
      <Text style={style.time}>
        {props.data.item.feedback ? props.data.item.feedback : ''}
      </Text>
      <Text style={style.address} numberOfLines={2} ellipsizeMode="tail" >
        {`${props.data.item.create_date}`}
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
