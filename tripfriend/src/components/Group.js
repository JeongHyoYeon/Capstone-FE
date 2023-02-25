import React from "react";
import styled from "styled-components";
import TextBox from "./common/TextBox";
import Button from "./common/Button";
import { useNavigate } from "react-router-dom";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const Group = () => {
  const navigate = useNavigate();

  const navMakeGroup = () => {
    navigate("/makegroups");
  };

  return (
    <>
      <Layout>
        <TextBox text1={"정효연"} text2={"정현,효주,연우"} height={"70px"} />
      </Layout>
      <Layout onClick={navMakeGroup}>
        <Button
          text={"새 그룹 만들기"}
          backgroundColor={"#D9D9D9"}
          width={"200px"}
          fontColor={"BLACK"}
          position={"fixed"}
          bottom={"5%"}
        />
      </Layout>
    </>
  );
};
export default Group;
