//뒤로 가기 버튼
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const Backbtn = styled.button`
  border: none;
  background: none;
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
    navigate(`/group/`);
  };

  if (window.location.pathname.includes("/photo" || "/grouptripdetail")) {
    return (
      <Backbtn onClick={photoBack}>
        <MdOutlineArrowBackIosNew size={"30px"} color="#4988ef" />
      </Backbtn>
    );
  } else if (window.location.pathname.includes("/grouptrip")) {
    return (
      <Backbtn onClick={groupBack}>
        <MdOutlineArrowBackIosNew size={"30px"} color="#4988ef" />
      </Backbtn>
    );
  } else
    return (
      <Backbtn onClick={back}>
        <MdOutlineArrowBackIosNew size={"30px"} color="#4988ef" />
      </Backbtn>
    );
};
export default BackButton;
