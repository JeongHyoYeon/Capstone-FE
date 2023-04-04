import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import InputBox from "../../components/common/InputBox";
import { setCookie } from "../../storage/Cookie";
import Button from "../../components/common/Button";

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
        <br />
        <InputBox
          placeholder="이름"
          height={"40px"}
          width={"85%"}
          value={name}
          onChange={handleName}
        />
        <br />
        <InputBox
          placeholder="아이디"
          height={"40px"}
          width={"85%"}
          value={id}
          onChange={handleId}
        />
        <br />
        <InputBox
          type="password"
          placeholder="비밀번호"
          height={"40px"}
          width={"85%"}
          value={password}
          onChange={handlePassword}
        />
        <br />
        <InputBox
          placeholder="이메일"
          height={"40px"}
          width={"85%"}
          value={email}
          onChange={handleEmail}
        />
        <br />
        <br />
        <Button
          type={"submit"}
          text={"회원가입"}
          backgroundColor={"#A4B0D8"}
          width={"85%"}
          height={"50px"}
          fontColor={"white"}
          onClick={() => {
            register();
          }}
        />
      </Layout>
    </>
  );
}

export default SignupUser;
