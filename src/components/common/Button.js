import React from "react";
import styled from "styled-components";

const Container = styled.button`
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontsize};
  width: ${(props) => props.width};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.fontColor};
  outline: ${(props) => (props ? `#D9D9D9 1px solid` : false)};
  background: ${(props) => props.backgroundColor};
  border: ${(props) =>
    props["borderColor"].length > 0 ? props.borderColor : "none"};

  word-break: break-all;
  box-shadow: 2px 2px 2px #c3c3c366;
  user-select: none;
  border-radius: 50px 50px 50px 50px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.19, 1, 10.22, 1);
  position: ${(props) => props.position};
  bottom: ${(props) => props.bottom};
  type: ${(props) => props.type};
  &:active {
    background-color: grey;
    box-shadow: inset 1px 1px 3px 0px #9d98983d;
    filter: brightness(100%);
  }
`;

const Text = styled.span``;

const Button = (props) => {
  return (
    <Container
      backgroundColor={props.backgroundColor}
      outline={props.outline}
      borderColor={props.borderColor}
      fontColor={props.fontColor}
      height={props.height}
      width={props.width}
      position={props.position}
      bottom={props.bottom}
      type={props.type}
      onClick={props.onClick}
    >
      <Text>{props.text}</Text>
    </Container>
  );
};

Button.defaultProps = {
  text: "버튼",
  borderColor: "black",
  outline: false,
  backgroundColor: "#A4B0D8",
  fontColor: "white",
  width: "100px",
  height: "50px",
  type: "button",
  onClick: "none",
  fontsize: "16px",
};

export default Button;
