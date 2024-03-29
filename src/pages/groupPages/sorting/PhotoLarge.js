//사진 개별 상세 페이지
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../../../components/Request";
import Image from "../../../components/common/Image";
import styled from "styled-components";
import DeleteButton from "../../../components/common/DeleteButton";
import DownButton from "../../../components/common/DownButton";

const Layout = styled.div`
  padding-top: 20px;
`;

const Layout3 = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PhotoLarge = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const { photoid } = useParams();
  localStorage.setItem("nowPhotoId", photoid);

  //사진
  const [photoLarge, setPhotoLarge] = useState();

  //개별 사진 가져오는 함수
  const getLarge = async (e) => {
    await axios;
    instance
      .get(
        `photos/detail/${photoid}/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setPhotoLarge(response.data.url);
      })
      .catch((error) => {
        console.log(error);
        window.alert("사진을 로딩할 수 없습니다.");
      });
  };

  useEffect(() => {
    getLarge();
  }, []);

  return (
    <>
      <Layout3>
        <DownButton />
        <DeleteButton />
      </Layout3>

      <Layout>
        <Image src={photoLarge} width={"100%"} height={"100%"} />
      </Layout>
    </>
  );
};
export default PhotoLarge;
