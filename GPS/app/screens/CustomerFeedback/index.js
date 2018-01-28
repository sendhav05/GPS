/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import CustomerFeedback from './components/CustomerFeedback';
import UserActions from '../../actions';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';
import call from 'react-native-phone-call'

class CustomerFeedbackView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      starCount: 0,
      region: {
        latitude: 22.862824,
        longitude: 75.881695,
        latitudeDelta: 0.722,
        longitudeDelta: 0.421,
      },
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

   onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  onSubmitFeedbackPress() {
    
  }

  ratingChanged(rating) {
    console.log('****** rating', rating);
    this.setState({ starCount: rating });

  }

  updateFeedbackMessage(feedbackMessage) {
    this.setState({ feedbackMessage });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomerFeedback
          onBacnkPress={() => this.onBacnkPress()}
          onSubmitFeedbackPress={() => this.onSubmitFeedbackPress()}
          ratingChanged={rating => this.ratingChanged(rating)}
          updateFeedbackMessage={feedbackMessage => this.updateFeedbackMessage(feedbackMessage)}
          feedbackMessage={this.state.feedbackMessage}
          starCount={this.state.starCount}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = () => UserActions;

const CustomerFeedbackViewScreen = connect(mapStateToProps, mapDispatchToProps)(CustomerFeedbackView);

export default CustomerFeedbackViewScreen;

