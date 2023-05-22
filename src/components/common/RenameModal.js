import React, { useState } from "react";
import styled from "styled-components";
import InputBox from "./InputBox";
import Button from "./Button";
import axios from "axios";
import instance from "../Request";
import { useSelector } from "react-redux";

//전체 모달창
const Container = styled.div`
  /* 모달창 크기 */
  width: 90%;
  height: 40%;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: #fff;
  border: 1px solid grey;
  border-radius: 8px;
`;

const CloseBtn = styled.button`
  position: absolute;
  background-color: white;
  right: 10px;
  top: 10px;
  float: right;
  font-weight: bold;
  color: #777;
  font-size: 20px;
  cursor: pointer;
  border: none;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Layout2 = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
`;

const RenameModal = ({ setModalOpen }) => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const tripId = localStorage.getItem("nowGroupTrip");
  const facetag = localStorage.getItem("facetag");

  //새로운 이름
  const [newName, setNewName] = useState("");

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  //현재 분류 페이지 폴더명 바꾸기
  const rename = async (e) => {
    await axios;
    instance
      .patch(
        `photos/face/${tripId}/${facetag}/`,
        { custom_name: newName },
        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        window.alert("폴더명이 변경되었습니다.");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <CloseBtn
        onClick={() => {
          closeModal();
        }}
      >
        x
      </CloseBtn>
      <Layout>
        <Layout2>
          <p>폴더명 변경하기</p>
        </Layout2>
        <Layout2>
          <InputBox
            height={"50px"}
            width={"80%"}
            value={newName}
            placeholder="원하는 폴더명을 입력하세요."
            onChange={handleName}
          />
        </Layout2>
        <Layout2>
          <Button
            text={"완료"}
            width={"200px"}
            fontColor={"white"}
            //position={"fixed"}
            //bottom={"50px"}
            onClick={() => {
              rename();
              closeModal();
            }}
          />
        </Layout2>
      </Layout>
    </Container>
  );
};
export default RenameModal;
