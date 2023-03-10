import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import InputBox from "./common/InputBox";
import { setCookie } from "../storage/Cookie";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  position: relative;
`;

function SignupUser() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const redirect = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleId = (e) => {
    setId(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const register = async (e) => {
    console.log({ name, id, email, password });
    await axios
      .post("https://www.aftertrip.link/api/register/", {
        name: name,
        id: id,
        password: password,
        email: email,
      })
      .then((response) => {
        //handle success
        console.log("success");
        const accessToken = response.data.token;
        setCookie("is_login", `${accessToken}`);
        console.log(response.data);
        window.alert(response.data.message);
        //localStorage.setItem("token", response.data.jwt);
        redirect("/login");
      })
      .catch((error) => {
        //handle error
        console.log("error:", error.response);
        console.log({ name, id, email, password });
      });
  };

  return (
    <>
      <Layout>
        <h1>회원가입</h1>
        <h2>이름</h2>
        <InputBox
          placeholder="이름"
          height={"35px"}
          width={"85%"}
          value={name}
          onChange={handleName}
        />
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
        <h2>E-Mail</h2>
        <InputBox
          placeholder="이메일"
          height={"35px"}
          width={"85%"}
          value={email}
          onChange={handleEmail}
        />
        <br />
        <br />
        <button
          type="submit"
          onClick={() => {
            register();
          }}
        >
          회원가입
        </button>
      </Layout>
    </>
  );
}

export default SignupUser;
