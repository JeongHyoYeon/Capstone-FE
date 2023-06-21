//API
import axios from "axios";
//import { SET_TOKEN } from "../components/modules/slices/tokenSlice";

const instance = axios.create({
  baseURL: "https://server.aftertrip.link/",
});

instance.interceptors.response.use(
  (response) => {
    // 응답 성공 시 처리
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (
        window.location.pathname.includes("/login") ||
        window.location.pathname.includes("/signup")
      ) {
        return Promise.reject(error);
      } else {
        window.alert("로그인 해주세요!");
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
