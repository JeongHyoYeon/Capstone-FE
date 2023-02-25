import React from "react";
import InputBox from "./common/InputBox";
import styled from "styled-components";
import Button from "./common/Button";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  position: relative;
  left: 5%;
`;

const Layout1 = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const MakeGroup = () => {
  return (
    <>
      <Layout>
        <h3>그룹의 이름을 입력하세요.</h3>
        <InputBox height={"35px"} width={"85%"} />
        <h3>추가할 친구의 ID를 입력하세요.</h3>
        <InputBox height={"35px"} width={"85%"} />
      </Layout>
      <Layout1>
        <Button
          text={"추가"}
          backgroundColor={"#D9D9D9"}
          width={"80px"}
          fontColor={"BLACK"}
          position={"fixed"}
          bottom={"55%"}
        />
        <Button
          text={"확인"}
          backgroundColor={"#D9D9D9"}
          width={"80px"}
          fontColor={"BLACK"}
          position={"fixed"}
          bottom={"5%"}
        />
      </Layout1>
    </>
  );
};
export default MakeGroup;
