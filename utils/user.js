import axios from "./api-client";

export default {
  register: async data => {
    const ret = await axios.post("api/user", data);
    return ret;
  },
  login: async data => {
    const ret = await axios.post("api/user/login", data);
    return ret;
  },
};
