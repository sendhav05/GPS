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
import WareHouseList from './components/WareHouseList';
import UserActions from '../../actions';
import WareHouseListCell from './components/WareHouseListCell';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';

class WareHouseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
    };
  }

  componentDidMount() {
    const utils = new Utils();
    utils.checkInternetConnectivity((reach) => {
      if (reach) {
        this.props.fetchWareHouseRequest();
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading
      && nextProps.wareHouseResponse.response
      && nextProps.wareHouseResponse.status === 200) {
      // && nextProps.wareHouseResponse.response.status === 1) {
      if (nextProps.wareHouseResponse.response.data.length > 0) {
        this.setState({ dataArray: nextProps.wareHouseResponse.response.data });
      } else {
        showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
      }
    } else if (!nextProps.isLoading && nextProps.wareHouseResponse.response
      && (nextProps.wareHouseResponse.status !== 200
      || nextProps.wareHouseResponse.response.status !== 1)) {
      if (nextProps.wareHouseResponse.response.message && typeof nextProps.wareHouseResponse.response.message === 'string') {
        showPopupAlert(nextProps.wareHouseResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  onCellSelectionPress(selectedItem) {
    const { navigate } = this.props.navigation;
    navigate('CategoryList', { selectedWareHouseItem: selectedItem });
  }

  onLeftMenuPress() {
    const { navigate } = this.props.navigation;
    navigate('DrawerOpen');
  }

  getRenderRow(item) {
    return (
      <WareHouseListCell
        data={item}
        onCellSelectionPress={selectedItem => this.onCellSelectionPress(selectedItem)}
      />

    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WareHouseList
          onLeftMenuPress={() => this.onLeftMenuPress()}
          getRenderRow={item => this.getRenderRow(item)}
          dataArray={this.state.dataArray}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.wareHouse.isLoading,
  wareHouseResponse: state.wareHouse.wareHouseResponse,
});

const mapDispatchToProps = () => UserActions;

const WareHouseViewScreen = connect(mapStateToProps, mapDispatchToProps)(WareHouseView);

export default WareHouseViewScreen;

