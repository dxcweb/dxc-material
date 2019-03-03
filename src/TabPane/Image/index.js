import React from 'react';
import Layout from '../Layout';
import Item from '../Item';
export default class index extends React.PureComponent {
  renderItem = (row, chooseData, refresh) => {
    const { onChoose } = this.props;
    return (
      <Item refresh={refresh} onChoose={onChoose} key={row.id} data={row} chooseData={chooseData} />
    );
  };
  render() {
    const { width, chooseData } = this.props;
    return (
      <Layout
        chooseData={chooseData}
        ref={me => (this.layout = me)}
        type="image"
        width={width}
        renderItem={this.renderItem}
      />
    );
  }
}
