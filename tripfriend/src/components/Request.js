import axios from "axios";
//import { useSelector } from "react-redux";
//import { SET_TOKEN } from "../components/modules/slices/tokenSlice";

const instance = axios.create({
  baseURL: "https://www.aftertrip.link/api",
});

//var localToken = localStorage.getItem("accessToken");

//instance.defaults.headers.common["Authorization"] = `Bearer ${localToken}`;

export default instance;
