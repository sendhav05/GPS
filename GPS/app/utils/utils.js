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
    };
    call(args).catch(console.error);
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

  distanceBetweenCord(lat1, lon1, lat2, lon2, isMiles) {
    function toRad(x) {
      return x * Math.PI / 180;
    }

    const R = 6371; // km
    const x1 = lat2 - lat1;
    const dLat = toRad(x1);
    const x2 = lon2 - lon1;
    const dLon = toRad(x2);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    if (isMiles) d /= 1.60934;
    return d;
  }

  convertDateToString(date) {
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    const year = date.getFullYear();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    let hours = date.getHours();
    let strDate = [month, day, year].join('-');
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const datetime = `${strDate} - ${hours} ${ampm}`
    return datetime;
  }

}

export default Utils;
