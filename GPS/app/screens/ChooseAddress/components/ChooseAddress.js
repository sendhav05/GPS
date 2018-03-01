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
    flex: 1,
    width,
    justifyContent: 'flex-start',
  },
  cellView: {
    width,
    flex: 1,
    justifyContent: 'flex-start',
  },
  textInput: {
    marginLeft: 50,
    marginTop: 10,
    marginRight: 15,
    height: 40,
    width: width - 100,
    fontSize: ButtonFontSize,
    color: BlueColor,
    borderRadius: 25,
    padding: 10,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  defaultTextInput: {
    marginLeft: 50,
    marginRight: 15,
    height: 40,
    width: width - 100,
    fontSize: ButtonFontSize,
    color: BlueColor,
    borderRadius: 25,
    padding: 10,
    textAlign: 'left',
  },
  newAddressText: {
    marginLeft: 60,
    marginRight: 15,
    height: 25,
    width: width - 100,
    fontSize: ButtonFontSize,
    color: 'rgb(97,97,97)',
    borderRadius: 25,
    textAlign: 'left',
    marginTop: 20,
  },
  textInputNewAddress: {
    marginLeft: 50,
    marginTop: 10,
    marginRight: 15,
    height: 40,
    width: width - 100,
    fontSize: ButtonFontSize,
    color: 'rgb(97,97,97)',
    borderRadius: 25,
    padding: 10,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: 'lightgrey',
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
    marginLeft: 50,
    marginRight: 15,
    height: 40,
    width: width - 100,
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
  profilePic: {
    width: 25,
    height: 25,
    marginLeft: 15,
    marginTop: 22,
    position: 'absolute',
  },
});

const ChooseAddress = props => (
  <View style={styles.bodyView}>
    <View style={styles.cellView}>
      <View style={{ flex: 1 }}>
        {/* <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1, justifyContent: 'center' }}
          onPress={() => props.onCellSelectionPress()}
        >
          <Image
            source={props.isDefaultAddressSelected ? Images.selectedIcon : Images.unselectIcon}
            style={styles.profilePic}
          />
          <Text style={styles.defaultTextInput}>
              Default Address
          </Text>
        </TouchableOpacity> */}
        <Text style={styles.defaultTextInput}>
            Default Address
        </Text>
      </View>
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
        onChangeText={landmark => props.updateLandMark(landmark)}
        value={props.landmark}
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
    <View style={{ flex: 1, justifyContent: 'center', height: 40 }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1, justifyContent: 'center', height: 40 }}
          onPress={() => props.onCellSelectionPress()}
        >
          {/* <Image
            source={props.isDefaultAddressSelected ? Images.selectedIcon : Images.unselectIcon}
            style={styles.profilePic}
          /> */}
          <Text style={[styles.newAddressText,  { color: '#6150b3' }]}>
            Add New Delivery Address
          </Text>
        </TouchableOpacity>
      </View>
      { !props.isDefaultAddressSelected &&
    <View style={[styles.cellView]}>
      <TextInput
        style={styles.textInputNewAddress}
        placeholder="Address"
        placeholderTextColor="rgb(97,97,97)"
        onChangeText={addLineOne => props.supdateAddLineOne(addLineOne)}
        value={props.isDefaultAddressSelected ? props.addLineOne : props.saddLineOne}
        underlineColorAndroid="transparent"
        autoCapitalize="characters"
        autoCorrect={Boolean(true)}
      />
      <TextInput
        style={styles.textInputNewAddress}
        placeholder="Landmark"
        placeholderTextColor="rgb(97,97,97)"
        onChangeText={landmark => props.supdateLandMark(landmark)}
        value={props.isDefaultAddressSelected ? props.landmark : props.slandmark}
        underlineColorAndroid="transparent"
        autoCapitalize="characters"
        autoCorrect={Boolean(true)}
      />
      <TextInput
        style={styles.textInputNewAddress}
        placeholder="City"
        placeholderTextColor="rgb(97,97,97)"
        onChangeText={chooseCity => props.supdateChooseCity(chooseCity)}
        value={props.isDefaultAddressSelected ? props.chooseCity : props.schooseCity}
        underlineColorAndroid="transparent"
        autoCapitalize="characters"
        autoCorrect={Boolean(true)}
      />
      <TextInput
        style={styles.textInputNewAddress}
        placeholder="State"
        placeholderTextColor="rgb(97,97,97)"
        onChangeText={state => props.supdateState(state)}
        value={props.isDefaultAddressSelected ? props.state : props.sstate}
        underlineColorAndroid="transparent"
        autoCapitalize="characters"
        autoCorrect={Boolean(true)}
      />
      <TextInput
        style={styles.textInputNewAddress}
        placeholder="Pin Code"
        placeholderTextColor="rgb(97,97,97)"
        onChangeText={pinCode => props.supdatePinCode(pinCode)}
        value={props.isDefaultAddressSelected ? props.pinCode : props.spinCode}
        keyboardType="numeric"
        underlineColorAndroid="transparent"
      />
    </View>
      }
    <View style={{ flex: 1, marginTop: 15, marginBottom: 10 }}>
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => props.onAddButtonPress()}
      >
        <Text style={styles.buttonText}>
          Save
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
