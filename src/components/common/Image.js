//텍스트 없이 이미지만 있는
import React from "react";
import styled from "styled-components";

const Box = styled.div`
  height: 102px;
  width: 102px;
  background: white;
  border-radius: 0px 0px 0px 0px;
  position: relative;
  overflow: hidden;
  //box-shadow: 3px 3px 3px lightgrey;
`;

const Imageinput = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 0px 0px 0px 0px;
  resize: cover;
`;

const Image = (props) => {
  return (
    <>
      <Box>
        <Imageinput src={props.src} height={props.height} />
      </Box>
    </>
  );
};

export default Image;
