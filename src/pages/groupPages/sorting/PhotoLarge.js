import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../../components/Request";
import Image from "../../../components/common/Image";

const PhotoLarge = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const { photoid } = useParams();

  //사진
  const [photoLarge, setPhotoLarge] = useState();

  //개별 사진 가져오는 함수
  const getLarge = async (e) => {
    await axios;
    instance
      .get(
        `/download/${photoid}/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("success");
        console.log(response.data);
        setPhotoLarge(response.data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLarge();
  }, []);

  return (
    <>
      <Image src={photoLarge} />
    </>
  );
};
export default PhotoLarge;
