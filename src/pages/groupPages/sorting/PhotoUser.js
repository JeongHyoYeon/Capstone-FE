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
import BackButton from "../../../components/common/BackButton";
//import UploadButton from "../../../components/common/UploadButton";

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
  //display: flex;
  //flex-direction: row;
  //flex-wrap: wrap;
  padding-top: 20px;
  //justify-content: center;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Layout4 = styled.div`
  display: flex;
  justify-content: center;
`;
const Layout5 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px;
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

  const [photoTag, setPhotoTag] = useState();

  //그룹 여행 사진 함수
  const userPhoto = async (e) => {
    await axios;
    instance
      .get(
        `photos/uploader/${tripId}/${usertag}/`,

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
        setPhotoTag(response.data.tag);
        setPhotoUser(response.data.photos);
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
      <Layout5>
        <BackButton />
      </Layout5>
      <CategoryHeader />
      <h2
        style={{
          paddingLeft: "8%",
          paddingTop: "20px",
          paddingBottom: "0",
          marginBottom: "0",
        }}
      >
        {photoTag}
      </h2>
      <Layout3>
        {photoUser.map((item) => (
          <Layout key={item.id}>
            <Layout2>
              <Link to={`/large/${item.id}`}>
                <Image src={item.url} />
              </Link>
            </Layout2>
          </Layout>
        ))}
      </Layout3>
      <Layout4>
        {/* <UploadButton
          text={"사진 올리기"}
          width={"200px"}
          position={"fixed"}
          bottom={"13%"}
        /> */}
        <Button
          text={"사진 올리기"}
          width={"200px"}
          fontColor={"white"}
          position={"fixed"}
          bottom={"5%"}
          onClick={() => {
            changePage();
          }}
        />
      </Layout4>
    </>
  );
};
export default PhotoUser;
