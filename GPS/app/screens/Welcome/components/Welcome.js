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
import Images from '../../../assets/images';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    marginTop: 60,
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputView: {
    marginTop: 60,
    height: 100,
    justifyContent: 'flex-start',
  },
  forgotPasswordButton: {
    marginTop: 60,
  },
  forgotPasswordText: {
    color: 'rgba(97,90,188,1)',
    fontSize: 25,
    fontWeight: 900,
    fontWeight: '500',
  },
  bodyView: {
    flex: 1,
    marginTop: 50,
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
});


const Welcome = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => Keyboard.dismiss()}
  >
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={Images.logo}
      />
      <View style={styles.bodyView}>
        <Text style={styles.forgotPasswordText}>
          Welcome To Del!
        </Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => props.onLoginPress()}
        >
          <Text style={styles.buttonText}>
            Customer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => props.onBecomeDriverPress()}
        >
          <Text style={styles.buttonText}>
           Driver
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

Welcome.propTypes = {
  onForgotPassowrdPress: PropTypes.func,
};

Welcome.defaultProps = {
  onForgotPassowrdPress: () => {},
};

export default Welcome;
