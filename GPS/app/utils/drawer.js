/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import PropTypes from 'prop-types';
import DrawerScreen from '../screens/CustomerMenu';

export class DrawerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDrawer: false,
      isOpenDrawer: false,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.resetReloadFlag = this.resetReloadFlag.bind(this);
  }

  toggleDrawer() {
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  resetReloadFlag() {
    this.setState({ isOpenDrawer: false });
  }

  activityAction() {
  }

  render() {
    return (
      <Drawer
        type={'overlay'}
        content={<DrawerScreen
          toggleDrawer={this.toggleDrawer}
          isOpenDrawer={this.state.isOpenDrawer}
          resetReloadFlag={this.resetReloadFlag}
        />}
        open={this.state.showDrawer}
        openDrawerOffset={40}
        panOpenMask={0.05}
        tapToClose
        onOpen={() => this.setState({ showDrawer: true, isOpenDrawer: true })}
        onClose={() => this.setState({ showDrawer: false, isOpenDrawer: false })}
      >
        {React.createElement(
          this.props.component,
          { ...this.props.reduxProps,
            toggleDrawer: this.toggleDrawer,
            activityAction: this.activityAction,
          })
          }
      </Drawer>
    );
  }
}

DrawerWrapper.propTypes = {
  component: PropTypes.func,
  reduxProps: PropTypes.objectOf(PropTypes.any),
};

DrawerWrapper.defaultProps = {
  component: undefined,
  reduxProps: undefined,
};

export default component => props => <DrawerWrapper component={component} reduxProps={props} />;
