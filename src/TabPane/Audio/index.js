import React from "react";
import Layout from "../Layout";
import Item from "../Item";
const audioImg = "https://oss.tuobacco.com/wop2/2019-02-26/5c74d64ce942a.png?x-oss-process=image/quality,q_99/format,png";
export default class index extends React.PureComponent {
  renderImage = () => {
    return <img alt="" src={audioImg} style={{ display: "block", width: 80 }} />;
  };
  renderItem = (row, chooseData, refresh) => {
    const { onChoose } = this.props;
    return <Item onChoose={onChoose} refresh={refresh} chooseData={chooseData} renderImage={this.renderImage} key={row.id} data={row} />;
  };
  render() {
    const { width, chooseData } = this.props;
    return <Layout chooseData={chooseData} ref={(me) => (this.layout = me)} type="audio" width={width} renderItem={this.renderItem} />;
  }
}
