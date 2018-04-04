
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
    flex: 1,
    height: 70,
  },
  rightArrow: {
    width: 16,
    height: 28,
    marginLeft: width - 40,
    marginTop: 21,
    position: 'absolute',
  },
  profilePic: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginTop: 5,
    position: 'absolute',
  },
  userTitle: {
    fontFamily: FontFamilyName,
    fontSize: ButtonFontSize,
    color: BlueColor,
    marginLeft: 75,
    marginRight: 50,
    marginTop: 8,
    position: 'absolute',

  },
  time: {
    fontFamily: FontFamilyName,
    fontSize: SmallFontSize,
    color: OrangeColor,
    marginLeft: 75,
    marginTop: 28,
    position: 'absolute',

  },
  address: {
    fontFamily: FontFamilyName,
    fontSize: SmallFontSize,
    color: '#a9a9a8',
    marginLeft: 75,
    marginRight: 50,
    marginTop: 44,
    position: 'absolute',
  },
  dividerLine: {
    height: 0.5,
    opacity: 0.2,
    width,
    backgroundColor: 'black',
  },
});

const OrderCell = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => props.onCellSelectionPress(props.data.item)}
  >
    <View style={style.user}>
      <Image
        source={Images.noImage}
        style={style.profilePic}
      />
      {/* <Image
        source={Images.grayRightArrow}
        style={style.rightArrow}
      /> */}
      <Text style={style.userTitle} numberOfLines={1} ellipsizeMode="tail" >
        {props.data.item.name}
      </Text>
      <Text style={style.time}>
        {`Contact: ${props.data.item.contact_no}`}
      </Text>
      <Text style={style.address} numberOfLines={1} ellipsizeMode="tail" >
        {`${props.data.item.address}, ${props.data.item.city}, ${props.data.item.state}`}
      </Text>
    </View>
    <View style={[style.dividerLine]} />
  </TouchableOpacity>
);

OrderCell.propTypes = {
};

OrderCell.defaultProps = {
};

export default OrderCell;
