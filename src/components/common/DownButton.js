// 사진 다운로드
import React from "react";
import styled from "styled-components";
import axios from "axios";
import instance from "../../components/Request";
import { useSelector } from "react-redux";
import { AiOutlineDownload } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const DownBtn = styled.button`
  border: none;
  background: none;
`;

const DownButton = () => {
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

  //사용자 폴더 다운로드
  const userDownLoad = () => {
    instance
      .get(`photos/uploader/${tripId}/${usertag}/`, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`,
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        const photos = response.data.photos;
        const fileName = response.data.tag;

        const zip = new JSZip();

        const downloadPromises = photos.map((photo) => {
          const fileUrl = photo.url;

          return axios
            .get(fileUrl, { responseType: "blob" })
            .then((fileResponse) => {
              const file = new Blob([fileResponse.data], {
                type: fileResponse.data.type,
              });
              zip.file(photo.file_name, file); // 응답 받은 사진을 zip 파일에 추가
            })
            .catch((error) => {
              console.error("Error:", error);
              window.alert("사용자 분류 다운로드:", error.message);
            });
        });

        Promise.all(downloadPromises)
          .then(() => {
            // zip파일 만들기
            zip.generateAsync({ type: "blob" }).then((content) => {
              //  FileSaver.js 사용해서 zip file 저장
              saveAs(content, `${fileName}.zip`);
            });
          })
          .catch((error) => {
            console.error("Error while downloading files:", error);
            window.alert("사용자 분류 다운로드:", error.message);
          });
      })
      .catch((error) => {
        console.log("Error:", error);
        window.alert(error);
      });
  };

  //객체 폴더 다운로드
  const obejDownLoad = () => {
    instance
      .get(`photos/yolo/${tripId}/${obejtag}/`, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`,
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        const photos = response.data.photos;
        const fileName = response.data.tag;

        const zip = new JSZip();

        const downloadPromises = photos.map((photo) => {
          const fileUrl = photo.url;

          return axios
            .get(fileUrl, { responseType: "blob" })
            .then((fileResponse) => {
              const file = new Blob([fileResponse.data], {
                type: fileResponse.data.type,
              });
              zip.file(photo.file_name, file); // 응답 받은 사진을 zip 파일에 추가
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });

        Promise.all(downloadPromises)
          .then(() => {
            // zip파일 만들기
            zip.generateAsync({ type: "blob" }).then((content) => {
              //  FileSaver.js 사용해서 zip file 저장
              saveAs(content, `${fileName}.zip`);
            });
          })
          .catch((error) => {
            console.error("Error while downloading files:", error);
            window.alert("객체분류 다운로드:", error.message);
          });
      })
      .catch((error) => {
        console.log("Error:", error);
        window.alert(error);
      });
  };

  //인물분류 다운로드
  const faceDownLoad = () => {
    instance
      .get(`photos/face/${tripId}/${facetag}/`, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`,
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        const photos = response.data.photos;
        const fileName = response.data.tag;

        const zip = new JSZip();

        const downloadPromises = photos.map((photo) => {
          const fileUrl = photo.url;

          return axios
            .get(fileUrl, { responseType: "blob" })
            .then((fileResponse) => {
              const file = new Blob([fileResponse.data], {
                type: fileResponse.data.type,
              });
              zip.file(photo.file_name, file); // 응답 받은 사진을 zip 파일에 추가
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });

        Promise.all(downloadPromises)
          .then(() => {
            // zip파일 만들기
            zip.generateAsync({ type: "blob" }).then((content) => {
              //  FileSaver.js 사용해서 zip file 저장
              saveAs(content, `${fileName}.zip`);
            });
          })
          .catch((error) => {
            console.error("Error while downloading files:", error);
            window.alert("인물분류 다운로드:", error.message);
          });
      })
      .catch((error) => {
        console.log("Error:", error);
        window.alert(error);
      });
  };

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
            Origin: "https://www.aftertrip.link",
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
          .catch((error) => {
            console.error("Error:", error);
            window.alert(error.message);
          });
      })
      .catch((error) => {
        console.log("error:", error);
        window.alert(error.message);
      });
  };

  if (location.pathname.includes("/charfolder/")) {
    return (
      <DownBtn
        onClick={() => {
          faceDownLoad();
        }}
      >
        <AiOutlineDownload size={"35px"} color="white" />
      </DownBtn>
    );
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
  } else if (location.pathname.includes("/large/")) {
    return (
      <DownBtn
        onClick={() => {
          IndividualDownLoad();
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
export default DownButton;
