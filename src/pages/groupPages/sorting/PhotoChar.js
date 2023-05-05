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

const Layout = styled.div`
  display: flex;
  justify-content: center;
  //flex-direction: row;
  //height: 50px;
  position: fixed;
  width: 100%;
  bottom: 10%;
`;

const Layout2 = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

const Layout3 = styled.div`
  display: flex;
  margin: 5px;
  flex-direction: column;
  text-align: center;
`;

const Layout4 = styled.div`
  display: flex;
  padding: 10px;
  padding-top: 10px;
  flex-direction: column;
  padding-left: 6%;
`;

const Layout5 = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: 40px;
  justify-content: space-evenly;
`;

const PhotoChar = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();

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
      .then((response) => {
        console.log(response);
        window.alert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //인물별 사진 가져오기
  const charPhoto = async (e) => {
    await axios;
    instance
      .get(
        `/photo/face/${tripId}/${facetag}/`,

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
        setPhotoChar(response.data);
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
      <CategoryHeader />
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
            text={"자동분류하기"}
            width={"150px"}
            fontColor={"white"}
            onClick={() => {
              requestAuto();
            }}
          />
        </Layout2>
        <Layout2>
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
