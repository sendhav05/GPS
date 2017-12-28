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
    const data = {
      addLineOne: this.state.addLineOne,
      addLineTwo: this.state.addLineTwo,
      chooseCity: this.state.chooseCity,
      pinCode: this.state.pinCode,
      landMark: this.state.landMark,
    };
    const { goBack } = this.props.navigation;
    goBack(null);
    this.props.navigation.state.params.onSelectAddress({ data });
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
    this.setState({ pinCode: value });
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
          updateAddLineOne={addLineOne => this.updateAddLineOne(addLineOne)}
          addLineOne={this.state.addLineOne}
          updateAddLineTwo={addLineTwo => this.updateAddLineTwo(addLineTwo)}
          addLineTwo={this.state.addLineTwo}
          updateChooseCity={chooseCity => this.updateChooseCity(chooseCity)}
          chooseCity={this.state.chooseCity}
          updatePinCode={pinCode => this.updatePinCode(pinCode)}
          pinCode={this.state.pinCode}
          updateLandMark={landMark => this.updateLandMark(landMark)}
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
