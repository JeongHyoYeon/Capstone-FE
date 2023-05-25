import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { useSelector } from "react-redux";
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
        window.location.pathname == "/login/" ||
        window.location.pathname == "/signup/" ||
        window.location.pathname == "/login" ||
        window.location.pathname == "/signup"
      ) {
        return Promise.reject(error);
      } else {
        window.alert("로그인 해주세요!");
      }
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
