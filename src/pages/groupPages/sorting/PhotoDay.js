import React from "react";
import CategoryHeader from "./CategoryHeader";
import styled from "styled-components";
import { useState, useEffect } from "react";
import instance from "../../../components/Request";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";

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

const Layout4 = styled.div`
  display: flex;
  justify-content: center;
`;

const PhotoDay = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();

  const changePage = () => {
    navigate("/upload");
  };

  //현재 여행의 id
  const tripId = localStorage.getItem("nowGroupTrip");

  //날짜별 여행 담는 배열
  const [photoDay, setPhotoDay] = useState([]);

  //그룹 여행 사진 함수
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

  //날짜 문자열 함수
  const toDate = (value) => {
    if (value === null) {
      return "기타";
    }
    return (
      value.slice(0, 4) +
      "년 " +
      value.slice(5, 7) +
      "월 " +
      value.slice(8, 10) +
      "일"
    );
  };

  useEffect(() => {
    dayPhoto();
  }, []);

  return (
    <>
      <CategoryHeader />
      {photoDay.map((item) => (
        <Layout key={item.date}>
          <h3>{toDate(item.date)}</h3>
          <Layout2>
            {item.photo.map((items) => (
              <Layout3 key={items.id}>
                <Link to={`/photo/large/${items.id}`}>
                  <Image src={items.url} />
                </Link>
              </Layout3>
            ))}
          </Layout2>
        </Layout>
      ))}
      <Layout4>
        <Button
          text={"사진 올리기"}
          width={"200px"}
          fontColor={"white"}
          position={"fixed"}
          bottom={"13%"}
          onClick={changePage}
        />
      </Layout4>
    </>
  );
};
export default PhotoDay;
