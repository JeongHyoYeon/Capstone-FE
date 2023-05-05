import React from "react";
import CategoryHeader from "./CategoryHeader";
import InputBox from "../../../components/common/InputBox";
import styled from "styled-components";
import instance from "../../../components/Request";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import BackButton from "../../../components/common/BackButton";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0px;
  margin-top: 0;
  flex-direction: column;
  align-items: center;
`;

const Layout2 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const AutoGPT = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  let nowTrip = localStorage.getItem("nowGroupTrip");

  //사용자 질문
  const [sentence, setSentence] = useState();
  //사용자 입력
  const handleST = (e) => {
    setSentence(e.target.value);
  };
  //엔터키
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      resultGPT();
    }
  };

  //gpt 결과 가져오는 함수
  const resultGPT = async () => {
    await axios;
    instance
      .post(
        `/photo-search/${nowTrip}/`,
        {
          user_input: sentence,
        },
        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            // "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data.data);
        console.log(sentence);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   resultGPT();
  // }, [sentence]);

  return (
    <>
      <Layout2>
        <BackButton />
      </Layout2>
      {/* <CategoryHeader /> */}
      <br />
      <br />
      <br />
      <Layout>
        <InputBox
          height={"50px"}
          width={"80%"}
          value={sentence}
          placeholder="찾고 싶은 사진을 입력하세요."
          onChange={handleST}
          onKeyDown={handleKeyPress}
        />
        {/* <FaSearch size="25px" color="black" /> */}

        <h4 style={{ color: "grey", fontWeight: "normal" }}>
          도움말 : OO이 찍은 바다 사진 보여줘
        </h4>
      </Layout>
    </>
  );
};
export default AutoGPT;
