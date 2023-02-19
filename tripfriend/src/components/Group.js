import React from 'react';
import styled from 'styled-components';
import TextBox from './common/TextBox';
import Button from './common/Button';

const Layout = styled.div`
    display: flex;
    justify-content : center;
    align-content : space-evenly;
    padding-top:20px;
`;


const Group= () => {
  
    return(
        <>
    <Layout>
        <TextBox 
          text1 ={"정효연"}
          text2 ={"정현,효주,연우"}
          height ={'70px'}
        />
    </Layout>
    <Layout>
    <Button
     text = {'새 그룹 만들기'}
     backgroundColor = {'#D9D9D9'}
     width = {'200px'}
     fontColor = {'BLACK'}
     position ={"fixed"}
     bottom={"5%"}
     />
</Layout>
</>
    );
 
 };
 export default Group;