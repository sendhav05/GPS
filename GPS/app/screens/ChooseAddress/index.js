/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
  Dimensions,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../../store';
import runRootSaga from '../../sagas';
import ChooseAddress from './components/ChooseAddress';
import UserActions from '../../actions';
import { connect } from 'react-redux';
import NavBar from '../../components/NavBar';
import Images from '../../assets/images';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


class ChooseAddressView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addLineOne: '',
      addLineTwo: '',
      chooseCity: '',
      pinCode: '',
      landMark: '',
    };
  }

  componentWillReceiveProps(nextProps) {
   
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  onEditOrderPress() {
    console.log('***** onEditOrderPress ');
  }

  updateAddLineOne(value) {
    this.setState({ addLineOne: value });
  }

  updateAddLineTwo(value) {
    this.setState({ addLineTwo: value });
  }

  updateChooseCity(value) {
    this.setState({ chooseCity: value });
  }

  updatePinCode(value) {
    this.setState({ chooseCity: value });
  }

  updateLandMark(value) {
    this.setState({ landMark: value });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          leftMenuIcon={Images.backArrow}
          leftMenuPress={() => this.onBacnkPress()}
          title="Address"
          isShowRightIcon={Boolean(true)}
          rightMenuIcon={Images.editOder}
          rightMenuPress={() => this.onEditOrderPress()}
        />
        <ChooseAddress
          headerTitle="Default Address"
          updateAddLineOne={() => this.updateAddLineOne()}
          addLineOne={this.state.addLineOne}
          updateAddLineTwo={() => this.updateAddLineTwo()}
          addLineTwo={this.state.addLineTwo}
          updateChooseCity={() => this.updateChooseCity()}
          chooseCity={this.state.chooseCity}
          updatePinCode={() => this.updatePinCode()}
          pinCode={this.state.pinCode}
          updateLandMark={() => this.updateLandMark()}
          landMark={this.state.landMark}
        />
      </View>
    );
  }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = () => UserActions;

const ChooseAddressViewScreen = connect(mapStateToProps, mapDispatchToProps)(ChooseAddressView);

export default ChooseAddressViewScreen;
