import React from 'react';
import Block from 'dxc-flex';


export default class Model extends React.PureComponent {
  render() {
    const { maxWidth = 1155 } = this.props;
    return (
      <Block
        id="q132adsasdadasd"
        className="dxc-material"
        horizontal="center"
        vertical="center"
        style={{ position: 'fixed', top: 0, right: 0, left: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.4)', zIndex: 5000 }}
      >
        <div style={{ background: '#fff', width: 'calc(100% - 20px)', maxWidth, borderRadius: 4, position: 'relative' }}>
          <div style={{ position: 'absolute', right: 0 }} />
          {this.props.children}
        </div>
      </Block>
    );
  }
}
