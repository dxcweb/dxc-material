import axios from "axios";
import { getSign } from "./authSign";
const instance = axios.create({
  // baseURL: "http://127.0.0.1:8080/my/yun-api",
  baseURL: "https://wop2.tuobacco.com/app/yun-api",
});
const signKey = "materialLog";
let sign = window.localStorage.getItem(signKey);
let i = 0;
instance.interceptors.request.use(
  async (config) => {
    if (i == 2) {
      return Promise.reject("无效签名");
    }
    if (!sign) {
      sign = await getSign();
      window.localStorage.setItem(signKey, sign);
    }
    config.headers["Content-Log"] = sign;
    return config;
  },
  (error) => Promise.reject(error),
);
instance.interceptors.response.use(
  async (response) => {
    const { errorcode } = response.data;
    if (errorcode === -1000) {
      i++;
      sign = null;
      return instance(response.config);
    }
    i = 0;
    return response;
  },
  (error) => Promise.reject(error),
);
export default instance;
