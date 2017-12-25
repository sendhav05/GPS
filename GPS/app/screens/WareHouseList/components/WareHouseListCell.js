
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
    width: 16,
    height: 28,
    marginLeft: width - 40,
    marginTop: 17,
    position: 'absolute',
  },
  userTitle: {
    fontFamily: FontFamilyName,
    fontSize: ButtonFontSize,
    color: BlueColor,
    marginLeft: 10,
    marginTop: 22,
    position: 'absolute',

  },
  time: {
    fontFamily: FontFamilyName,
    fontSize: ButtonFontSize,
    color: OrangeColor,
    marginLeft: width - 250,
    marginTop: 8,
    position: 'absolute',

  },
  address: {
    fontFamily: FontFamilyName,
    fontSize: SmallFontSize,
    color: '#a9a9a8',
    marginLeft: 40,
    marginTop: 46,
    position: 'absolute',
  },
  dividerLine: {
    height: 0.5,
    opacity: 0.2,
    width,
    backgroundColor: 'black',
  },
});

const WareHouseListCell = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => props.onCellSelectionPress(props.data.item)}
  >
    <View style={style.user}>
      <Image
        source={Images.grayRightArrow}
        style={style.profilePic}
      />
      <Text style={style.userTitle}>
        {props.data.item.name}
      </Text>
      <Text style={style.time}>
        {`Contact: ${props.data.item.contact}`}
      </Text>
      <Text style={style.address}>
        {`${props.data.item.address}, ${props.data.item.city}, ${props.data.item.state}`}
      </Text>
    </View>
    <View style={[style.dividerLine]} />
  </TouchableOpacity>
);

WareHouseListCell.propTypes = {
};

WareHouseListCell.defaultProps = {
};

export default WareHouseListCell;
