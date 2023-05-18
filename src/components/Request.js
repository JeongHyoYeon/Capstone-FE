import axios from "axios";
import { useHistory } from "react-router-dom";
//import { useSelector } from "react-redux";
//import { SET_TOKEN } from "../components/modules/slices/tokenSlice";

const instance = axios.create({
  baseURL: "https://server.aftertrip.link/",
});

//const history = useHistory();

//401 응답 받을 경우
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.message === "Request failed with status code 401" ||
        error.message === "Request failed with status code 403")
    ) {
      window.alert("로그인 해주세요.");
      //history.push("/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
