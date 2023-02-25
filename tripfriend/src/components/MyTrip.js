import React from "react";
import Button from "./common/Button";
import styled from "styled-components";
import TextBox from "./common/TextBox";
import ImageBox from "./common/ImageBox";
import { useNavigate } from "react-router-dom";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const MyTrip = () => {
  const navigate = useNavigate();

  const navMakeTrip = () => {
    navigate("/maketrips");
  };

  return (
    <>
      <Layout>
        <TextBox
          text1={"최근알림"}
          text2={" 효주님이 <정효연>그룹에 초대하셨습니다."}
          height={"70px"}
        />
      </Layout>
      <h1
        style={{
          position: "relative",
          left: "5%",
        }}
      >
        연우님의 여행
      </h1>
      <Layout>
        <ImageBox
          height={"150px"}
          text1={"2023-02-14 ~ 2023-02-18"}
          text2={"싱가포르"}
        />
      </Layout>
      <Layout onClick={navMakeTrip}>
        <Button
          text={"새 여행 만들기"}
          backgroundColor={"#D9D9D9"}
          width={"200px"}
          fontColor={"BLACK"}
          position={"fixed"}
          bottom={"5%"}
        />
      </Layout>
    </>
  );
};
export default MyTrip;
