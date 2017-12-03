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
    marginTop: 20,
    width: 180,
    height: 90,
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
    fontSize: 11,
    fontWeight: '400',
  },
  bodyView: {
    flex: 1,
    marginTop: 70,
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
    color: 'black',
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
});

const VerifyOTP = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => Keyboard.dismiss()}
  >
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={keyboardBehavior}>
        <View style={styles.bodyView}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={Images.logo}
          />
          <View style={styles.bodyView}>
            <Text style={styles.forgotPasswordText}>
              Mobile Number Verification
            </Text>
            <TextInput
              style={styles.phoneNumberTextInput}
              placeholder="Enter OTP"
              placeholderTextColor="rgba(70,64,172,1)"
              color="rgba(70,64,172,1)"
              onChangeText={otpNumber => props.updateOTPNumber(otpNumber)}
              value={props.otpNumber}
              keyboardType="number-pad"
              underlineColorAndroid="transparent"
              secureTextEntry={Boolean(true)}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => props.onVerifyOTPPress()}
            >
              <Text style={styles.buttonText}>
                Verify
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => props.onResendOTPPress()}
            >
              <Text style={styles.buttonText}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  </TouchableOpacity>
);

VerifyOTP.propTypes = {
  onVerifyOTPPress: PropTypes.func,
};

VerifyOTP.defaultProps = {
  onVerifyOTPPress: () => {},
};

export default VerifyOTP;
