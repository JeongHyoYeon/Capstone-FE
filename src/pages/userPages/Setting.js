import React from "react";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_TOKEN } from "../../components/modules/slices/tokenSlice";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const Setting = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const dispatch = useDispatch();

  const redirect = useNavigate();

  const logOut = () => {
    localStorage.clear();
    dispatch(DELETE_TOKEN(JWTtoken));
    redirect("/login");
  };
  return (
    <>
      <Layout>
        <Button
          text={"로그아웃"}
          backgroundColor={"#A4B0D8"}
          width={"200px"}
          fontColor={"white"}
          position={"fixed"}
          bottom={"70%"}
          onClick={logOut}
        />
      </Layout>
    </>
  );
};
export default Setting;
