/* eslint-disable react/sort-comp, react/prop-types */

import { Component } from 'react';
import { AsyncStorage, NetInfo } from 'react-native';
import call from 'react-native-phone-call';


class Utils extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onCallPress(phone) {
    const args = {
      number: phone, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call 
    };
    call(args).catch(console.error)
  }

  setCustomerID(value) {
    AsyncStorage.setItem('CUSTOMER_ID', JSON.stringify(value));
  }

  async getCustomerid(action) {
    try {
      const data = await AsyncStorage.getItem('CUSTOMER_ID');
      const parsedData = JSON.parse(data);
      action(parsedData);
    } catch (error) {
      action(null);
    }
  }


  setFlowFromCustomer(value) {
    AsyncStorage.setItem('IS_FROM_CUSTOMER', JSON.stringify(value));
  }

  setDriverID(value) {
    AsyncStorage.setItem('DRIVER_ID', JSON.stringify(value));
  }

  async getDriverID(action) {
    try {
      const data = await AsyncStorage.getItem('DRIVER_ID');
      const parsedData = JSON.parse(data);
      action(parsedData);
    } catch (error) {
      action(null);
    }
  }

  async isFlowFromCustomer(action) {
    try {
      const data = await AsyncStorage.getItem('IS_FROM_CUSTOMER');
      const parsedData = JSON.parse(data);
      action(parsedData);
    } catch (error) {
      action(null);
    }
  }

  checkInternetConnectivity(action) {
    NetInfo.isConnected.fetch().then((isConnected) => {
      action(isConnected);
    });
  }

  async getItemWithKey(key, action) {
    try {
      const data = await AsyncStorage.getItem(key);
      const parsedData = JSON.parse(data);
      action(parsedData);
    } catch (error) {
      action(null);
    }
  }

  async setItemWithKeyAndValue(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default Utils;
