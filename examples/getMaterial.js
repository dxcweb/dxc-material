import createMaterial from "dxc-material";
import axios from "axios";

const material = createMaterial(() => {
  return new Promise((resolve, reject) => {
    axios.get("http://127.0.0.1:8080/my/yun-api/test").then((res) => {
      if (res.status === 200) {
        const { result, data, msg } = res.data;
        if (result) {
          resolve(data);
        } else {
          reject(msg);
        }
      }
    });
  });
});

export default material;
