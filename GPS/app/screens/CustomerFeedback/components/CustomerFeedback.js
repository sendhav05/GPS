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
} from 'react-native';
import PropTypes from 'prop-types';
//import StarRating from 'react-native-star-rating';
import Stars from 'react-native-stars';

import Images from '../../../assets/images';
import NavBar from '../../../components/NavBar';
import { BlueColor, OrangeColor, ButtonFontSize, GrayColor, HeaderFontSize, WhiteColor, FontFamilyName } from '../../../utils/constants';


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bodyView: {
    height: 50,
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView: {
    height: 70,
    flexDirection: 'row',
    marginTop: 30,
  },
  phoneNumberTextInput: {
    marginLeft: 30,
    marginRight: 30,
    height: 100,
    width: width - 60,
    marginTop: 15,
    fontSize: 14,
    color: 'rgba(134, 135, 136, 1.0)',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    padding: 10,
    textAlign: 'left',

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  deliveredText: {
    color: 'rgba(134, 135, 136, 1.0)',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  orderButton: {
    backgroundColor: OrangeColor,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 40,
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

const CustomerFeedback = props => (
  <TouchableOpacity
    activeOpacity={1}
    style={{ flex: 1, justifyContent: 'center' }}
    onPress={() => Keyboard.dismiss()}
  >
    <View style={styles.container}>
      <NavBar
        leftMenuIcon={Images.backArrow}
        leftMenuPress={() => props.onBacnkPress()}
        title="Feedback"
        isShowRightIcon={Boolean(false)}
        rightMenuIcon={Images.menu}
      />
      <View style={styles.headerView}>
        <Text style={styles.deliveredText}>
            Rate our service
        </Text>
        
      </View>
      <View style={styles.bodyView}>
        <Stars
          half={false}
          rating={props.starCount}
          update={(rating) => props.ratingChanged(rating)}
          spacing={8}
          starSize={40}
          count={5}
          fullStar={Images.selectedStart}
          emptyStar={Images.unSelectedStart}
          halfStar={Images.unSelectedStart}
        />
      </View>
      <View style={{ width,  marginTop: 30 }}>
        <TextInput
          style={styles.phoneNumberTextInput}
          placeholder="Describe your experience here..."
          placeholderTextColor='rgba(134, 135, 136, 1.0)'
          onChangeText={feedbackMessage => props.updateFeedbackMessage(feedbackMessage)}
          value={props.feedbackMessage}
          underlineColorAndroid="transparent"
          multiline = {true}
          numberOfLines = {4}
          padding={10}
        />
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => props.onSubmitFeedbackPress()}
        >
          <Text style={styles.buttonText}>
            Send Feedback
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>

);

CustomerFeedback.propTypes = {
};

CustomerFeedback.defaultProps = {
};

export default CustomerFeedback;
