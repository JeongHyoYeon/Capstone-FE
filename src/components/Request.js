import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { useSelector } from "react-redux";
//import { SET_TOKEN } from "../components/modules/slices/tokenSlice";

const instance = axios.create({
  baseURL: "https://server.aftertrip.link/",
});

export default instance;
