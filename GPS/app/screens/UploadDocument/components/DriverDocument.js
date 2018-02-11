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
import NavBar from '../../../components/NavBar';

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
    flex: 1,
    width: width - 30,
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIconSyle: {
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: 'rgba(1,130,168,1)',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 25,
  },
  bodyView: {
    flex: 1,
  },
  cellView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIconView: {
    width: width - 30,
    height: 50,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
  },
  uploadButton: {
    flex: 1,
    marginLeft: 180,
    marginTop: 4,
    position: 'absolute',
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
  <View style={styles.container}>
    <NavBar
      leftMenuIcon={Images.backArrow}
      leftMenuPress={() => props.onBacnkPress()}
      title="Documents"
      isShowRightIcon={Boolean(false)}
      rightMenuIcon={Images.editOder}
      rightMenuPress={() => props.onEditOrderPress()}
    />
    <View style={styles.bodyView}>
      <View style={styles.cellView}>
        <View style={styles.plusIconView}>
          <Text style={styles.forgotPasswordText}>
              Driving License
          </Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => props.takePicture(0)}
          >
            <Image
              style={styles.plusIconSyle}
              resizeMode="contain"
              source={Images.addIcon}
            />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={props.dlImage}
        />
      </View>
      <View style={styles.cellView}>
        <View style={styles.plusIconView}>
          <Text style={styles.forgotPasswordText}>
              Insurance
          </Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => props.takePicture(1)}
          >
            <Image
              style={styles.plusIconSyle}
              resizeMode="contain"
              source={Images.addIcon}
            />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={props.sslImage}
        />
      </View>
      <View style={styles.cellView}>
        <View style={styles.plusIconView}>
          <Text style={styles.forgotPasswordText}>
              Certificate of Registration
          </Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => props.takePicture(2)}
          >
            <Image
              style={styles.plusIconSyle}
              resizeMode="contain"
              source={Images.addIcon}
            />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={props.rcImage}
        />
      </View>
    </View>
  </View>
);

DriverDocument.propTypes = {
  takePicture: PropTypes.func,
};

DriverDocument.defaultProps = {
  takePicture: () => {},
};

export default DriverDocument;
