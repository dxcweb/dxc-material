import axios from "./axios";
import getFileMD5 from "./getFileMD5";
import * as qiniu from "qiniu-js";

async function uploadOss(file, callback) {
  const extIndex = file.name.lastIndexOf(".");
  if (extIndex < 0) {
    throw new Error("无效后缀");
  }
  const ext = file.name.substr(extIndex);
  const md5 = await getFileMD5(file);
  const apiRes = await axios.post("/Upload/autoAllot", { ext, md5, file_name: file.name });
  if (apiRes.status !== 200) {
    throw new Error("请求失败");
  }
  const { data, result, msg } = apiRes.data;
  if (!result) {
    throw new Error(msg);
  }
  const { key, token, type, repeat } = data;
  if (repeat) {
    callback("complete", { type });
    return;
  }
  callback("upload", { type });
  const observable = qiniu.upload(file, key, token);
  var subscription = observable.subscribe({
    next(res) {
      const percent = res.total.percent.toFixed(2);
      callback("next", { percent, md5, type });
    },
    error(err) {
      console.log("error", err);
      // ...
    },
    complete(res) {
      axios.post("/Upload/complete", { md5 }).then(() => {
        callback("complete", { type });
      });
    },
  });
}
export default uploadOss;
