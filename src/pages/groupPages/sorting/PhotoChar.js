import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CategoryHeader from "./CategoryHeader";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../../components/common/Button";
import Image from "../../../components/common/Image";
import styled from "styled-components";
import instance from "../../../components/Request";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import UploadModal from "../../../components/common/UploadModal";
import DownButton from "../../../components/common/DownButton";
import RenameModal from "../../../components/common/RenameModal";

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
  text-align: center;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0px;
`;

const Layout4 = styled.div`
  display: flex;
  padding: 10px;
  padding-top: 0px;
  flex-direction: column;
  padding-left: 6%;
  grid-gap: 0px;
`;

const Layout5 = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: 20px;
  justify-content: space-evenly;
`;

const Layout7 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
`;
//이름 수정 버튼
const ModifyBtn = styled.button`
  border: none;
  display: flex;
  padding: 0 7% 0 0;
  margin: 30px 0 0 0;
  background: none;
`;

const Down = styled.div`
  display: flex;
  padding: 0 10% 0 0;
  margin: 30px 0 0 0;
`;
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PhotoChar = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  //로딩창 여부
  const [isLoading, setIsLoading] = useState(false);

  const tripId = localStorage.getItem("nowGroupTrip");

  //이름 바꾸는 모달창 노출 여부
  const [modalName, setModalName] = useState(false);

  //이름 모달창 노출
  const showModal = () => {
    setModalName(true);
  };

  //얼굴 태그 id
  const { facetag } = useParams();
  localStorage.setItem("facetag", facetag);

  const [photoChar, setPhotoChar] = useState([]);

  const [photoTag, setPhotoTag] = useState();

  //업로드 모달창 노출
  const showModalOpen = () => {
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
        `photos/face/${tripId}/`,
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
        charPhoto();
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  //인물별 사진 가져오기
  const charPhoto = async (e) => {
    await axios;
    instance
      .get(
        `photos/face/${tripId}/${facetag}/`,

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
        setPhotoChar(response.data.photos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    charPhoto();
  }, []);

  if (photoTag === "기타" || photoTag === "얼굴 없음") {
    return (
      <>
        <CategoryHeader />
        <Layout7>
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
          <Right>
            <Down>
              <DownButton />
            </Down>
          </Right>
        </Layout7>
        <Layout3>
          {photoChar.map((item) => (
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
              text={isLoading ? "분류하는 중..." : "인물분류하기"}
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
                showModalOpen();
              }}
            />
          </Layout2>
        </Layout>
        {modalOpen && <UploadModal setModalOpen={setModalOpen} />}
      </>
    );
  } else
    return (
      <>
        <CategoryHeader />
        <Layout7>
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
          <Right>
            <ModifyBtn
              onClick={() => {
                showModal();
              }}
            >
              <MdOutlineDriveFileRenameOutline size={"30px"} color="white" />
            </ModifyBtn>
            {modalName && <RenameModal setModalOpen={setModalName} />}
            <Down>
              <DownButton />
            </Down>
          </Right>
        </Layout7>
        <Layout3>
          {photoChar.map((item) => (
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
              text={isLoading ? "분류하는 중..." : "인물분류하기"}
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
                showModalOpen();
              }}
            />
          </Layout2>
        </Layout>
        {modalOpen && <UploadModal setModalOpen={setModalOpen} />}
      </>
    );
};
export default PhotoChar;
