import React from "react";
import ReactDOM from "react-dom";
import material from "./getMaterial";
import { netFetch } from "dxc-material";
class Demo extends React.Component {
  openMaterial = () => {
    material().then((value) => {
      console.log("value", value);
    });
  };
  onNetFetch = async () => {
    const apiRes = await netFetch([
      "https://xiumi.us/images/app/home/0cc68a.icon-paper-guide.png",
      "https://xiumi.us/images/app/home/3c6120.icon-add-show.png",
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2925398301,1324396295&fm=27&gp=0.jpg",
    ]);
    if (apiRes.status !== 200) {
      alert("请求错误");
      return;
    }
    const { data, result, msg } = apiRes.data;
    if (!result) {
      alert(msg);
      return;
    }
    console.log(111, data);
  };
  render() {
    return (
      <div style={{ padding: 30, lineHeight: 2 }}>
        <div onClick={this.openMaterial}>素材库</div>
        <div onClick={this.onNetFetch}>网络资源下载</div>
      </div>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById("__react-content"));
