import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CategoryHeader from "./CategoryHeader";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../../components/common/Button";
import Image from "../../../components/common/Image";
import styled from "styled-components";
import instance from "../../../components/Request";
import { FiAlertCircle } from "react-icons/fi";
//import Space from "../../../components/common/Space";
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
  // display: flex;
  // flex-wrap: wrap;
  // flex-direction: row;
  //padding-top: 40px;
  // justify-content: space-evenly;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  padding-top: 50px;
`;

const Layout3 = styled.div`
  display: flex;
  margin: 5px;
  flex-direction: column;
  text-align: center;
`;

const Layout4 = styled.div`
  display: flex;
  justify-content: center;
  //flex-direction: row;
  //height: 50px;
  position: fixed;
  width: 100%;
  bottom: 4%;
`;

const Layout5 = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

const Layout6 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 150px;
`;

const Layout7 = styled.div`
  display: flex;
  justify-content: center;
`;

const Layout8 = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 20px;
  padding-left: 30%;
`;

const PhotoObejFolder = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const tripId = localStorage.getItem("nowGroupTrip");

  const changePage = () => {
    navigate("/upload");
  };

  const changeGpt = () => {
    navigate("/photo/auto/gpt");
  };

  //모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  //이름 바꾸는 모달창 노출 여부
  const [modalOpen, setModalOpen] = useState(false);

  //자동 분류 요청하기
  const requestAuto = async (e) => {
    setIsLoading(true);
    await axios;
    instance
      .post(
        `photos/yolo/${tripId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.alert(res.data);
        setIsLoading(false);
        obejPhotoReady();
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  //객체 분류 썸네일
  const [photoThumb, setPhotoThumb] = useState([]);

  //응답 타입
  //const [resType, setResType] = useState();

  //로딩화면 여부
  const [loading, setLoading] = useState(true);

  //객체 분류 여부
  const obejPhotoReady = async (e) => {
    setLoading(true);
    await axios;
    instance
      .get(
        `photos/yolo/${tripId}/`,

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
        console.log(response.data.data);
        //console.log(typeof response.data);
        //setResType(typeof response.data);
        setPhotoThumb(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    obejPhotoReady();
  }, []);

  if (loading) return <Loading />;
  else if (photoThumb.length === 0) {
    return (
      <>
        <CategoryHeader />
        <Layout7>
          <Layout6>
            <Layout8>
              <FiAlertCircle size="100px" color="#4988ef" />
            </Layout8>
            <h4 style={{ color: "#4988ef" }}>
              아직 사진의 객체분류가 진행되지 않았습니다.
            </h4>
          </Layout6>
          <Layout4>
            <Layout5>
              <Button
                text={isLoading ? "분류하는 중..." : "객체분류하기"}
                width={"150px"}
                fontColor={"white"}
                backgroundColor={isLoading ? "gray" : "#4988ef"}
                onClick={requestAuto}
                disabled={isLoading}
              />
            </Layout5>
            <Layout5>
              <Button
                text={"사진 올리기"}
                width={"150px"}
                fontColor={"white"}
                onClick={() => {
                  showModal();
                }}
              />
            </Layout5>
          </Layout4>
        </Layout7>
        {modalOpen && <UploadModal setModalOpen={setModalOpen} />}
      </>
    );
  } else if (photoThumb != null)
    return (
      <>
        <CategoryHeader />
        <Layout2>
          {photoThumb.map((item) => (
            <Layout key={item.tag_id}>
              {/* {item.thumbnail.map((items) => ( */}
              <Layout3 key={item.thumbnail.id}>
                <Link to={`/photo/auto/obejfolder/${item.tag_id}`}>
                  <Image src={item.thumbnail.url} />
                </Link>
                <h4>{item.tag}</h4>
              </Layout3>
              {/* ))} */}
            </Layout>
          ))}
        </Layout2>
        <Layout4>
          <Layout5>
            <Button
              text={isLoading ? "분류하는 중..." : "객체분류하기"}
              width={"150px"}
              fontColor={"white"}
              backgroundColor={isLoading ? "gray" : "#4988ef"}
              onClick={requestAuto}
              disabled={isLoading}
            />
          </Layout5>

          <Layout5>
            <Button
              text={"사진 올리기"}
              width={"150px"}
              fontColor={"white"}
              onClick={() => {
                showModal();
              }}
            />
          </Layout5>
        </Layout4>
        {modalOpen && <UploadModal setModalOpen={setModalOpen} />}
      </>
    );
};
export default PhotoObejFolder;
