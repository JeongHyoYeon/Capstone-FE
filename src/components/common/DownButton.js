import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import instance from "../../components/Request";
import { useSelector } from "react-redux";
import { AiOutlineDownload } from "react-icons/ai";

const DownBtn = styled.button`
  border: none;
  background-color: #eaecee;
`;

const DownButton = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);
  //사진 id
  let photoId = localStorage.getItem("nowPhotoId");

  const downLoad = async (e) => {
    await axios;
    instance
      .get(
        `photos/detail/${photoId}/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        axios
          .get(response.data.url)
          .then((response) => response.blob())
          .then((blob) => {
            // Create a new blob object
            const fileBlob = new Blob([blob], { type: blob.type });
            console.log("Blob object:", fileBlob);

            const fileUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = fileUrl;
            link.style.display = "none";
            link.download = response.data.file_name;

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(fileUrl);
          })
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  return (
    <DownBtn
      onClick={() => {
        downLoad();
      }}
    >
      <AiOutlineDownload size={"35px"} color="#3178B9" />
    </DownBtn>
  );
};
export default DownButton;
