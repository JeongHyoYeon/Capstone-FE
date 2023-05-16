//그룹 생성하고 난 후에 새로운 멤버 추가하는 컴포넌트
import React from "react";
import { useParams } from "react-router-dom";
import AddMember from "./AddMember";
import styled from "styled-components";
import BackButton from "../../components/common/BackButton";

const Layout = styled.div`
  padding-top: 200px;
  margin-left: 10%;
`;

const Layout3 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const AfterAdd = () => {
  const { groupid } = useParams();

  localStorage.setItem("groupId", groupid);
  return (
    <>
      <Layout3>
        <BackButton />
      </Layout3>
      <Layout>
        <AddMember />
      </Layout>
    </>
  );
};
export default AfterAdd;
