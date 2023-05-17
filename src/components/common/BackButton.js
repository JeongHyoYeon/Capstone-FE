//뒤로 가기 버튼
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const Backbtn = styled.button`
  border: none;
  background-color: white;
`;

const BackButton = () => {
  let nowGroupTripId = localStorage.getItem("nowGroupTrip");

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  const photoBack = () => {
    navigate(`/grouptrip/${nowGroupTripId}`);
  };

  const groupBack = () => {
    navigate(`/group`);
  };

  if (window.location.pathname.includes("/photo")) {
    return (
      <Backbtn onClick={photoBack}>
        <MdOutlineArrowBackIosNew size={"30px"} color="#0b5cff" />
      </Backbtn>
    );
  } else if (window.location.pathname.includes("/group")) {
    return (
      <Backbtn onClick={groupBack}>
        <MdOutlineArrowBackIosNew size={"30px"} color="#0b5cff" />
      </Backbtn>
    );
  } else
    return (
      <Backbtn onClick={back}>
        <MdOutlineArrowBackIosNew size={"30px"} color="#0b5cff" />
      </Backbtn>
    );
};
export default BackButton;
