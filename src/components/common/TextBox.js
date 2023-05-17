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
  background: #dedede;
  outline: #edf1f5 1px solid;
  border-radius: 10px 10px 10px 10px;
  padding-top: 15px;
  box-shadow: 3px 3px 3px lightgrey;
`;

const TextL = styled.div`
  font-size: 13px;
  font-weight: bold;
  padding-bottom: 7px;
  margin-left: 20px;
`;

const TextS = styled.div`
  font-size: 10px;
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
