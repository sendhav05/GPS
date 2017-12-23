import { Component } from 'react';
import { AsyncStorage, NetInfo } from 'react-native';

class Utils extends Component {
  constructor() {
    super();
    this.state = {};
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

  checkInternetConnectivity(action) {
    NetInfo.isConnected.fetch().then((isConnected) => {
      action(isConnected);
    });
  }
}

export default Utils;
