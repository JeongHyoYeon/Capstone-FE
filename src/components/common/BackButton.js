//뒤로 가기 버튼
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const Backbtn = styled.button`
  border: none;
  background-color: #eaecee;
`;

const BackButton = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <Backbtn onClick={back}>
      <MdOutlineArrowBackIosNew size={"30px"} color="#3178B9" />
    </Backbtn>
  );
};
export default BackButton;
