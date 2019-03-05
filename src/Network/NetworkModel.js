import React from 'react';
import Model from '../Model';
import Button from 'antd/lib/button';
import Radio from 'antd/lib/radio';
import Block from 'dxc-flex';
export default class NetworkModel extends React.PureComponent {
  aa = (ccc) => {
    const a = {
      a: 1,
      b: 2,
    };
  };
  render() {
    const { onClose } = this.props;
    return (
      <Model maxWidth={600}>
        <Block vertical="center" style={{ height: 45, fontSize: 14, padding: '0 16px', borderBottom: '1px solid #e8e8e8' }}>
          <div style={{ flex: 1 }}>网络素材</div>
          <div style={{ fontSize: 12 }}>网络素材稳定性不可控，尽量下载后重新上传</div>
        </Block>
        <div>
          <Radio.Group onChange={this.handleSizeChange}>
            <Radio.Button value="large">图片</Radio.Button>
            <Radio.Button value="default">音频</Radio.Button>
            <Radio.Button value="small">视频</Radio.Button>
          </Radio.Group>
        </div>
        <Block horizontal="center" vertical="center" style={{ height: 50, borderTop: '1px solid #e8e8e8' }}>
          <Button onClick={onClose} style={{ width: 120, marginRight: 10 }}>
            取消
          </Button>
          <Button onClick={this.onConfirm} style={{ width: 120, marginLeft: 10 }} type="primary">
            确定
          </Button>
        </Block>
      </Model>
    );
  }
}
