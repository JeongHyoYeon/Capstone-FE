//게시자별 폴더 페이지
import React from "react";
import CategoryHeader from "./CategoryHeader";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import instance from "../../../components/Request";
import { useState, useEffect } from "react";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../../Loading";
import UploadModal from "../../../components/common/UploadModal";

const Layout = styled.div`
  display: flex;
  padding: 10px;
  padding-top: 10px;
  flex-direction: column;
  padding-left: 6%;
`;

const Layout2 = styled.div`
  padding-top: 40px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Layout3 = styled.div`
  display: flex;
  margin: 5px;
  flex-direction: column;
  text-align: center;
  color: white;
`;

const Layout4 = styled.div`
  display: flex;
  justify-content: center;
`;

const PhotoUserFolder = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();

  const changePage = () => {
    navigate("/upload");
  };

  //현재 여행의 id
  const tripId = localStorage.getItem("nowGroupTrip");

  //게시자별 썸네일 담는 배열
  const [photoThumb, setPhotoThumb] = useState([]);

  //로딩화면 여부
  const [loading, setLoading] = useState(true);

  //이름 바꾸는 모달창 노출 여부
  const [modalOpen, setModalOpen] = useState(false);

  //모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  //게시자별 뷰 썸네일 가져오기
  const userPhotoThumb = async (e) => {
    setLoading(true);
    await axios;
    instance
      .get(
        `photos/uploader/${tripId}/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setPhotoThumb(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    userPhotoThumb();
  }, []);

  if (loading) return <Loading />;
  else
    return (
      <>
        <CategoryHeader />
        <Layout2>
          {photoThumb.map((item) => (
            <Layout key={item.tag}>
              <Layout3 key={item.thumbnail.id}>
                <Link to={`/photo/userfolder/${item.thumbnail.uploaded_by}`}>
                  <Image src={item.thumbnail.url} />
                </Link>
                <h3>{item.tag}</h3>
              </Layout3>
            </Layout>
          ))}
        </Layout2>
        <Layout4>
          <Button
            text={"사진 올리기"}
            width={"200px"}
            fontColor={"white"}
            position={"fixed"}
            bottom={"13%"}
            onClick={() => {
              showModal();
            }}
          />

          {modalOpen && <UploadModal setModalOpen={setModalOpen} />}
        </Layout4>
      </>
    );
};
export default PhotoUserFolder;
