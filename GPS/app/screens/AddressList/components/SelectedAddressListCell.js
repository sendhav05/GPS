
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
    height: 50,
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
  confirmButtonView: {
    height: 40,
    width,
    flexDirection: 'row',
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: BlueColor,
    marginLeft: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: (width / 2) - 60,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  orderButton: {
    backgroundColor: OrangeColor,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
    height: 40,
    width: width - 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  productCountText: {
    color: OrangeColor,
    fontSize: 18,
    fontWeight: '500',
  },
});

const SelectedAddressListCell = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => props.onCellSelectionPress(props.data.item)}
  >
    <View style={style.user}>
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
    <View style={{ flex: 1, marginTop: 20 }}>
      <TouchableOpacity
        style={style.orderButton}
        onPress={() => props.onBacnkPress()}
      >
        <Text style={style.buttonText}>
          Deliver to this address
        </Text>
      </TouchableOpacity>
    </View>
    <View style={style.confirmButtonView}>
      <TouchableOpacity
        style={style.confirmButton}
        onPress={() => props.onEditPress(props.data.item)}
      >
        <Text style={style.buttonText}>
            Edit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.confirmButton}
        onPress={() => props.onDeletePress(props.data.item)}
      >
        <Text style={style.buttonText}>
            Delete
        </Text>
      </TouchableOpacity>
    </View>
    <View style={[style.dividerLine]} />
  </TouchableOpacity>
);

SelectedAddressListCell.propTypes = {
};

SelectedAddressListCell.defaultProps = {
};

export default SelectedAddressListCell;
