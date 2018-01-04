
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
    marginTop: 15,
    position: 'absolute',

  },
  address: {
    fontFamily: FontFamilyName,
    fontSize: SmallFontSize,
    color: '#a9a9a8',
    marginLeft: 75,
    marginRight: 50,
    marginTop: 40,
    position: 'absolute',
  },
  dividerLine: {
    height: 0.5,
    opacity: 0.2,
    width,
    backgroundColor: 'black',
  },
});

const CategoryListCell = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => props.onCellSelectionPress(props.data.item)}
  >
    <View style={style.user}>
      <Image
        source={Images.grayRightArrow}
        style={style.rightArrow}
      />
      <Image
        source={Images.noImage}
        style={style.profilePic}
      />
      <Text style={style.userTitle} numberOfLines={1} ellipsizeMode="tail" >
        {props.data.item.category_name}
      </Text>
      <Text style={style.address} numberOfLines={1} ellipsizeMode="head" >
        {props.data.item.description}
      </Text>
    </View>
    <View style={[style.dividerLine]} />
  </TouchableOpacity>
);

CategoryListCell.propTypes = {
};

CategoryListCell.defaultProps = {
};

export default CategoryListCell;
