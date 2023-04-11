import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CategoryAll = styled.div`
  margin-top: 0;
  padding-top: 0;
  color: grey;
`;
const NavWrap = styled.nav`
  display: flex;
  overflow: visible;
`;
const Layout = styled.div`
  float: left;
  width: 33.3%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 50px;
`;

const CategoryHeader = () => {
  return (
    <CategoryAll className="category-header-all">
      <NavWrap className="nav-wrap">
        <Layout className="photo-day">
          <Link to="/photo">
            <h3>날짜</h3>
          </Link>
        </Layout>
        <Layout className="photo-auto">
          <Link to="/photo/auto">
            <h3 style={{ color: "black", fontWeight: "bold" }}>자동분류</h3>
          </Link>
        </Layout>
        <Layout className="photo-user">
          <Link to="/photo/user">
            <h3>게시자</h3>
          </Link>
        </Layout>
      </NavWrap>
    </CategoryAll>
  );
};
export default CategoryHeader;
