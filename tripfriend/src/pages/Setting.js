import React from "react";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const Setting = () => {
  const redirect = useNavigate();

  const logOut = () => {
    localStorage.clear();
    redirect("/login");
  };
  return (
    <>
      <Layout onClick={logOut}>
        <Button
          text={"로그아웃"}
          backgroundColor={"#D9D9D9"}
          width={"200px"}
          fontColor={"BLACK"}
          position={"fixed"}
          bottom={"70%"}
        />
      </Layout>
    </>
  );
};
export default Setting;
