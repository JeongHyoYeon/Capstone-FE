import React from "react";
import styled from "styled-components";

const InputText = styled.input`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background: white;
  border: none;
  border-radius: 10px 10px 10px 10px;
  outline: #d9d9d9 1px solid;
  padding-left: 20px;
  &:focus {
    outline: none;
  }
  placeholder: ${(props) => props.placeholder};
  type: ${(props) => props.type};
`;

const InputBox = (props) => {
  return (
    <InputText
      height={props.height}
      width={props.width}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      type={props.type}
      onKeyDown={props.onKeyDown}
    />
  );
};

InputBox.defaultProps = {
  placeholder: " ",
  defaultValue: {},
  type: "text",
};
export default InputBox;
