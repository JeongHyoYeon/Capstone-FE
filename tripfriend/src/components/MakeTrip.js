import React from 'react';
import InputBox from './common/InputBox';
import styled from 'styled-components';
import Button from './common/Button';
//import axios from 'axios';

const Layout = styled.div`
    display:flex;
    justify-content :center;
    flex-direction:column;
    padding-top:20px;
    position:relative;
    left:5%;
`;

const Layout1 = styled.div`
    display: flex;
    justify-content : center;
    align-content : space-evenly;
    padding-top:20px;
`;



const MakeTrip= () => {
    return(
         <>
        <Layout>
            <h2>여행지</h2>
            <InputBox
            height={'35px'}
            width={'85%'} />
            <h2>출발 날짜</h2>
            <InputBox
            height={'35px'}
            width={'85%'} />
            <h2>도착 날짜</h2>
            <InputBox
            height={'35px'}
            width={'85%'} />
            <h2>사진 추가하기</h2>
        </Layout>
        <Layout1>
        <Button
            text = {'새 여행 만들기'}
            backgroundColor = {'#D9D9D9'}
            width = {'200px'}
            fontColor = {'BLACK'}
            position ={"fixed"}
            bottom={"5%"} />
        </Layout1>
        </>
         
        
    );
};
export default MakeTrip;