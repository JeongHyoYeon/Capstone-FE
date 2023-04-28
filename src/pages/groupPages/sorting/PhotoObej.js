import React from "react";
import CategoryHeader from "./CategoryHeader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../../components/common/Button";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 50px;
  position: fixed;
  bottom: 10%;
`;

const PhotoObej = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();

  const changePage = () => {
    navigate("/upload");
  };

  return (
    <>
      <CategoryHeader />
      <h1>이곳은 객체분류 페이지입니다.</h1>
      <Layout>
        <Button
          text={"자동분류하기"}
          backgroundColor={"#A4B0D8"}
          width={"150px"}
          fontColor={"white"}

          //onClick={}
        />

        <Button
          text={"+"}
          backgroundColor={"#A4B0D8"}
          width={"50px"}
          fontColor={"white"}
          onClick={changePage}
        />
        <Button
          text={"GPT에게 물어보기"}
          backgroundColor={"#A4B0D8"}
          width={"150px"}
          fontColor={"white"}
          //onClick={changePage}
        />
      </Layout>
    </>
  );
};
export default PhotoObej;
