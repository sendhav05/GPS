
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
    flex: 1,
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
    marginRight: 70,
    marginTop: 10,
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
  tochableOpacityView: {
    height: 26,
    width: 34,
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
  countView: {
    height: 20,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width - 100,
    backgroundColor: 'transparent',
    marginTop: 10

  },
  countText: {
    width: 30,
    height: 15,
    color: 'black',
    fontSize: 11,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'transparent',
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
      <View style={style.countView}>
        <Text style={style.countText} >
          {props.data.item.totalorder}
        </Text>
      </View>
        <View style={style.callView}>
          <TouchableOpacity
            onPress={() => props.onCallPress(props.data.item.contact)}
          >
            <View style={{ flex: 1 }}>
              <Image
                source={Images.callIcon}
                style={style.rightArrow}
              />
            </View>
          </TouchableOpacity>
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
