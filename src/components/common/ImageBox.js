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
  // outline: white 1px solid;
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
  resize: cover;
`;

const Text1 = styled.div`
  font-size: 25px;
  font-weight: 500;
  padding-bottom: 4px;
  margin-left: 20px;
  position: absolute;
  top: 30%;
  left: 33%;
  color: white;
`;

const Text2 = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-left: 20px;
  margin-top: 14px;
  position: absolute;
  top: 45%;
  left: 18%;
  color: white;
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
