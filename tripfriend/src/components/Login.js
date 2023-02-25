import React, { useState } from "react";
import styled from "styled-components";
import InputBox from "./common/InputBox";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  position: relative;
`;

function Login() {
  return (
    <>
      <Layout>
        <h1>로그인</h1>
        <h2>ID</h2>
        <InputBox
          placeholder="아이디"
          height={"35px"}
          width={"85%"}
          // value={name}
          // onChange={handleName}
        />
      </Layout>
    </>
  );
}
export default Login;
