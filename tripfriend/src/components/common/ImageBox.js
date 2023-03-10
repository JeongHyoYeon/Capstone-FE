import React from "react";
import styled from "styled-components";

const Box = styled.div`
  height: ${(props) => props.height};
  width: 92%;
  display: flex;
  justify-content: flex start;
  flex-direction: column;
  align-items: flex start;
  color: black;
  background: #d9d9d9;
  outline: #d9d9d9 1px solid;
  border-radius: 20px 20px 20px 20px;
  position: relative;
  overflow: hidden;
`;

const Imageinput = styled.img`
  height: 100%;
  width: 100%;
  filter: opacity(50%);
  border-radius: 20px 20px 20px 20px;
  resize: cover;
`;

const Text1 = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 4px;
  margin-left: 20px;
  position: absolute;
  top: 10%;
  left: 3%;
`;

const Text2 = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  position: absolute;
  top: 25%;
  left: 3%;
`;

const ImageBox = (props) => {
  return (
    <>
      <Box height={props.height}>
        <Imageinput src={props.source} height={props.height} />
        <Text1>{props.text1}</Text1>
        <Text2>{props.text2}</Text2>
      </Box>
    </>
  );
};

export default ImageBox;
