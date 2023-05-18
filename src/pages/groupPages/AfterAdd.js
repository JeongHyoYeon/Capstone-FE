//그룹 생성하고 난 후에 새로운 멤버 추가하는 컴포넌트
import React from "react";
import { useParams } from "react-router-dom";
import AddMember from "./AddMember";
import styled from "styled-components";

const Layout = styled.div`
  padding-top: 10%;
  margin-left: 10%;
`;

const AfterAdd = () => {
  const { groupid } = useParams();

  localStorage.setItem("groupId", groupid);
  return (
    <>
      <Layout>
        <AddMember />
      </Layout>
    </>
  );
};
export default AfterAdd;
