import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SignIn = (props) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to SignIn Screen!
    </Text>
    <TouchableOpacity onPress={() => {props.onButtonClick()}}>
      <Text style={styles.instructions}>
        Sign In Button
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default SignIn;
