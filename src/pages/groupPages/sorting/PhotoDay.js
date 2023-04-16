import React from "react";
import CategoryHeader from "./CategoryHeader";
import styled from "styled-components";
import { useState, useEffect } from "react";
import instance from "../../../components/Request";
import axios from "axios";
import { useSelector } from "react-redux";
import Image from "../../../components/common/Image";

const Layout = styled.div`
  display: flex;
  padding: 10px;
  padding-top: 10px;
  flex-direction: column;
  padding-left: 6%;
`;

const Layout2 = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Layout3 = styled.div`
  display: flex;
  margin: 5px;
  flex-direction: row;
`;

const PhotoDay = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  //현재 여행의 id
  const tripId = localStorage.getItem("nowGroupTrip");

  //날짜별 여행 담는 배열
  const [photoDay, setPhotoDay] = useState([]);

  //그룹 여행 사진이 있는지 확인하는 함수
  const dayPhoto = async (e) => {
    await axios;
    instance
      .get(
        `/photo/${tripId}/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("success");
        console.log(response.data.data);
        setPhotoDay(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    dayPhoto();
  }, []);

  return (
    <>
      <CategoryHeader />

      {photoDay.map((item) => (
        <Layout key={item.date}>
          <h3>{item.date}</h3>
          <Layout2>
            {item.photo.map((items) => (
              <Layout3>
                <Image src={items.url} />
              </Layout3>
            ))}
          </Layout2>
        </Layout>
      ))}
    </>
  );
};
export default PhotoDay;
