import React from "react";
import ReactDOM from "react-dom";
import "./ApiAuth";
import { netFetch } from "dxc-material";
import { openMaterial, catchremoteimage } from "dxc-material";
import loadjs from 'dxc-loadjs';
class Demo extends React.Component {

  componentDidMount() {
    this.loadUeditor();
  }
  loadUeditor = async () => {
    if (!window.UE) {
      const homeUrl = (window.UEDITOR_HOME_URL = 'https://code.tuobacco.com/ueditor/1-4-3-2/');
      window.UEDITOR_DIALOGS_PATH = '';
      await loadjs(`${homeUrl}ueditor.min.js`);
    }
    this.ue = window.UE.getEditor('editor');
    window.ue = this.ue;
    catchremoteimage(this.ue);
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
        <div onClick={openMaterial}>素材库</div>
        <div onClick={this.onNetFetch}>网络资源下载</div>

        <script style={{ width: 400, maxWidth: "100%", height: 500 }} id="editor" type="text/plain" />
      </div>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById("__react-content"));
