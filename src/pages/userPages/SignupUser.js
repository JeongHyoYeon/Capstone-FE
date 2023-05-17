import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import InputBox from "../../components/common/InputBox";
import { setCookie } from "../../storage/Cookie";
import Button from "../../components/common/Button";
import instance from "../../components/Request";
import BackButton from "../../components/common/BackButton";

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
    await axios;
    instance
      .post("accounts/register/", {
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
        console.log(error);
        console.log(error.response.data);
        if (error.response.data.email != null) {
          if (error.response.data.email == "user의 email은/는 이미 존재합니다.")
            window.alert("이미 가입된 이메일입니다.");
          else window.alert("유효한 이메일을 입력해주세요.");
        } else if (error.response.data.id != null) {
          window.alert("이미 가입된 아이디입니다.");
        } else if (
          error.response.data ==
          "8자 이상의 영문 대/소문자, 숫자, 특수문자 조합을 입력해주세요."
        ) {
          window.alert(
            "8자 이상의 영문 대/소문자, 숫자, 특수문자 조합을 입력해주세요."
          );
        }
      });
  };

  return (
    <>
      <Layout>
        <h1 style={{ color: "#3178B9" }}>회원가입</h1>
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
