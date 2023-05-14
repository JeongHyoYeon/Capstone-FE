import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const Deletebtn = styled.button`
  border: none;
  background-color: #eaecee;
`;

const DeleteButton = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  //삭제할 사진 아이디
  var photoId = localStorage.getItem("nowPhotoId");

  //삭제함수

  return (
    <Deletebtn>
      <AiOutlineDelete size={"30px"} color="#3178B9" />
    </Deletebtn>
  );
};
export default DeleteButton;
