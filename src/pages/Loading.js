// 서버에서 응답을 받기 전까지 나타나는 로딩 컴포넌트
import React from "react";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";

const override = {
  display: "flex",
  margin: "0 auto",
  borderColor: "#E50915",
  textAlign: "center",
};

const Container = styled.div`
  display: flex;
  maring: 0 auto;
  padding-top: 40%;
`;

const Loading = () => {
  return (
    <Container>
      <PulseLoader color="#4468A9" cssOverride={override} size={15} />
    </Container>
  );
};

export default Loading;
