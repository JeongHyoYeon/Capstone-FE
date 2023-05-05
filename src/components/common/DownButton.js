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
      .post(
        `/download/${photoId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const blob = new Blob([response.data])
        const fileUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.style.display = 'none';
        link.download = response.headers['filename'];

        document.body.appendChild(link);
        link.click();
        link.remove();
        
        window.URL.revokeObjectURL(fileUrl);
        // console.log(response);
        // const blob = new Blob([response.data.data.url], {
        //   type: "image/*",
        // });
        // console.log(blob);
        // let fileName = response.data.data.file_name;
        // const imageUrl = window.URL.createObjectURL(blob);
        // const link = document.createElement("a");
        // link.href = response.data.data.url;
        // link.style.display = "none";
        // //link.download = `${response.data.data.file_name}`;
        // link.download = fileName;
        // link.setAttribute("download", fileName);
        // document.body.appendChild(link);
        // link.click();
        // link.remove();
        // window.URL.revokeObjectURL(link);
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
