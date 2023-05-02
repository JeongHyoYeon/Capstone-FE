import React from "react";
import axios from "axios";
import CategoryHeader from "./CategoryHeader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../../components/common/Button";
import styled from "styled-components";
import instance from "../../../components/Request";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  //flex-direction: row;
  //margin: 0 auto;
  //height: 50px;
  //position: fixed;
  //bottom: 10%;
`;

const Layout2 = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

const PhotoChar = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();

  const tripId = localStorage.getItem("nowGroupTrip");

  const changePage = () => {
    navigate("/upload");
  };

  //자동 분류 요청하기
  const requestAuto = async (e) => {
    await axios;
    instance
      .post(
        `/photo/face/${tripId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.alert(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <CategoryHeader />
      <h1>이곳은 인물분류 페이지입니다.</h1>
      <Layout>
        <Layout2>
          <Button
            text={"자동분류하기"}
            width={"150px"}
            fontColor={"white"}
            onClick={() => {
              requestAuto();
            }}
          />
        </Layout2>
        <Layout2>
          <Button
            text={"+"}
            width={"50px"}
            fontColor={"white"}
            onClick={() => {
              changePage();
            }}
          />
        </Layout2>
        <Layout2>
          <Button
            text={"GPT에게 물어보기"}
            width={"150px"}
            fontColor={"white"}
            //onClick={changePage}
          />
        </Layout2>
      </Layout>
    </>
  );
};
export default PhotoChar;
