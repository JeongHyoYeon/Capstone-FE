import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CategoryHeader from "./CategoryHeader";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../../components/common/Button";
import Image from "../../../components/common/Image";
import styled from "styled-components";
import instance from "../../../components/Request";
import UploadModal from "../../../components/common/UploadModal";
import DownFolder from "../../../components/common/DownFolder";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  //flex-direction: row;
  //height: 50px;
  position: fixed;
  width: 100%;
  bottom: 4%;
`;

const Layout2 = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

const Layout3 = styled.div`
  // display: flex;
  margin: 5px;
  // flex-direction: column;
  text-align: center;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Layout4 = styled.div`
  display: flex;
  //padding: 10px;
  padding-top: 0px;
  flex-direction: column;
  padding-left: 6%;
`;

const Layout5 = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: 20px;
  justify-content: space-evenly;
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

const PhotoObej = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();

  const tripId = localStorage.getItem("nowGroupTrip");

  const [isLoading, setIsLoading] = useState(false);

  //객체 태그 id
  const { obejtag } = useParams();

  const [photoTag, setPhotoTag] = useState();

  const [photoObej, setPhotoObej] = useState([]);

  //모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  //업로드 모달창 노출 여부
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
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        ObejPhoto();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  //객체별 사진 가져오기
  const ObejPhoto = async (e) => {
    await axios;
    instance
      .get(
        `photos/yolo/${tripId}/${obejtag}/`,

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
        setPhotoObej(response.data.photos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    ObejPhoto();
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
          <DownFolder />
        </Down>
      </Top>
      <Layout3>
        {photoObej.map((item) => (
          <Layout4 key={item.id}>
            <Layout5>
              <Link to={`/large/${item.id}`}>
                <Image src={item.url} />
              </Link>
            </Layout5>
          </Layout4>
        ))}
      </Layout3>
      <Layout>
        <Layout2>
          <Button
            text={isLoading ? "분류하는 중..." : "객체분류하기"}
            width={"150px"}
            fontColor={"white"}
            backgroundColor={isLoading ? "gray" : "#4988ef"}
            onClick={requestAuto}
            disabled={isLoading}
          />
        </Layout2>
        <Layout2>
          <Button
            text={"사진 올리기"}
            width={"150px"}
            fontColor={"white"}
            onClick={() => {
              showModal();
            }}
          />
        </Layout2>
      </Layout>
      {modalOpen && <UploadModal setModalOpen={setModalOpen} />}
    </>
  );
};
export default PhotoObej;
