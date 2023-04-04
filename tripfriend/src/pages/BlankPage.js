import React from "react";
import styled from "styled-components";

const Layout2 = styled.div`
  display: block;
  padding-left: 4%;
  padding-top: 20px;
`;

const BlankPage = (props) => {
  return (
    <>
      <Layout2>
        <h2>{props.data} 없습니다.</h2>
      </Layout2>
    </>
  );
};

export default BlankPage;
