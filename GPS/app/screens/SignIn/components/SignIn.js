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
    fontSize: 12,
    fontWeight: '500',
  },
  bodyView: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(245,172,35,0)',
  },
  phoneNumberTextInput: {
    marginLeft: 30,
    marginRight: 30,
    height: 40,
    width: width - 60,
    marginTop: 15,
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


const SignIn = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => Keyboard.dismiss()}
  >
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={keyboardBehavior} scroll>
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
              placeholder="Email or Phone"
              placeholderTextColor="rgba(70,64,172,1)"
              color="rgba(70,64,172,1)"
              onChangeText={emailPhoneNumber => props.updateEmailPhoneNumber(emailPhoneNumber)}
              value={props.emailPhoneNumber}
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={styles.phoneNumberTextInput}
              placeholder="Passowrd"
              placeholderTextColor="rgba(70,64,172,1)"
              color="rgba(70,64,172,1)"
              onChangeText={password => props.updatePassword(password)}
              value={props.password}
              underlineColorAndroid="transparent"
              secureTextEntry={Boolean(true)}
            />
            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => props.onForgotPassowrdPress()}
            >
              <Text style={styles.forgotPasswordText}>
                forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.bodyView, { marginTop: 50 }]}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => props.onLoginPress()}
            >
              <Text style={styles.buttonText}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => props.onBecomeDriverPress()}
            >
              <Text style={styles.buttonText}>
                { props.isFromCustomer ? 'Register' : 'Become a Driver' }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  </TouchableOpacity>
);

SignIn.propTypes = {
  onForgotPassowrdPress: PropTypes.func,
};

SignIn.defaultProps = {
  onForgotPassowrdPress: () => {},
};

export default SignIn;
