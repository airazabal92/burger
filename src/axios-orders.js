import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-burger-16ad4-default-rtdb.firebaseio.com/"
});

export default instance;
