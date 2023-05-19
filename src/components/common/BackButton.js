//뒤로 가기 버튼
import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const Backbtn = styled.button`
  border: none;
  background: none;
`;

const BackButton = () => {
  //const nowGroupTripId = localStorage.getItem("nowGroupTrip");
  const location = useLocation();

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  const photoBack = () => {
    //navigate(`/grouptrip/${nowGroupTripId}`);
    const nowGroup = localStorage.getItem("nowGroup");
    if (nowGroup) {
      navigate(`/grouptrip/${nowGroup}`);
    } else {
      navigate("/group"); // 잘못된 경우 기본 경로로 이동하도록 설정
    }
  };

  const groupBack = () => {
    navigate(`/group`);
  };

  if (location.pathname.includes("/photo/" || "/grouptripdetail/")) {
    return (
      <Backbtn onClick={photoBack}>
        <MdOutlineArrowBackIosNew size={"30px"} color="white" />
      </Backbtn>
    );
  } else if (location.pathname.includes("/grouptrip/")) {
    return (
      <Backbtn onClick={groupBack}>
        <MdOutlineArrowBackIosNew size={"30px"} color="white" />
      </Backbtn>
    );
  } else
    return (
      <Backbtn onClick={back}>
        <MdOutlineArrowBackIosNew size={"30px"} color="white" />
      </Backbtn>
    );
};
export default BackButton;
