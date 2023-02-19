import React from 'react';
import styled from 'styled-components';

const InputText = styled.input`
    height : ${(props) => props.height};
    width :${(props) => props.width};
    background:#d9d9d9;
    border:none;
    &:focus{
        outline:none;
    }
`;



const InputBox = (props) => {
    
    return(
        <InputText
        height={props.height}
        width={props.width}
        />
        
        
    );
};
export default InputBox;