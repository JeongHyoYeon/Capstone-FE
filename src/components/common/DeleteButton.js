import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import instance from "../../components/Request";

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
  const deletePhoto = async (e) => {
    await axios;
    instance
      .delete(
        `photos/detail/${photoId}/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("delete success");
        window.alert("사진이 삭제되었습니다.");
      })
      .catch((error) => {
        console.log(error);
        window.alert("사진을 삭제할 수 없습니다.");
      });
  };

  return (
    <Deletebtn
      onClick={() => {
        deletePhoto();
        back();
      }}
    >
      <AiOutlineDelete size={"30px"} color="#3178B9" />
    </Deletebtn>
  );
};
export default DeleteButton;
