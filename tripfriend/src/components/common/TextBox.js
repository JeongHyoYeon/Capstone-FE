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
  border-radius: 20px 20px 20px 20px;
  padding-top: 15px;
`;

const TextL = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 4px;
  margin-left: 20px;
`;

const TextS = styled.div`
  font-size: 16px;
  margin-left: 20px;
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
