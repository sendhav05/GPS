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
import CategoryList from './components/CategoryList';
import UserActions from '../../actions';
import CategoryListCell from './components/CategoryListCell';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';

class CategoryView extends Component {
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
        this.props.fetchCategoryRequest(this.props.navigation.state.params.selectedWareHouseItem.warehouse_id);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  componentWillReceiveProps(nextProps) {

    if (!nextProps.isLoading
      && nextProps.categoryListResponse.response
      && nextProps.categoryListResponse.status === 200) {
      // && nextProps.categoryListResponse.response.status === 1) {
      if (nextProps.categoryListResponse.response.data.length > 0) {
        this.setState({ dataArray: nextProps.categoryListResponse.response.data });
      } else {
        showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
      }
    } else if (!nextProps.isLoading && nextProps.categoryListResponse.response
      && (nextProps.categoryListResponse.status !== 200
      || nextProps.categoryListResponse.response.status !== 1)) {
      if (nextProps.categoryListResponse.response.message && typeof nextProps.categoryListResponse.response.message === 'string') {
        showPopupAlert(nextProps.categoryListResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  onCellSelectionPress(selectedItem) {
    const { navigate } = this.props.navigation;
    navigate('ProductList', { selectedCategoryItem: selectedItem, warehouse_id: this.props.navigation.state.params.selectedWareHouseItem.warehouse_id });
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  getRenderRow(item) {
    return (
      <CategoryListCell
        data={item}
        onCellSelectionPress={selectedItem => this.onCellSelectionPress(selectedItem)}
      />

    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CategoryList
          onBacnkPress={() => this.onBacnkPress()}
          getRenderRow={item => this.getRenderRow(item)}
          dataArray={this.state.dataArray}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.category.isLoading,
  categoryListResponse: state.category.categoryListResponse,
});

const mapDispatchToProps = () => UserActions;

const CategoryViewScreen = connect(mapStateToProps, mapDispatchToProps)(CategoryView);

export default CategoryViewScreen;

