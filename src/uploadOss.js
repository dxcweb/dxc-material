import axios from "axios";
import getFileMD5 from "./getFileMD5";
import OSS from "ali-oss/dist/aliyun-oss-sdk.js";
const domain = "http://127.0.0.1:8080/my/yun-api";

async function uploadOss(file, asyncProgress) {
  const extIndex = file.name.lastIndexOf(".");
  if (extIndex < 0) {
    throw new Error("无效后缀");
  }
  const ext = file.name.substr(extIndex);
  const md5 = await getFileMD5(file);
  const apiRes = await axios.post(`${domain}/Upload/autoAllot`, { ext, md5 });
  if (apiRes.status != 200) {
    throw new Error("请求失败");
  }
  const { data, result, msg } = apiRes.data;
  if (!result) {
    throw new Error(msg);
  }
  const { objectKey, region, accessKeyId, accessKeySecret, stsToken, bucket } = data;

  const client = new OSS({ region, accessKeyId, accessKeySecret, stsToken, bucket });
  const body = "bucket=${bucket}&object=${object}&var1=${x:var1}";
  const res = await client.multipartUpload(objectKey, file, {
    progress: asyncProgress,
    callback: {
      url: "http://test.tuobacco.com/app/yun-api/Upload/transform",
      body: `{"aa":"ccc"}`,
      host: "test.tuobacco.com",
      contentType: "application/json",
      customValue: {
        key1: "value1",
        key2: "value2",
      },
    },
  });
}
export default uploadOss;
