/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Provider } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { store } from '../../store';
import runRootSaga from '../../sagas';
import MenuCell from './components/MenuCell';
import UserActions from '../../actions';
import Images from '../../assets/images';
import { connect } from 'react-redux';

import { BlueColor, OrangeColor, ButtonFontSize, GrayColor, HeaderFontSize, WhiteColor, FontFamilyName } from '../../utils/constants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WhiteColor,
    width: width - 40,
  },
  logo: {
    marginTop: 50,
    width: 118,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyView: {
    flex: 1,
    width: width - 40,
    marginTop: 90,
    backgroundColor: OrangeColor,
  },
  flatListStyle: {
    flex: 1,
    width: width - 40,
    marginTop: 30,
    backgroundColor: OrangeColor,
  },
});

class CustomerMenuView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftMenuItems: [{ icon: Images.home, name: 'Home' }, { icon: Images.order, name: 'Orders' }],
    };
  }

  onCellSelectionPress(selectedItem) {
    console.log('********** selectedItem', selectedItem);
    this.props.toggleDrawer();   
    // const resetAction = NavigationActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({ routeName: 'CustomerHome' }),
    //   ],
    // });
    // this.props.navigation.dispatch(resetAction);
  }

  getRenderRow(item) {
    return (
      <MenuCell
        data={item}
        onCellSelectionPress={selectedItem => this.onCellSelectionPress(selectedItem)}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={Images.logo}
        />
        <View style={styles.bodyView}>
          <FlatList
            style={styles.flatListStyle}
            data={this.state.leftMenuItems}
            renderItem={data => this.getRenderRow(data)}
            keyExtractor={item => item.name}
            scrollEnabled={Boolean(false)}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.signIn.isLoading,
});

const mapDispatchToProps = () => UserActions;

const CustomerMenuScreen = connect(mapStateToProps, mapDispatchToProps)(CustomerMenuView);

export default CustomerMenuScreen;
