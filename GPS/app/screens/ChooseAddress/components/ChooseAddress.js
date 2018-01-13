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
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  textInput: {
    marginLeft: 15,
    marginRight: 15,
    height: 40,
    width: width - 30,
    marginTop: 15,
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
  orderButton: {
    backgroundColor: OrangeColor,
    marginLeft: 15,
    marginRight: 15,
    height: 40,
    width: width - 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
});

const ChooseAddress = props => (
  <View style={styles.bodyView}>
    <View style={styles.cellView}>
      <TextInput
        style={styles.textInput}
        placeholder="Address"
        placeholderTextColor={BlueColor}
        onChangeText={addLineOne => props.updateAddLineOne(addLineOne)}
        value={props.addLineOne}
        underlineColorAndroid="transparent"
        autoCapitalize="characters"
        autoCorrect={Boolean(true)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Landmark"
        placeholderTextColor={BlueColor}
        onChangeText={landMark => props.updateLandMark(landMark)}
        value={props.landMark}
        underlineColorAndroid="transparent"
        autoCapitalize="characters"
        autoCorrect={Boolean(true)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="City"
        placeholderTextColor={BlueColor}
        onChangeText={chooseCity => props.updateChooseCity(chooseCity)}
        value={props.chooseCity}
        underlineColorAndroid="transparent"
        autoCapitalize="characters"
        autoCorrect={Boolean(true)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="State"
        placeholderTextColor={BlueColor}
        onChangeText={state => props.updateState(state)}
        value={props.state}
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
    </View>
    <View style={{ flex: 1, marginTop: 50 }}>
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => props.onAddButtonPress()}
      >
        <Text style={styles.buttonText}>
          Add Address
        </Text>
      </TouchableOpacity>
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
