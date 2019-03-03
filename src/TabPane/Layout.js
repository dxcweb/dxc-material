import React from "react";
import Block from "dxc-flex";
import { cloneDeep, findIndex } from "lodash";
import axios from "../axios";
import { Pagination } from "antd";

const emptyIcon = "https://oss.tuobacco.com/wop2/2019-02-26/5c74d692716c1.png?x-oss-process=image/quality,q_99/format,jpg";
const pageSize = 12;
export default class index extends React.PureComponent {
  state = {
    init: false,
    data: [],
    page: 1,
    total: 0,
  };
  componentDidMount() {
    this.ajax();
  }
  ajax = () => {
    clearTimeout(this.ajaxTimeout);
    const { type } = this.props;
    const { page } = this.state;
    axios.post("/Upload/getList", { type, page, pageSize }).then((row) => {
      if (row.status === 200 && row.data.result) {
        const { data, total } = row.data;
        this.setState({ data, total, init: true });
      }
    });
  };
  onChangePage = (page) => {
    if (page === 1) {
      setTimeout(() => {
        if (this.box) {
          this.box.scrollTop = 0;
        }
      }, 200);
    }
    this.setState({ page }, this.ajax);
  };
  uploadCallback = (action, { md5, percent }) => {
    const data = cloneDeep(this.state.data);
    if (action === "upload") {
      this.onChangePage(1);
    } else if (action === "next") {
      const index = findIndex(data, { md5 });
      if (index >= 0) {
        const row = cloneDeep(data[index]);
        row["percent"] = percent;
        data[index] = row;
      }
    } else if (action === "complete") {
      this.onChangePage(1);
    }
    this.setState({ data });
  };
  render() {
    const { width, renderItem, chooseData } = this.props;
    const { data, page, total, init } = this.state;
    if (!init) {
      return <div style={{ height: "60vh" }} />;
    }
    if (data.length === 0) {
      return (
        <Block vertical="center" horizontal="center" style={{ height: "60vh" }}>
          <div>
            <img alt="" src={emptyIcon} style={{ width: 200, height: 200, display: "block" }} />
            <div style={{ fontSize: 16, color: "#a5a5a5", textAlign: "center" }}>点击右上角上传</div>
            <div style={{ fontSize: 16, color: "#a5a5a5", textAlign: "center" }}>然后选择已上传素材</div>
          </div>
        </Block>
      );
    }
    return (
      <div ref={(me) => (window.aa = this.box = me)} style={{ height: "60vh", overflowY: "auto", overflowX: "hidden", paddingBottom: 20 }}>
        <Block layout="vertical" horizontal="center">
          <Block layout="flow" style={{ paddingLeft: 15, width }}>
            {data.map((row) => {
              return renderItem && renderItem(row, chooseData, this.ajax);
            })}
          </Block>
        </Block>
        <Block horizontal="center">
          <Pagination onChange={this.onChangePage} current={page} total={total} pageSize={pageSize} />
        </Block>
      </div>
    );
  }
}
