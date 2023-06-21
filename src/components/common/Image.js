//텍스트 없이 이미지만 있는 박
import React from "react";
import styled from "styled-components";

const Box = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background: white;
  border-radius: 5px 5px 5px 5px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  //box-shadow: 3px 3px 3px lightgrey;
`;

const Imageinput = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 0px 0px 0px 0px;
  object-fit: cover;
  background-size: cover;
`;

const Image = (props) => {
  return (
    <>
      <Box height={props.height} width={props.width}>
        <Imageinput src={props.src} />
      </Box>
    </>
  );
};

Image.defaultProps = {
  height: "120px",
  width: "102px",
};

export default Image;
