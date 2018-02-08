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
import ProductList from './components/ProductList';
import UserActions from '../../actions';
import ProductListCell from './components/ProductListCell';
import { showPopupAlert, showPopupAlertWithTile } from '../../utils/showAlert';
import constant from '../../utils/constants';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';

class ProductListView extends Component {
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
        this.props.fetchProductRequest(this.props.navigation.state.params.selectedCategoryItem.category_id);
      } else {
        showPopupAlertWithTile(constant.OFFLINE_TITLE, constant.OFFLINE_MESSAGE);
      }
    });
  }

  componentWillReceiveProps(nextProps) {

    if (!nextProps.isLoading
      && nextProps.productListResponse.response
      && nextProps.productListResponse.status === 200) {
      // && nextProps.productListResponse.response.status === 1) {
      if (nextProps.productListResponse.response.data.length > 0) {
        this.setState({ dataArray: nextProps.productListResponse.response.data });
      } else {
        showPopupAlert(constant.EMPTY_RECORD_MESSAGE);
      }
    } else if (!nextProps.isLoading && nextProps.productListResponse.response
      && (nextProps.productListResponse.status !== 200
      || nextProps.productListResponse.response.status !== 1)) {
      if (nextProps.productListResponse.response.message && typeof nextProps.productListResponse.response.message === 'string') {
        showPopupAlert(nextProps.productListResponse.response.message);
        return;
      }
      showPopupAlert(constant.SERVER_ERROR_MESSAGE);
    }
  }

  onCellSelectionPress(selectedItem) {
    const { navigate } = this.props.navigation;
    navigate('OrderPlace', { selectedProductItem: selectedItem, selectedWareHouseItem: this.props.navigation.state.params.selectedWareHouseItem });
  }

  onBacnkPress() {
    const { goBack } = this.props.navigation;
    goBack(null);
  }

  getRenderRow(item) {
    return (
      <ProductListCell
        data={item}
        onCellSelectionPress={selectedItem => this.onCellSelectionPress(selectedItem)}
      />

    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ProductList
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
  isLoading: state.product.isLoading,
  productListResponse: state.product.productListResponse,
});

const mapDispatchToProps = () => UserActions;

const ProductListViewScreen = connect(mapStateToProps, mapDispatchToProps)(ProductListView);

export default ProductListViewScreen;

