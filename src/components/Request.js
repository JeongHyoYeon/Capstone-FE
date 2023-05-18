import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { useSelector } from "react-redux";
//import { SET_TOKEN } from "../components/modules/slices/tokenSlice";

const instance = axios.create({
  baseURL: "https://server.aftertrip.link/",
});

//401 응답 받을 경우
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.message === "Request failed with status code 400"
    ) {
      window.alert("로그인해주세요");
      const redirection = useNavigate();
      redirection("/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
