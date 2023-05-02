import React from "react";
import CategoryHeader from "./CategoryHeader";
import styled from "styled-components";
import { useState, useEffect } from "react";
import instance from "../../../components/Request";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";

const Layout = styled.div`
  display: flex;
  padding: 10px;
  padding-top: 10px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Layout2 = styled.div`
  display: flex;
`;

const Layout3 = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 40px;
  justify-content: center;
`;

const Layout4 = styled.div`
  display: flex;
  justify-content: center;
`;

const PhotoUser = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();

  const changePage = () => {
    navigate("/upload");
  };

  //게시자 id
  const { usertag } = useParams();

  //현재 여행의 id
  const tripId = localStorage.getItem("nowGroupTrip");

  //게시자별 여행 담는 배열
  const [photoUser, setPhotoUser] = useState([]);

  //그룹 여행 사진 함수
  const userPhoto = async (e) => {
    await axios;
    instance
      .get(
        `/uploader/${tripId}/${usertag}/`,

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
        setPhotoUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    userPhoto();
  }, []);

  return (
    <>
      <CategoryHeader />
      <Layout3>
        {photoUser.map((item) => (
          <Layout key={item.id}>
            <Layout2>
              <Link to={`/photo/large/${item.id}`}>
                <Image src={item.url} />
              </Link>
            </Layout2>
          </Layout>
        ))}
      </Layout3>
      <Layout4>
        <Button
          text={"사진 올리기"}
          width={"200px"}
          fontColor={"white"}
          position={"fixed"}
          bottom={"13%"}
          onClick={() => {
            changePage();
          }}
        />
      </Layout4>
    </>
  );
};
export default PhotoUser;
