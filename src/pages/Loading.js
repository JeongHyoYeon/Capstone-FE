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
      <PulseLoader color="#0B5CFF" cssOverride={override} size={15} />
    </Container>
  );
};

export default Loading;
