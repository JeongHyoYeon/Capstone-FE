import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputBox from "./common/InputBox";
import axios from "axios";
import { setCookie } from "../storage/Cookie";
import { useDispatch } from "react-redux";
import { SET_TOKEN } from "./store/Auth";
import MyTrip from "./MyTrip";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  position: relative;
`;

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();

  const dispatch = useDispatch();

  const handleId = (e) => {
    setId(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginUser = async (e) => {
    console.log({ id, password });
    if (id === "" || password === "") {
      window.alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    //e.preventDefault();
    await axios
      .post(
        "https://www.aftertrip.link/api/login/",
        {
          id: id,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        //handle success
        console.log("success");
        const accessToken = response.data.token;
        const userId = response.data.user.id;
        console.log(userId);
        setCookie("is_login", `${accessToken}`);
        console.log(response.data);
        window.alert(response.data.message);
        //token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
        // axios.defaults.headers.common[]=`Bearer ${response.data.access_token}`
        dispatch(SET_TOKEN(accessToken));
        <MyTrip username={userId} />;
        redirect("/");
      })
      .catch((error) => {
        //handle error
        console.log("error:", error.response);
        //console.log({ id, password });
      });
  };

  return (
    <>
      <Layout>
        <h1>로그인</h1>
        <h2>ID</h2>
        <InputBox
          placeholder="아이디"
          height={"35px"}
          width={"85%"}
          value={id}
          onChange={handleId}
        />
        <h2>비밀번호</h2>
        <InputBox
          type="password"
          placeholder="비밀번호"
          height={"35px"}
          width={"85%"}
          value={password}
          onChange={handlePassword}
        />
        <br />
        <br />
        <button
          type="submit"
          onClick={() => {
            loginUser();
          }}
        >
          로그인
        </button>
      </Layout>
    </>
  );
}
export default Login;
