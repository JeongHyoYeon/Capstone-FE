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
import BackButton from "../../../components/common/BackButton";
//import UploadButton from "../../../components/common/UploadButton";

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

const Layout6 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px;
`;

const PhotoObej = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();

  const tripId = localStorage.getItem("nowGroupTrip");

  const [isLoading, setIsLoading] = useState(false);

  const changePage = () => {
    navigate("/upload");
  };

  const changeGpt = () => {
    navigate("/photo/auto/gpt");
  };

  //객체 태그 id
  const { obejtag } = useParams();

  const [photoTag, setPhotoTag] = useState();

  const [photoObej, setPhotoObej] = useState([]);

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
      <Layout6>
        <BackButton />
      </Layout6>
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
        {photoObej.map((item) => (
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
            text={isLoading ? "분류하는 중..." : "객체분류하기"}
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
export default PhotoObej;
