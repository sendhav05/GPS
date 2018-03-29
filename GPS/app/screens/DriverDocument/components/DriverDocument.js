import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Images from '../../../assets/images';
import { BlueColor } from '../../../utils/constants';

const { width } = Dimensions.get('window');
const keyboardBehavior = (Platform.OS === 'ios' ? 'position' : null);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    width: 118,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputView: {
    marginTop: 60,
    height: 100,
    justifyContent: 'flex-start',
  },
  forgotPasswordButton: {
    position: 'absolute',
    marginLeft: width - 135,
    marginTop: 115,
    width: 110,
    height: 30,
  },
  forgotPasswordText: {
    color: 'rgba(1,130,168,1)',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 25,

    marginLeft: 50,
    marginRight: 15,
    height: 40,
    width: width - 100,
    borderRadius: 25,
    padding: 10,
    textAlign: 'center',

    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  bodyView: {
    flex: 1,
    marginTop: 110,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(245,172,35,0)',
  },
  phoneNumberTextInput: {
    marginLeft: 30,
    marginRight: 30,
    height: 40,
    width: width - 60,
    marginTop: 30,
    fontSize: 14,
    color: BlueColor,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 25,
    padding: 10,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: 'rgba(255,101,70,1)',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30,
    height: 40,
    width: width - 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  uploadButton: {
    backgroundColor: BlueColor,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30,
    height: 40,
    width: width - 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  supportView: {
    alignItems: 'center',
    width: 110,
    height: 30,
  },
  backButton: {
    marginLeft: 20,
    marginTop: 30,
    height: 40,
    width: 40,
  },
  back: {
    width: 18,
    height: 24,
  },
});

const DriverDocument = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => Keyboard.dismiss()}
  >
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={keyboardBehavior}>
        {/* <TouchableOpacity
          style={styles.backButton}
          onPress={() => props.onBacnkPress()}
        >
          <Image
            style={styles.back}
            resizeMode="contain"
            source={Images.leftBlueArrow}
          />
        </TouchableOpacity> */}
        <View style={styles.bodyView}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={Images.logo}
          />
          <View style={[styles.bodyView, { marginTop: 25 }]}>
            <TextInput
              style={styles.forgotPasswordText}
              placeholder="Driver's License Number"
              placeholderTextColor="rgba(70,64,172,1)"
              onChangeText={dlNumber => props.updateDL(dlNumber)}
              value={props.dlNumber}
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={styles.forgotPasswordText}
              placeholder="SSN"
              placeholderTextColor="rgba(70,64,172,1)"
              onChangeText={ssnNumber => props.updateSSN(ssnNumber)}
              value={props.ssnNumber}
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={styles.forgotPasswordText}
              placeholder="Address"
              placeholderTextColor="rgba(70,64,172,1)"
              onChangeText={address => props.updateAddress(address)}
              value={props.address}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => props.onUploadPress()}
            >
              <Text style={styles.buttonText}>
                Upload Document  >
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.loginButton, { marginTop: 30 }]}
              onPress={() => props.onNextPress()}
            >
              <Text style={styles.buttonText}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  </TouchableOpacity>
);

DriverDocument.propTypes = {
  onVerifyOTPPress: PropTypes.func,
};

DriverDocument.defaultProps = {
  onVerifyOTPPress: () => {},
};

export default DriverDocument;
