import React from "react";
import Block from "dxc-flex";
import Icon from "antd/lib/icon";
import Tooltip from "antd/lib/tooltip";
import axios from "../axios";
export default class Item extends React.Component {
  state = {
    status: null,
  };
  componentDidMount() {
    const { status } = this.props.data;
    if (status === 1) {
      this.refreshMe();
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { chooseData, data } = this.props;
    const id = chooseData ? chooseData.id : null;
    const nextId = nextProps.chooseData ? nextProps.chooseData.id : null;
    if (id !== nextId) {
      if (id === data.id || nextId === data.id) {
        return true;
      }
    } else if (nextProps.data !== this.props.data) {
      return true;
    } else if (this.state.status !== nextState.status) {
      return true;
    }
    return false;
  }
  componentDidUpdate(prevProps) {
    const { status } = this.props.data;
    const prevStatus = prevProps.data.status;
    if (status !== prevStatus) {
      if (status === 1) {
        // 进入制作中
        this.refreshMe();
      } else if (prevStatus === 1) {
        // 制作中完成
        clearTimeout(this.refreshMeTimeout);
      }
    }
  }
  componentWillUnmount() {
    clearTimeout(this.refreshMeTimeout);
  }
  refreshMe = () => {
    this.refreshMeTimeout = setTimeout(() => {
      const { md5 } = this.props.data;
      axios.post("/Upload/getStatus", { md5 }).then((res) => {
        if (res.status === 200) {
          const { result, data } = res.data;
          if (result) {
            if (data.status === 1) {
              this.refreshMe();
            } else if (data.status === 2) {
              this.setState({ status: 2 });
            }
          }
        }
      });
    }, 1000);
  };
  renderUpload = () => {
    const { percent = 0 } = this.props.data;
    if (percent === 100) {
      return this.renderMask();
    }
    return (
      <Block horizontal="center" vertical="center" style={{ height: 150, background: "#e6e6e6" }}>
        <div>
          <div>上传中</div>
          <div style={{ textAlign: "center" }}>{percent}%</div>
        </div>
      </Block>
    );
  };
  open = () => {
    const { url } = this.props.data;
    window.open(url);
  };
  onDel = () => {
    const { refresh, data } = this.props;
    const { id } = data;
    axios.post("/Upload/del", { id }).then((res) => {
      if (res.status === 200) {
        refresh && refresh();
      }
    });
  };
  onChoose = () => {
    const { onChoose, data } = this.props;
    if (data.status === 0) {
      // 上传中禁止选择
      return;
    }
    onChoose && onChoose(data);
  };
  renderMask = () => {
    return (
      <Block horizontal="center" vertical="center" style={{ height: 150, background: "#e6e6e6" }}>
        <div>制作中</div>
      </Block>
    );
  };
  renderShow = () => {
    const { data } = this.props;
    const { url } = data;
    const { renderImage } = this.props;
    return (
      <Block style={{ width: "100%", height: 144, cursor: "pointer" }} vertical="center" horizontal="center" onClick={this.onChoose}>
        {renderImage ? renderImage(data) : <img alt="" src={`${url}?imageView2/1/w/242/h/144`} style={{ display: "block", maxHeight: "100%", maxWidth: "100%" }} />}
      </Block>
    );
  };
  renderContent = () => {
    const status = this.state.status ? this.state.status : this.props.data.status;
    switch (status) {
      case 0:
        return this.renderUpload();
      case 1:
        return this.renderMask();
      case 2:
        return this.renderShow();
      default:
        return null;
    }
  };
  render() {
    const { chooseData, data } = this.props;
    const { file_name, id } = data;
    const selected = chooseData && chooseData.id === id ? true : false;
    const border = selected ? "3px solid #ffbd10" : "3px solid #fff";
    return (
      <div
        style={{
          border,
          borderRadius: 4,
          width: 270,
          height: 210,
          fontSize: 12,
          marginRight: 15,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            border: "1px solid #dddddd",
            height: "100%",
            padding: 10,
            borderRadius: 2,
          }}
        >
          {this.renderContent()}
          <Block vertical="center" style={{ border: "1px solid #dddddd", borderRadius: 4, height: 28, marginTop: 10 }}>
            <Block
              vertical="center"
              style={{
                padding: "0 5px",
                borderRight: "1px solid #dddddd",
                height: "100%",
                flex: 1,
                overflow: "hidden",
              }}
            >
              <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file_name}</div>
            </Block>
            <Tooltip title="删除(只删除记录,链接还能继续使用)" overlayStyle={{ zIndex: 5001, fontSize: 12 }}>
              <div
                onClick={this.onDel}
                style={{
                  width: 28,
                  textAlign: "center",
                  borderRight: "1px solid #dddddd",
                  cursor: "pointer",
                }}
              >
                <Icon type="delete" />
              </div>
            </Tooltip>
            <Tooltip title="预览" overlayStyle={{ zIndex: 5001, fontSize: 12 }}>
              <div onClick={this.open} style={{ width: 28, textAlign: "center", cursor: "pointer" }}>
                <Icon type="zoom-in" />
              </div>
            </Tooltip>
          </Block>
        </div>
      </div>
    );
  }
}
