
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
  profilePic: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginTop: 22,
    position: 'absolute',
  },
  userTitle: {
    fontFamily: FontFamilyName,
    fontSize: ButtonFontSize,
    color: BlueColor,
    marginLeft: 50,
    marginRight: 10,
    marginTop: 8,
    position: 'absolute',

  },
  time: {
    fontFamily: FontFamilyName,
    fontSize: SmallFontSize,
    color: OrangeColor,
    marginLeft: 50,
    marginTop: 28,
    position: 'absolute',

  },
  address: {
    fontFamily: FontFamilyName,
    fontSize: SmallFontSize,
    color: '#a9a9a8',
    marginLeft: 50,
    marginRight: 10,
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

const AddressListCell = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => props.onCellSelectionPress(props.data.item)}
  >
    <View style={style.user}>
      { console.log('$$$$$', props.data.item.isSelected) }
      <Image
        source={props.data.item.isSelected ? Images.selectedIcon : Images.unselectIcon}
        style={style.profilePic}
      />
      <Text style={style.userTitle} numberOfLines={1} ellipsizeMode="tail" >
        {props.data.item.address}
      </Text>
      <Text style={style.time}>
        {`${props.data.item.landmark}`}
      </Text>
      <Text style={style.address} numberOfLines={1} ellipsizeMode="tail" >
        {`${props.data.item.city}, ${props.data.item.state}, ${props.data.item.pin_code}`}
      </Text>
    </View>
    <View style={[style.dividerLine]} />
  </TouchableOpacity>
);

AddressListCell.propTypes = {
};

AddressListCell.defaultProps = {
};

export default AddressListCell;
