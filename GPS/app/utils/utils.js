import { Component } from 'react';
import { AsyncStorage, NetInfo } from 'react-native';

class Utils extends Component {
  constructor() {
    super();
    this.state = {};
  }

  setFlowFromCustomer(value) {
    AsyncStorage.setItem('IS_FROM_CUSTOMER', JSON.stringify(value));
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
