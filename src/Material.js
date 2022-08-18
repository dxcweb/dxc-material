import React from "react";
import Model from "./Model";
import Block from "dxc-flex";
import Tabs from "antd/lib/tabs";
import Button from "antd/lib/button";
import Upload from "./Upload";
import ListenerWidth from "./ListenerWidth";
import Image from "./TabPane/Image";
import Audio from "./TabPane/Audio";
import Video from "./TabPane/Video";
// import Network from './Network';

import "antd/dist/antd.less";
import "antd/lib/tabs/style";
import "antd/lib/button/style";
import "antd/lib/tooltip/style";

const TabPane = Tabs.TabPane;

export default class Material extends React.PureComponent {
  state = {
    open: false,
    activeKey: "image",
    width: 0,
    chooseData: null,
  };
  componentDidMount() {
    const { setOpenFun } = this.props;
    setOpenFun && setOpenFun(this.onOpen);
  }
  onOpen = (activeKey) => {
    const data = { open: true, chooseData: null };
    if (activeKey) {
      data.activeKey = activeKey;
    }
    this.setState(data);
  };
  onCancel = () => {
    const { onChange } = this.props;
    onChange && onChange(false);
    this.setState({ open: false });
  };
  onConfirm = () => {
    const { type, url } = this.state.chooseData;
    const data = { type };
    if (type === "image") {
      data.url = url;
    } else if (type === "video") {
      data.url = url;
      data.poster = `${url}?vframe/jpg/offset/0`;
    } else {
      data.url = url;
    }
    const { onChange } = this.props;
    onChange && onChange(data);
    this.setState({ open: false });
  };
  onChangeTabs = (activeKey) => {
    this.setState({ activeKey });
  };
  onChangeWidth = (width) => {
    this.setState({ width });
  };
  onChangeUpload = (action, data) => {
    this.setState({ activeKey: data.type });
    switch (data.type) {
      case "image":
        this.image.layout.uploadCallback(action, data);
        break;
      case "audio":
        this.audio.layout.uploadCallback(action, data);
        break;
      case "video":
        this.video.layout.uploadCallback(action, data);
        break;
      default:
        break;
    }
  };
  onChoose = (chooseData) => {
    const oldData = this.state.chooseData;
    if (oldData && oldData.id === chooseData.id) {
      this.setState({ chooseData: null });
    } else {
      this.setState({ chooseData });
    }
  };
  render() {
    const { open, activeKey, width, chooseData } = this.state;
    if (!open) {
      return null;
    }
    const {uploadLimit}=this.props

    return (
      <Model>
        <Tabs
          onChange={this.onChangeTabs}
          animated={false}
          activeKey={activeKey}
          tabBarExtraContent={
            <Block vertical="center" style={{ height: 45, marginRight: 10, marginLeft: 10 }}>
              {/* <Network /> */}
              <Upload uploadLimit={uploadLimit} onChange={this.onChangeUpload} />
            </Block>
          }
        >
          <TabPane tab="图片" key="image">
            <Image chooseData={chooseData} onChoose={this.onChoose} width={width} ref={(me) => (this.image = me)} />
          </TabPane>
          <TabPane tab="音频" key="audio">
            <Audio chooseData={chooseData} onChoose={this.onChoose} width={width} ref={(me) => (this.audio = me)} />
          </TabPane>
          <TabPane tab="视频" key="video">
            <Video chooseData={chooseData} onChoose={this.onChoose} width={width} ref={(me) => (this.video = me)} />
          </TabPane>
        </Tabs>
        <ListenerWidth onChange={this.onChangeWidth} />
        <Block horizontal="center" vertical="center" style={{ height: 50, borderTop: "1px solid #e8e8e8" }}>
          <Button onClick={this.onCancel} style={{ width: 120, marginRight: 10 }}>
            取消
          </Button>
          <Button disabled={!chooseData} onClick={this.onConfirm} style={{ width: 120, marginLeft: 10 }} type="primary">
            {chooseData ? "确认" : "请选择"}
          </Button>
        </Block>
      </Model>
    );
  }
}
