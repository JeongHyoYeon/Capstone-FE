import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import instance from "../../components/Request";
import { useSelector } from "react-redux";
import { AiOutlineDownload } from "react-icons/ai";

const DownBtn = styled.button`
  border: none;
`;

const DownButton = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);
  //사진 id
  let photoId = localStorage.getItem("nowPhotoId");

  const downLoad = async (e) => {
    await axios;
    instance
      .get(
        `/download/${photoId}/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        console.log(response);
        const blob = new Blob([response.data.url], {
          type: "image/jpeg",
        });
        console.log(blob);
        const imageUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = imageUrl;
        //다운로드시 파일명
        link.download = "test";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(link);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  return (
    <DownBtn onClick={downLoad}>
      <AiOutlineDownload size={"35px"} color="#3178B9" />
    </DownBtn>
  );
};
export default DownButton;
