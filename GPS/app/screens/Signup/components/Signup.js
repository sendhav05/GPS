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
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Images from '../../../assets/images';
import { BlueColor } from '../../../utils/constants';

const { width } = Dimensions.get('window');

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
    marginTop: 50,
    height: 250,
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
    fontSize: 12,
    fontWeight: '500',
  },
  bodyView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(245,172,35,0)',
  },
  phoneNumberTextInput: {
    marginLeft: 30,
    marginRight: 30,
    height: 40,
    width: width - 60,
    marginTop: 25,
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
    marginTop: 15,
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


const Signup = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => Keyboard.dismiss()}
  >
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => props.onBacnkPress()}
        >
          <Image
            style={styles.back}
            resizeMode="contain"
            source={Images.leftBlueArrow}
          />
        </TouchableOpacity>
        <View style={styles.bodyView}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={Images.logo}
          />
          <View style={styles.textInputView}>
            <TextInput
              style={styles.phoneNumberTextInput}
              placeholder="Name"
              placeholderTextColor="rgba(70,64,172,1)"
              onChangeText={name => props.updateName(name)}
              value={props.name}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.phoneNumberTextInput}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="rgba(70,64,172,1)"
              onChangeText={email => props.updateEmail(email)}
              value={props.email}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.phoneNumberTextInput}
              placeholder="Phone"
              keyboardType="phone-pad"
              placeholderTextColor="rgba(70,64,172,1)"
              onChangeText={phone => props.updatePhone(phone)}
              value={props.phone}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />  
            <TextInput
              style={styles.phoneNumberTextInput}
              placeholder="Passowrd"
              placeholderTextColor="rgba(70,64,172,1)"
              onChangeText={password => props.updatePassword(password)}
              value={props.password}
              underlineColorAndroid="transparent"
              secureTextEntry={Boolean(true)}
              autoCapitalize="none"
            />  
            <TextInput
              style={styles.phoneNumberTextInput}
              placeholder="Confirm Passowrd"
              placeholderTextColor="rgba(70,64,172,1)"
              onChangeText={confirmPassowrd => props.updateConfirmPassword(confirmPassowrd)}
              value={props.confirmPassowrd}
              underlineColorAndroid="transparent"
              secureTextEntry={Boolean(true)}
              autoCapitalize="none"
            />
          </View>
          <View style={[styles.bodyView, { marginTop: 100 }]}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => props.onSignupPress()}
            >
              <Text style={styles.buttonText}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  </TouchableOpacity>
);

Signup.propTypes = {
  onForgotPassowrdPress: PropTypes.func,
};

Signup.defaultProps = {
  onForgotPassowrdPress: () => {},
};

export default Signup;
