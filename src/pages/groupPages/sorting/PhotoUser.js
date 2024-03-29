//게시자별 폴더 상세 페이지
import React from "react";
import CategoryHeader from "./CategoryHeader";
import styled from "styled-components";
import { useState, useEffect } from "react";
import instance from "../../../components/Request";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import UploadModal from "../../../components/common/UploadModal";
import DownButton from "../../../components/common/DownButton";

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
  padding-top: 20px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;
  margin-left: 3%;
  margin-right: 8%;
`;

const Layout4 = styled.div`
  display: flex;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const Down = styled.div`
  display: flex;
  padding: 0 7% 0 0;
  margin: 30px 0 0 0;
`;

const PhotoUser = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  //게시자 id
  const { usertag } = useParams();

  //현재 여행의 id
  const tripId = localStorage.getItem("nowGroupTrip");

  //게시자별 여행 담는 배열
  const [photoUser, setPhotoUser] = useState([]);

  const [photoTag, setPhotoTag] = useState();

  //이름 바꾸는 모달창 노출 여부
  const [modalOpen, setModalOpen] = useState(false);

  //모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

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
      <CategoryHeader />
      <Top>
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
        <Down>
          <DownButton />
        </Down>
      </Top>
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
        <Button
          text={"사진 올리기"}
          width={"200px"}
          fontColor={"white"}
          position={"fixed"}
          bottom={"5%"}
          onClick={() => {
            showModal();
          }}
        />
        {modalOpen && <UploadModal setModalOpen={setModalOpen} />}
      </Layout4>
    </>
  );
};
export default PhotoUser;
