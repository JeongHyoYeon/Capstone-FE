import React from "react";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 180px;
  padding-left: 13%;
`;

const Layout2 = styled.div`
  padding-top: 35%;
  padding-bottom: 0px;
  margin-bottom: 0px;
  font-size: 30px;
  display: flex;
  justify-content: center;
`;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Layout2>
        <h1 style={{ color: "#0969da", fontWeight: "900" }}>AfterTrip</h1>
      </Layout2>
      <Layout>
        <Button
          text={"로그인"}
          width={"85%"}
          height={"50px"}
          fontColor={"white"}
          onClick={() => {
            navigate("/login");
          }}
        />
        <br />
        <Button
          text={"회원가입"}
          width={"85%"}
          height={"50px"}
          fontColor={"white"}
          onClick={() => {
            navigate("/signup");
          }}
        />
      </Layout>
    </>
  );
};
export default LandingPage;
