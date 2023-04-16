import React from "react";
import { useEffect } from "react";
import { useState } from "react";
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
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 50px;
`;

const CategoryHeader = () => {
  // const [currentClick, setCurrentClick] = useState(null);
  // const [prevClick, setPrevClick] = useState(null);

  // const GetClick = (e) => {
  //   setCurrentClick(e.target.id);
  // };

  // useEffect(
  //   (e) => {
  //     if (currentClick !== null) {
  //       let current = document.getElementById(currentClick);
  //       current.style.opacity = "1.0"; //찾아온 엘리먼트에 style 속성 먹이기
  //     }

  //     if (prevClick !== null) {
  //       //직전에 클릭한 카테고리에 원래의 style 속성 먹이기
  //       let prev = document.getElementById(prevClick);
  //       prev.style.opacity = "0.1";
  //     }
  //     setPrevClick(currentClick); //클릭한 id 값을 prevClick에 저장함
  //   },
  //   [currentClick]
  // );

  return (
    <CategoryAll className="category-header-all">
      <NavWrap className="nav-wrap">
        <Layout className="photo-day" id="day">
          <Link to={`/photo`}>
            <h3>날짜</h3>
          </Link>
        </Layout>
        <Layout className="photo-obej" id="object">
          <Link to="/photo/auto/obej">
            <h3>객체분류</h3>
          </Link>
        </Layout>
        <Layout className="photo-char" id="character">
          <Link to="/photo/auto/char">
            <h3>인물분류</h3>
          </Link>
        </Layout>
        <Layout className="photo-user" id="user">
          <Link to="/photo/user">
            <h3>게시자</h3>
          </Link>
        </Layout>
      </NavWrap>
    </CategoryAll>
  );
};
export default CategoryHeader;
