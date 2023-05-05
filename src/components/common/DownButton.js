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
  //서버에서 s3 url 가져오기
  const downLoadUrl = async (e) => {
    await axios;
    instance
      .post(
        `/download/${photoId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const s3Url = response.data.url;
        const fileName = response.data.file_name;
        photoUrl(s3Url, fileName);
      })
      .catch((error) => {
        console.log("error:" + error);
      });
  };

  //url로 사진 다운로드 요청
  const photoUrl = async (s3Url, fileName) => {
    await axios
      .get(s3Url, {
        responseType: "blob",
      })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(link);
      })
      .catch((error) => {
        console.log("photoUrl Error:" + error);
      });
  };

  return (
    <DownBtn
      onClick={() => {
        downLoadUrl();
      }}
    >
      <AiOutlineDownload size={"35px"} color="#3178B9" />
    </DownBtn>
  );
};
export default DownButton;
