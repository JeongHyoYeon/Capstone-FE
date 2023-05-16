import React from "react";
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
  const [sentence, setSentence] = useState("");
  //분류 결과가 나오지 않았을 때 창에 띄울 문장
  const [notResult, setNotResult] = useState("");
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
  //GPT 결과 사진
  const [result, setResult] = useState([]);

  //gpt 결과 가져오는 함수
  const resultGPT = async () => {
    await axios;
    instance
      .post(
        `photos/search/${nowTrip}/`,
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
        console.log("gpt success");
        console.log(response);
        if (typeof response.data[0] === "string") {
          setNotResult(response.data[0]);
        } else setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   resultGPT();
  // }, [sentence]);
  if (notResult != null) {
    return (
      <>
        <Layout2>
          <BackButton />
        </Layout2>
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
          <h4 style={{ color: "grey", fontWeight: "normal" }}>
            도움말 : OO이 찍은 바다 사진 보여줘
          </h4>
        </Layout>
        <h4
          style={{
            padding: "0 6% 0 6%",
          }}
        >
          {notResult}
        </h4>
      </>
    );
  } else
    return (
      <>
        <Layout2>
          <BackButton />
        </Layout2>
        {/* <CategoryHeader /> */}
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
          <h4 style={{ color: "grey", fontWeight: "normal" }}>
            도움말 : OO이 찍은 바다 사진 보여줘
          </h4>
        </Layout>
      </>
    );
};
export default AutoGPT;
