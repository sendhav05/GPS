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
} from 'react-native';
import PropTypes from 'prop-types';
import Images from '../../../assets/images';
import NavBar from '../../../components/NavBar';
import { BlueColor, OrangeColor, ButtonFontSize, GrayColor, HeaderFontSize, WhiteColor, FontFamilyName } from '../../../utils/constants';
import images from '../../../assets/images';

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
  topView: {
    height: 120,
    marginTop: 10,
  },
  cellView: {
    height: 50,
    width,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  productCountText: {
    color: blueTextColor,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 20,
  },
  vehicleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 15
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
});

const Settings = props => (
  <View style={styles.container}>
    <NavBar
      leftMenuIcon={Images.backArrow}
      leftMenuPress={() => props.onLeftMenuPress()}
      title="Settings"
      isShowRightIcon={Boolean(false)}
      rightMenuIcon={Images.editOder}
    />
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
          Upload Vehicle
        </Text>
      </View>
     <View style={styles.topView}>
        <TouchableOpacity
          onPress={() => props.onInviteToFriends()}
        >
          <View style={styles.cellView}>
            <Image style={styles.rightNavBarIcon} source={images.profileimg} />
            <Text style={styles.productCountText}>
              Profile
            </Text>
            <Text style={[styles.productCountText, { position: 'absolute', right: 30 }]}>
              >
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onHistryPress()}
        >
          <View style={styles.cellView}>
            <Image style={styles.rightNavBarIcon} source={images.like} />
            <Text style={styles.productCountText}>
              Feedback
            </Text>
            <Text style={[styles.productCountText, { position: 'absolute', right: 30 }]}>
              >
            </Text>
          </View>
        </TouchableOpacity>
    </View>
    <View style={styles.bodyView}>
    </View>
  </View>
);

Settings.propTypes = {
};

Settings.defaultProps = {
};

export default Settings;
