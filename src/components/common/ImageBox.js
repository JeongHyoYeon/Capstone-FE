import { blueGrey } from "@mui/material/colors";
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
  background: white;
  border-radius: 10px 10px 10px 10px;
  position: relative;
  overflow: hidden;
  //box-shadow: 3px 3px 3px lightgrey;
`;

const Imageinput = styled.img`
  height: 100%;
  width: 100%;
  //filter: opacity(60%);
  filter: contrast(40%);
  border-radius: 10px 10px 10px 10px;
`;

const Text1 = styled.div`
  color: white;
  font-size: 25px;
  font-weight: 500;
  text-align: center;
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);

`;

const Text2 = styled.div`
  color: white;
  font-size: 15px;
  font-weight: 400;
  position: absolute;
  top: 68%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// const FilterBox = styled.div`
//   //background-color: rgba(0, 0, 0, 0.5);
//   height: ${(props) => props.height};
//   width: 92%;
//   background-color: red;
// `;

const ImageBox = (props) => {
  return (
    <>
      <Box height={props.height}>
        <Imageinput src={props.src} height={props.height} />
        <Text1>{props.text1}</Text1>
        <Text2>{props.text2}</Text2>
      </Box>
    </>
  );
};

export default ImageBox;
