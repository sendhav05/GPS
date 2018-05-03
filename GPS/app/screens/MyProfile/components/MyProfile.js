import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  Keyboard,
  Switch,
} from 'react-native';
import PropTypes from 'prop-types';
import Images from '../../../assets/images';
import NavBar from '../../../components/NavBar';
import { StatusBarHeight, BlueColor, OrangeColor, ButtonFontSize, GrayColor, HeaderFontSize, WhiteColor, FontFamilyName } from '../../../utils/constants';
import images from '../../../assets/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width } = Dimensions.get('window');
const brownOrangeColor = 'rgba(255,101,70,1)';
const blueTextColor = 'rgba(97,90,188,1)';
const DarkGrayColor = '#a9a9a9';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bodyView: {
    flex: 1,
    width,
    marginTop: 10,
  },
  headerView: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    backgroundColor: OrangeColor,
  },
  subHeaderView: {
    right: 20,
    position: 'absolute',
    flexDirection: 'row',
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 50,
    backgroundColor: 'transparent',
  },
  topView: {
    flex: 1,
    marginTop: 10,
  },
  cellView: {
    height: 40,
    width,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  productCountText: {
    color: 'darkgrey',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 10,
    width: 120,
  },
  vehicleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 15
  },
  offlineText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    left: 10,
  },
  rightNavBarIcon: {
    width: 22,
    height: 21,
  },
  profileImageButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 40,
  },
  phoneNumberTextInput: {
    height: 40,
    width: width - 160,
    fontSize: 14,
    color: BlueColor,
    padding: 10,
    textAlign: 'left',
  },
  bodyView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(245,172,35,0)',
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
  headrcontainer: {
    backgroundColor: BlueColor,
    height: 44,
    width,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBarHeight,
  },
  leftNavBarIcon: {
    width: 25,
    height: 22,
  },
  leftNavBarTochable: {
    width: 35,
    height: 44,
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
    left: 10,
    backgroundColor: 'transparent',
  },
  rightNavBarIcon: {
    width: 25,
    height: 22,
    alignSelf: 'center',
  },
  title: {
    fontSize: HeaderFontSize,
    color: WhiteColor,
    alignSelf: 'center',
    fontFamily: FontFamilyName,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 70,

  },
});

const MyProfile = props => (
  <View style={styles.container}>
    <View style={styles.headrcontainer}>
    <TouchableOpacity style={styles.leftNavBarTochable} onPress={() => props.onLeftMenuPress()}>
      <Image style={styles.leftNavBarIcon} source={Images.backArrow} />
    </TouchableOpacity>
    <Text style={styles.title}></Text>
    <View style={styles.subHeaderView}>
        <Switch
          onValueChange = {(value) => props.toggleSwitch(value)}
          value={props.switchValue ? true : false}
        />
        <Text style={styles.offlineText}>
          Offline
        </Text>
      </View>
  </View>
    {/* <NavBar
      leftMenuIcon={Images.backArrow}
      leftMenuPress={() => props.onLeftMenuPress()}
      title="My Profile"
      isShowRightIcon={Boolean(false)}
      rightMenuIcon={Images.editOder}
    /> */}
    <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => Keyboard.dismiss()}
  >
     <KeyboardAwareScrollView>
      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.profileImageButton}
          activeOpacity={0.4}
          onPress={() => props.takePicture()}
        >
          <Image
            style={styles.profileImage}
            source={props.vehicleImg}
          />
        </TouchableOpacity>
        <Text style={styles.vehicleText}>
          {props.name}
        </Text>
      </View>
      {/* <View style={styles.subHeaderView}>
        <Switch
          onValueChange = {(value) => props.toggleSwitch(value)}
          value={props.switchValue ? true : false}
        />
        <Text style={styles.offlineText}>
          Offline
        </Text>
      </View> */}
     <View style={styles.topView}>
      <View style={styles.cellView}>
        <Text style={styles.productCountText}>
          Phone Number :
        </Text>
        <TextInput
          style={styles.phoneNumberTextInput}
          placeholder="Phone Number"
          placeholderTextColor="rgba(70,64,172,1)"
          onChangeText={phoneNumber => props.updatePhoneNumber(phoneNumber)}
          value={props.phoneNumber}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.cellView}>
        <Text style={styles.productCountText}>
          Eamil                 :
        </Text>
        <TextInput
          style={styles.phoneNumberTextInput}
          placeholder="Eamil"
          placeholderTextColor="rgba(70,64,172,1)"
          onChangeText={email => props.updateEmail(email)}
          value={props.email}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.cellView}>
        <Text style={styles.productCountText}>
          SSN                   :
        </Text>
        <TextInput
          style={styles.phoneNumberTextInput}
          placeholder="SSN"
          placeholderTextColor="rgba(70,64,172,1)"
          onChangeText={ssn => props.updatessn(ssn)}
          value={props.ssn}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.cellView}>
        <Text style={styles.productCountText}>
          Address            :
        </Text>
        <TextInput
          style={styles.phoneNumberTextInput}
          multiline = {true}
          placeholder="Address"
          placeholderTextColor="rgba(70,64,172,1)"
          onChangeText={address => props.updatAddress(address)}
          value={props.address}
          numberOfLines={2}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.cellView}>
        <Text style={styles.productCountText}>
          State                 :
        </Text>
        <TextInput
          style={styles.phoneNumberTextInput}
          placeholder="State"
          placeholderTextColor="rgba(70,64,172,1)"
          onChangeText={state => props.updateState(state)}
          value={props.state}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.cellView}>
        <Text style={styles.productCountText}>
          City                   :
        </Text>
        <TextInput
          style={styles.phoneNumberTextInput}
          placeholder="City"
          placeholderTextColor="rgba(70,64,172,1)"
          onChangeText={city => props.updateCity(city)}
          value={props.city}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.cellView}>
        <Text style={styles.productCountText}>
          Zip Code          :
        </Text>
        <TextInput
          style={styles.phoneNumberTextInput}
          placeholder="Zip Code"
          placeholderTextColor="rgba(70,64,172,1)"
          onChangeText={zipcode => props.updateZipcode(zipcode)}
          value={props.zipcode}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={[styles.bodyView]}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => props.onSignupPress()}
        >
          <Text style={styles.buttonText}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAwareScrollView>
  </TouchableOpacity>
  </View>
);

MyProfile.propTypes = {
};

MyProfile.defaultProps = {
};

export default MyProfile;
