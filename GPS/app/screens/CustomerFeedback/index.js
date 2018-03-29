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
import { defaultLat, defaultLng } from '../../utils/constants';

let customerid = '';

class CustomerFeedbackView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      starCount: 0,
      region: {
        latitude: defaultLat,
        longitude: defaultLng,
        latitudeDelta: 0.722,
        longitudeDelta: 0.421,
      },
    };
  }

  componentDidMount() {
    const utils = new Utils();
    utils.getCustomerid((response) => {
      customerid = response;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && nextProps.feedbackResponse.response
      && nextProps.feedbackResponse.status === 200) {
      showPopupAlert('Your feedback send successfully.');
      const { goBack } = this.props.navigation;
      goBack(null);
    } else if (!nextProps.isLoading && nextProps.feedbackResponse.response
      && (nextProps.feedbackResponse.status !== 200
      || nextProps.feedbackResponse.response.status !== 1)) {
      if (nextProps.feedbackResponse.response.message && typeof nextProps.feedbackResponse.response.message === 'string') {
        showPopupAlert(nextProps.feedbackResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

   onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  onSubmitFeedbackPress() {
    const navigationParams = this.props.navigation.state.params;

    const type = 1;
    orderid = navigationParams.selectedOrderItem.order_id;
    driverid = navigationParams.selectedOrderItem.confirmed_by_driver;

    const utils = new Utils();

    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        this.props.feedbackRequest(type, orderid, customerid, driverid, this.state.feedbackMessage, this.state.starCount);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
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
  isLoading: state.feedback.isLoading,
  feedbackResponse: state.feedback.feedbackResponse,
});

const mapDispatchToProps = () => UserActions;

const CustomerFeedbackViewScreen = connect(mapStateToProps, mapDispatchToProps)(CustomerFeedbackView);

export default CustomerFeedbackViewScreen;

