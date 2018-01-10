import { Component } from 'react';
import { AsyncStorage, NetInfo } from 'react-native';


class Utils extends Component {
  constructor() {
    super();
    this.state = {};
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
}

export default Utils;
