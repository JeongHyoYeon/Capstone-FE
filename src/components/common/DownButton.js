//개별 사진 다운로드 버튼
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import instance from "../../components/Request";
import { useSelector } from "react-redux";
import { AiOutlineDownload } from "react-icons/ai";

const DownBtn = styled.button`
  border: none;
  // background-color: #eaedf2;
  background: none;
`;

const DownButton = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);
  //사진 id
  let photoId = localStorage.getItem("nowPhotoId");

  //개별 사진 다운로드
  const IndividualDownLoad = async (e) => {
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
        axios({
          method: "get",
          url: `${response.data.url}`,
          responseType: "blob",
          headers: {
            origin: "https://www.aftertrip.link",
          },
        })
          .then((res) => {
            const file = new Blob([res.data], { type: res.data.type });

            const fileUrl = window.URL.createObjectURL(file);
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
        IndividualDownLoad();
      }}
    >
      <AiOutlineDownload size={"35px"} color="#4988ef" />
    </DownBtn>
  );
};
export default DownButton;
