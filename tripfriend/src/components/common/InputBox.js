import React from "react";
import styled from "styled-components";

const InputText = styled.input`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background: #d9d9d9;
  border: none;
  &:focus {
    outline: none;
  }
  placeholder: ${(props) => props.placeholder};
`;

const InputBox = (props) => {
  return (
    <InputText
      height={props.height}
      width={props.width}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

InputBox.defaultProps = {
  placeholder: " ",
  defaultValue: {},
};
export default InputBox;
