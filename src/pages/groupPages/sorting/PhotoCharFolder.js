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
import UploadButton from "../../../components/common/UploadButton";

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
  flex-direction: row;
  padding-top: 40px;
  justify-content: space-evenly;
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
  bottom: 10%;
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

const PhotoCharFolder = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();

  const tripId = localStorage.getItem("nowGroupTrip");

  const changePage = () => {
    navigate("/upload");
  };

  const changeGpt = () => {
    navigate("/photo/auto/gpt");
  };

  //자동 분류 요청하기
  const requestAuto = async (e) => {
    await axios;
    instance
      .post(
        `/photo/face/${tripId}/`,
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
        charPhotoThumb();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //인물 분류 썸네일 담는 배열
  const [photoThumb, setPhotoThumb] = useState([]);

  //응답 타입
  //const [resType, setResType] = useState();

  //인물분류 뷰 썸네일 가져오기
  const charPhotoThumb = async (e) => {
    await axios;
    instance
      .get(
        `/photo/face/${tripId}/`,

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
        setPhotoThumb(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    charPhotoThumb();
  }, []);

  if (photoThumb.length == 1) {
    return (
      <>
        <CategoryHeader />
        <Layout7>
          <Layout6>
            <Layout8>
              <FiAlertCircle size="100px" color="#3178B9" />
            </Layout8>
            <h4 style={{ color: "#3178B9" }}>
              아직 사진의 인물분류가 진행되지 않았습니다.
            </h4>
          </Layout6>
          <Layout4>
            <Layout5>
              <Button
                text={"인물분류하기"}
                width={"150px"}
                fontColor={"white"}
                onClick={() => {
                  requestAuto();
                }}
              />
            </Layout5>
            <Layout5>
              {/* <UploadButton text={"+"} width={"50px"} /> */}
              <Button
                text={"+"}
                width={"50px"}
                fontColor={"white"}
                onClick={() => {
                  changePage();
                }}
              />
            </Layout5>
            <Layout5>
              <Button
                text={"GPT에게 물어보기"}
                width={"150px"}
                fontColor={"white"}
                onClick={() => {
                  changeGpt();
                }}
              />
            </Layout5>
          </Layout4>
        </Layout7>
      </>
    );
  } else if (photoThumb != null)
    return (
      <>
        <CategoryHeader />
        <Layout2>
          {photoThumb.map((item) => (
            <Layout key={item.tag}>
              {/* {item.thumbnail.map((items) => ( */}
              <Layout3 key={item.thumbnail.id}>
                <Link to={`/photo/auto/char/${item.tag_id}`}>
                  <Image src={item.thumbnail.url} />
                </Link>
                <h3>{item.tag}</h3>
              </Layout3>
              {/* ))} */}
            </Layout>
          ))}
        </Layout2>
        <Layout4>
          <Layout5>
            <Button
              text={"인물분류하기"}
              width={"150px"}
              fontColor={"white"}
              onClick={() => {
                requestAuto();
              }}
            />
          </Layout5>
          <Layout5>
            {/* <UploadButton text={"+"} width={"50px"} /> */}
            <Button
              text={"+"}
              width={"50px"}
              fontColor={"white"}
              onClick={() => {
                changePage();
              }}
            />
          </Layout5>
          <Layout5>
            <Button
              text={"GPT에게 물어보기"}
              width={"150px"}
              fontColor={"white"}
              onClick={() => {
                changeGpt();
              }}
            />
          </Layout5>
        </Layout4>
      </>
    );
};
export default PhotoCharFolder;
