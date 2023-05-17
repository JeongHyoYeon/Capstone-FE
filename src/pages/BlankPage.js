import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import UploadModal from "../components/common/UploadModal";
import { useEffect } from "react";

const Layout2 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 250px;
`;

const BlankPage = (props) => {
  const navigate = useNavigate();

  // const changePage = () => {
  //   navigate("/upload");
  // };

  //모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  //이름 바꾸는 모달창 노출 여부
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Layout2>
        <h2 style={{ fontWeight: "300", color: "white" }}>
          {props.data} 없습니다
        </h2>
      </Layout2>
      <Layout2>
        <Button
          text={"사진 올리기"}
          width={"200px"}
          fontColor={"white"}
          //position={"fixed"}
          //bottom={"13%"}
          onClick={() => {
            showModal();
          }}
        />
        {modalOpen && <UploadModal setModalOpen={setModalOpen} />}
      </Layout2>
    </>
  );
};

export default BlankPage;
