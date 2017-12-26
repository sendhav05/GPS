import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Images from '../../../assets/images';
import NavBar from '../../../components/NavBar';
import { BlueColor, OrangeColor, ButtonFontSize, GrayColor, HeaderFontSize, WhiteColor } from '../../../utils/constants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  bodyView: {
    width,
    height: 200,
    justifyContent: 'flex-start',
  },
  cellView: {
    width,
    height: 250,
    justifyContent: 'flex-start',
  },
  textInput: {
    marginLeft: 15,
    marginRight: 15,
    height: 40,
    width: width - 30,
    marginTop: 10,
    fontSize: ButtonFontSize,
    color: BlueColor,
    borderWidth: 1,
    borderColor: GrayColor,
    borderRadius: 25,
    padding: 10,
    textAlign: 'center',
  },
  headerText: {
    color: BlueColor,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
    marginLeft: 15,
  },
});

const ChooseAddress = props => (
  <View style={styles.bodyView}>
    <Text style={styles.headerText}>
      {props.headerTitle}
    </Text>
    <View style={styles.cellView}>
      <TextInput
        style={styles.textInput}
        placeholder="Address Line 1"
        placeholderTextColor={BlueColor}
        onChangeText={addLineOne => props.updateAddLineOne(addLineOne)}
        value={props.addLineOne}
        underlineColorAndroid="transparent"
        autoCapitalize="characters"
        autoCorrect={Boolean(true)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Address Line 1"
        placeholderTextColor={BlueColor}
        onChangeText={addLineTwo => props.updateAddLineTwo(addLineTwo)}
        value={props.addLineTwo}
        underlineColorAndroid="transparent"
        autoCapitalize="characters"
        autoCorrect={Boolean(true)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Choose City"
        placeholderTextColor={BlueColor}
        onChangeText={chooseCity => props.updateChooseCity(chooseCity)}
        value={props.chooseCity}
        underlineColorAndroid="transparent"
        autoCapitalize="characters"
        autoCorrect={Boolean(true)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Pin Code"
        placeholderTextColor={BlueColor}
        onChangeText={pinCode => props.updatePinCode(pinCode)}
        value={props.pinCode}
        keyboardType="numeric"
        underlineColorAndroid="transparent"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter Land Mark"
        placeholderTextColor={BlueColor}
        onChangeText={landMark => props.updateLandMark(landMark)}
        value={props.landMark}
        underlineColorAndroid="transparent"
        autoCapitalize="characters"
        autoCorrect={Boolean(true)}
      />
    </View>
  </View>
);

ChooseAddress.propTypes = {
  onForgotPassowrdPress: PropTypes.func,
};

ChooseAddress.defaultProps = {
  onForgotPassowrdPress: () => {},
};

export default ChooseAddress;
