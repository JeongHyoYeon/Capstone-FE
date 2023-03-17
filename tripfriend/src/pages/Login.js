import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputBox from "../components/common/InputBox";
import axios from "axios";
import { setCookie } from "../storage/Cookie";
import { useDispatch } from "react-redux";
import { SET_TOKEN } from "../components/store/Auth";
//import Button from "../components/common/Button";

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
    localStorage.clear();
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
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("accessToken", response.data.token.access);
        localStorage.setItem("refreshToken", response.data.token.refresh);

        //setCookie("is_login", `${accessToken}`);
        console.log(response.data);
        window.alert(response.data.message);
        //token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
        // axios.defaults.headers.common[]=`Bearer ${response.data.access_token}`
        dispatch(SET_TOKEN(accessToken));

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
        {/* <Button
          type={"submit"}
          text={"로그인"}
          backgroundColor={"#D9D9D9"}
          width={"80px"}
          fontColor={"BLACK"}
          position={"fixed"}
          bottom={"5%"}
          onClick={() => {
            loginUser();
          }}
        /> */}
      </Layout>
    </>
  );
}
export default Login;
