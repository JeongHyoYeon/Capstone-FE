//분류페이지 헤더
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const CategoryAll = styled.div`
  margin-top: 0;
  padding-top: 0;
  color: white;
`;
const NavWrap = styled.nav`
  display: flex;
  overflow: visible;
  margin-top: 0;
  padding-top: 0;
`;
const Layout = styled.div`
  margin-top: 0;
  padding-top: 0;
  float: left;
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 40px;
`;

const CategoryHeader = () => {
  const tripId = localStorage.getItem("nowGroupTrip");

  const activeStyle = {
    color: "#4988ef",
  };

  return (
    <CategoryAll className="category-header-all">
      <NavWrap className="nav-wrap">
        <Layout className="photo-day" id="day">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to={`/grouptripdetail/${tripId}`}
          >
            <h3>날짜</h3>
          </NavLink>
        </Layout>
        <Layout className="photo-obej" id="object">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/photo/auto/obejfolder"
          >
            <h3>객체분류</h3>
          </NavLink>
        </Layout>
        <Layout className="photo-char" id="character">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/photo/auto/charfolder"
          >
            <h3>인물분류</h3>
          </NavLink>
        </Layout>
        <Layout className="photo-user" id="user">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/photo/userfolder"
          >
            <h3>게시자</h3>
          </NavLink>
        </Layout>
      </NavWrap>
    </CategoryAll>
  );
};
export default CategoryHeader;
