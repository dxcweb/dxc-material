import axios from "../axios";
export default (image) => {
  return axios.post("/NetRes/image", { image });
};
