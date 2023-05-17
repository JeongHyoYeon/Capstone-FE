import React from "react";
import styled from "styled-components";

const Box = styled.div`
  height: ${(props) => props.height};
  width: 92%;
  display: flex;
  flex-direction: row;
  justify-content: flex start;
  flex-direction: column;
  color: black;
  background: white;
  outline: #edf1f5 1px solid;
  border-radius: 10px 10px 10px 10px;
  padding-top: 15px;
  box-shadow: 1px 1px 1px lightgrey;
`;

const TextL = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding-bottom: 7px;
  margin-left: 20px;
  font-weight: 600;
`;

const TextS = styled.div`
  font-size: 12px;
  margin-left: 20px;
  font-weight: 600;
  color: #9e9e9e;
`;

const TextBox = (props) => {
  return (
    <Box height={props.height}>
      <TextL>{props.text1}</TextL>
      <TextS>{props.text2}</TextS>
    </Box>
  );
};

export default TextBox;
