
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
    height: 40,
  },
  rightArrow: {
    width: 40,
    height: 40,
    marginLeft: width - 40,
    marginTop: 21,
    position: 'absolute',
  },
  profilePic: {
    width: 35,
    height: 40,
    marginLeft: 10,
    position: 'absolute',
  },
  userTitle: {
    fontFamily: FontFamilyName,
    fontSize: ButtonFontSize,
    color: 'black',
    marginLeft: 70,
    marginRight: 50,
    marginTop: 8,
    position: 'absolute',

  },
  callView: {
    height: 26,
    width: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: GrayColor,
    borderLeftWidth: 0.5,
    marginLeft: width - 70,
    marginTop: 7,
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
        source={Images.locationIcon}
        style={style.profilePic}
      />
      <View style={style.callView}>
        <Image
          source={Images.callIcon}
          style={style.rightArrow}
        />
      </View>
      <Text style={style.userTitle} numberOfLines={1} ellipsizeMode="tail" >
        {`${(props.data.item.distance).toFixed(1)} mi. ${props.data.item.warehousename}`}
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
