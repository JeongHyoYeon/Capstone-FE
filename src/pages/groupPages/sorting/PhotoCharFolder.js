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
`;


const Layout5 = styled.div`
  display: flex;
  justify-content: center;
  //flex-direction: row;
  //margin: 0 auto;
  //height: 50px;
  //position: fixed;
  //bottom: 10%;
`;

const Layout6 = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

const PhotoChar = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();

  const tripId = localStorage.getItem("nowGroupTrip");

  const changePage = () => {
    navigate("/upload");
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //인물 분류 썸네일 담는 배열
  const [photoThumb, setPhotoThumb] = useState([]);

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
        console.log(response.data.data);
        setPhotoThumb(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    charPhotoThumb();
  }, []);

  return (
    <>
      <CategoryHeader />
      <Layout2>
        {photoThumb.map((item) => (
          <Layout key={item.tag}>
            <Layout3 key={item.thumbnail.id}>
              <Link to={`/photo/face/${item.tag_id}`}>
                <Image src={item.thumbnail.url} />
              </Link>
              <h3>{item.tag}</h3>
            </Layout3>
          </Layout>
        ))}
      </Layout2>
      <Layout5>
        <Layout6>
          <Button
            text={"자동분류하기"}
            width={"150px"}
            fontColor={"white"}
            onClick={() => {
              requestAuto();
            }}
          />
        </Layout6>
        <Layout6>
          <Button
            text={"+"}
            width={"50px"}
            fontColor={"white"}
            onClick={() => {
              changePage();
            }}
          />
        </Layout6>
        <Layout6>
          <Button
            text={"GPT에게 물어보기"}
            width={"150px"}
            fontColor={"white"}
            //onClick={changePage}
          />
        </Layout6>
      </Layout5>
    </>
  );
};
export default PhotoChar;
