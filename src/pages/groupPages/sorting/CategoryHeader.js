import React from "react";
import { Link, NavLink } from "react-router-dom";
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
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 50px;
`;

const CategoryHeader = () => {
  const tripId = localStorage.getItem("nowGroupTrip");

  const activeStyle = {
    color: "#A4B0D8",
  };

  return (
    <CategoryAll className="category-header-all">
      <NavWrap className="nav-wrap">
        <Layout className="photo-day" id="day">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to={`/grouptripdetail/${tripId}`}
          >
            <h4>날짜</h4>
          </NavLink>
        </Layout>
        <Layout className="photo-obej" id="object">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/photo/auto/obej"
          >
            <h4>객체분류</h4>
          </NavLink>
        </Layout>
        <Layout className="photo-char" id="character">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/photo/auto/char"
          >
            <h4>인물분류</h4>
          </NavLink>
        </Layout>
        <Layout className="photo-user" id="user">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/photo/userfolder"
          >
            <h4>게시자</h4>
          </NavLink>
        </Layout>
      </NavWrap>
    </CategoryAll>
  );
};
export default CategoryHeader;
