import React from 'react';
import Layout from '../Layout';
import Item from '../Item';
export default class index extends React.PureComponent {
  renderImage = ({ url }) => {
    return (
      <img
        alt=""
        src={`${url}?vframe/jpg/offset/0`}
        style={{ display: 'block', maxHeight: '100%', maxWidth: '100%' }}
      />
    );
  };
  renderItem = (row, chooseData, refresh) => {
    const { onChoose } = this.props;
    return (
      <Item
        onChoose={onChoose}
        refresh={refresh}
        chooseData={chooseData}
        renderImage={this.renderImage}
        key={row.id}
        data={row}
      />
    );
  };
  render() {
    const { width, chooseData } = this.props;
    return (
      <Layout
        chooseData={chooseData}
        ref={me => (this.layout = me)}
        type="video"
        width={width}
        renderItem={this.renderItem}
      />
    );
  }
}
