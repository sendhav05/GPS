import React, { PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import _ from 'lodash';
import fontWeight from '../utils/fontWeight';
import { StatusBarHeight } from '../utils/platformSpecific';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    width,
    height: 45,
    marginTop: StatusBarHeight,
    marginLeft: Platform.OS === 'ios' ? 0 : 5,
  },
  innerContainer: {
    width,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 11,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: fontWeight.bold,
    color: '#FA0054',
    fontFamily: 'Nunito-Bold',
  },
  titleText: {
    fontSize: 17,
    fontWeight: fontWeight.bold,
    fontFamily: 'Nunito-Bold',
    color: '#2544A7',
  },
  titleTextContainer: {
    flex: 1.2,
    alignItems: 'center',
  },
  dividerLine: {
    height: 1,
    width,
    backgroundColor: '#BCC2CA',
  },
});

const Header = props => (
  <View style={styles.container} >
    <View style={styles.innerContainer} >
      <View style={{ flex: 0.5 }} >
        <TouchableOpacity
          onPress={props.onCancelClick}
        >
          <Text style={styles.buttonText}>{props.leftBtn}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>{props.title}</Text>
      </View>
      <View style={{ flex: 0.5 }} >
        <TouchableOpacity
          onPress={props.onCancelClick}
        >
          <Text style={styles.buttonText}>{props.rightBtn}</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={[styles.dividerLine]} />
  </View>
);

Header.propTypes = {
  title: PropTypes.string,
  rightBtn: PropTypes.string,
  leftBtn: PropTypes.string,
  onCancelClick: PropTypes.func,
};

Header.defaultProps = {
  title: '',
  rightBtn: '',
  leftBtn: 'Cancel',
  onCancelClick: _.noop,
};

export default Header;
