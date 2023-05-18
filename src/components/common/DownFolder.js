//폴더별 사진 다운로드
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import instance from "../../components/Request";
import { useSelector } from "react-redux";
import { AiOutlineDownload } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";

const DownBtn = styled.button`
  border: none;
  background: none;
`;

const DownFolder = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  //사진 id
  let tripId = localStorage.getItem("nowGroupTrip");

  //게시자 id
  const { usertag } = useParams();

  //객체 태그 id
  const { obejtag } = useParams();

  //얼굴 태그 id
  const { facetag } = useParams();

  const location = useLocation();

  //게시자 사진 다운로드
  const userDownLoad = (e) => {
    instance
      .get(`photos/uploader/${tripId}/${usertag}/`, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const photos = response.data.photos;

        // Promise 체인을 사용하여 각 항목의 다운로드를 순차적으로 처리
        const downloadPromises = photos.map((photo) => {
          const fileUrl = photo.url;

          return axios
            .get(fileUrl, {
              responseType: "blob",
            })
            .then((fileResponse) => {
              const file = new Blob([fileResponse.data], {
                type: fileResponse.data.type,
              });
              const fileUrl = window.URL.createObjectURL(file);
              const link = document.createElement("a");
              link.href = fileUrl;
              link.style.display = "none";
              link.download = photo.file_name;

              document.body.appendChild(link);
              link.click();
              link.remove();

              window.URL.revokeObjectURL(fileUrl);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });

        // 모든 다운로드 프로미스를 병렬로 실행
        Promise.all(downloadPromises)
          .then(() => {
            console.log("User files downloaded successfully.");
          })
          .catch((error) => {
            console.error("Error while downloading files:", error);
          });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  //객체 분류 폴더 다운로드
  const obejDownLoad = (e) => {
    instance
      .get(`photos/yolo/${tripId}/${obejtag}/`, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const photos = response.data.photos;

        // Promise 체인을 사용하여 각 항목의 다운로드를 순차적으로 처리
        const downloadPromises = photos.map((photo) => {
          const fileUrl = photo.url;

          return axios
            .get(fileUrl, {
              responseType: "blob",
            })
            .then((fileResponse) => {
              const file = new Blob([fileResponse.data], {
                type: fileResponse.data.type,
              });
              const fileUrl = window.URL.createObjectURL(file);
              const link = document.createElement("a");
              link.href = fileUrl;
              link.style.display = "none";
              link.download = photo.file_name;

              document.body.appendChild(link);
              link.click();
              link.remove();

              window.URL.revokeObjectURL(fileUrl);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });

        // 모든 다운로드 프로미스를 병렬로 실행
        Promise.all(downloadPromises)
          .then(() => {
            console.log("Obeject files downloaded successfully.");
          })
          .catch((error) => {
            console.error("Error while downloading files:", error);
          });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  //인물 분류 폴더 다운로드
  const faceDownLoad = (e) => {
    instance
      .get(`photos/face/${tripId}/${facetag}/`, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const photos = response.data.photos;

        // Promise 체인을 사용하여 각 항목의 다운로드를 순차적으로 처리
        const downloadPromises = photos.map((photo) => {
          const fileUrl = photo.url;

          return axios
            .get(fileUrl, {
              responseType: "blob",
            })
            .then((fileResponse) => {
              const file = new Blob([fileResponse.data], {
                type: fileResponse.data.type,
              });
              const fileUrl = window.URL.createObjectURL(file);
              const link = document.createElement("a");
              link.href = fileUrl;
              link.style.display = "none";
              link.download = photo.file_name;

              document.body.appendChild(link);
              link.click();
              link.remove();

              window.URL.revokeObjectURL(fileUrl);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });

        // 모든 다운로드 프로미스를 병렬로 실행
        Promise.all(downloadPromises)
          .then(() => {
            console.log("Face files downloaded successfully.");
          })
          .catch((error) => {
            console.error("Error while downloading files:", error);
          });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  if (location.pathname.includes("/charfolder/")) {
    <DownBtn
      onClick={() => {
        faceDownLoad();
      }}
    >
      <AiOutlineDownload size={"35px"} color="white" />
    </DownBtn>;
  } else if (location.pathname.includes("/obejfolder/")) {
    return (
      <DownBtn
        onClick={() => {
          obejDownLoad();
        }}
      >
        <AiOutlineDownload size={"35px"} color="white" />
      </DownBtn>
    );
  } else
    return (
      <DownBtn
        onClick={() => {
          userDownLoad();
        }}
      >
        <AiOutlineDownload size={"35px"} color="white" />
      </DownBtn>
    );
};
export default DownFolder;
