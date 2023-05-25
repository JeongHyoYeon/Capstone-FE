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

  //폴더별 뷰일때
  const photoBack = () => {
    const nowGroup = localStorage.getItem("nowGroup");
    if (nowGroup) {
      navigate(`/grouptrip/${nowGroup}`);
    } else {
      navigate("/group");
    }
  };

  const currentPath = location.pathname;

  const groupBack = () => {
    navigate(`/group`);
  };

  if (currentPath.includes("/photo/" || "/grouptripdetail/")) {
    if (
      currentPath === "/photo/auto/charfolder" ||
      currentPath === "/photo/auto/obejfolder" ||
      currentPath === "/photo/userfolder"
    )
      return (
        <Backbtn onClick={photoBack}>
          <MdOutlineArrowBackIosNew size={"30px"} color="white" />
        </Backbtn>
      );
    else
      return (
        <Backbtn onClick={back}>
          <MdOutlineArrowBackIosNew size={"30px"} color="white" />
        </Backbtn>
      );
  } else if (currentPath.includes("/grouptrip/")) {
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
