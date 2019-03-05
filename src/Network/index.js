import React from 'react';
import Button from 'antd/lib/button';
import NetworkModel from './NetworkModel';
export default class Network extends React.PureComponent {
  state = {
    open: false,
  };
  onOpen = () => {
    this.setState({ open: true });
  };
  onClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { open } = this.state;
    return (
      <React.Fragment>
        <Button onClick={this.onOpen} style={{ marginRight: 10 }}>
          网络
        </Button>
        {open ? <NetworkModel onClose={this.onClose} /> : null}
      </React.Fragment>
    );
  }
}
