import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
      height: 70px;
      font-size :20px;
      width: ${(props) => props.width};
      display: flex;
      justify-content : center;
      align-items: center;
      color: ${(props)=>props.fontColor};
      outline: ${(props)=> props ? `white 1px solid`: false};
      background: ${(props) => props.backgroundColor};
      border :${(props)=> props['borderColor'].length>0 ? props.borderColor: 'none'};
      word-break :break-all;
      box-shadow :2px 2px 2px #c3c3c366;
      user-select: none;
      border-radius : 75px 75px 75px 75px;
      cursor : pointer;
      transition: 0.3s cubic-bezier(0.19, 1,10.22, 1);
      position: ${(props) => props.position};
      bottom: ${(props) => props.bottom};

      &:active{
        background-color: grey;
        box-shadow : inset 1px 1px 3px 0px #9d98983d;
        filter: brightness(100%);
      }
`;

const Text = styled.span`
`;


const Button = (props) =>{
    return(
        <Container
           backgroundColor={props.backgroundColor}
           outline = {props.outline}
           borderColor = {props.borderColor}
           fontColor ={props.fontColor}
           width = {props.width}
           position ={props.position}
           bottom ={props.bottom}
           >
        <Text>
            {props.text}
        </Text>
        </Container>
    );
}

Button.defaultProps ={
    text : '버튼',
    borderColor : 'black',
    outline : false ,
    backgroundColor: '#D2E1F3',
    fontColor:'white',
    width: '100px',
}

export default Button;