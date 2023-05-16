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
import UploadButton from "../../../components/common/UploadButton";
import BackButton from "../../../components/common/BackButton";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  //flex-direction: row;
  //height: 50px;
  position: fixed;
  width: 100%;
  bottom: 5%;
`;

const Layout2 = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

const Layout3 = styled.div`
  //display: flex;
  //margin: 5px;
  //flex-direction: column;
  text-align: center;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Layout4 = styled.div`
  display: flex;
  padding: 10px;
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

const Layout6 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px;
`;
const Layout7 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
//이름 수정 버튼
const ModifyBtn = styled.button`
  border: none;
  background-color: #eaecee;
  display: flex;
  padding: 0 7% 0 0;
  margin: 30px 0 0 0;
  //align-items: center;
`;

const PhotoChar = () => {
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

  //얼굴 태그 id
  const { facetag } = useParams();

  const [photoChar, setPhotoChar] = useState([]);

  const [photoTag, setPhotoTag] = useState();

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

  //새로운 이름
  const [newName, setNewName] = useState();

  //현재 분류 페이지 폴더명 바꾸기
  const rename = async (e) => {
    await axios;
    instance
      .patch(
        `photos/face/${tripId}/${facetag}/`,
        { custom_name: newName },
        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        window.alert("폴더명이 변경되었습니다.");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    charPhoto();
  }, []);

  return (
    <>
      <Layout6>
        <BackButton />
      </Layout6>
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
        <ModifyBtn>
          <MdOutlineDriveFileRenameOutline size={"30px"} color="#3178B9" />
        </ModifyBtn>
      </Layout7>
      <Layout3>
        {photoChar.map((item) => (
          <Layout4 key={item.id}>
            <Layout5>
              <Link to={`/photo/large/${item.id}`}>
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
            backgroundColor={isLoading ? "gray" : "#0b5cff"}
            onClick={requestAuto}
            disabled={isLoading}
          />
        </Layout2>
        <Layout2>
          {/* <UploadButton text={"+"} width={"50px"} /> */}
          <Button
            text={"+"}
            width={"50px"}
            fontColor={"white"}
            onClick={() => {
              changePage();
            }}
          />
        </Layout2>
        <Layout2>
          <Button
            text={"GPT에게 물어보기"}
            width={"150px"}
            fontColor={"white"}
            onClick={() => {
              changeGpt();
            }}
          />
        </Layout2>
      </Layout>
    </>
  );
};
export default PhotoChar;
