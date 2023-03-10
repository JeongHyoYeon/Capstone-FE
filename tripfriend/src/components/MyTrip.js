import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./common/Button";
import styled from "styled-components";
import TextBox from "./common/TextBox";
import ImageBox from "./common/ImageBox";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const MyTrip = (props) => {
  const [cookies, getCookie, removeCookie] = useCookies(["is_login"]);
  getCookie("is_login");
  const [userName, setUsername] = useState(props.username);
  const navigate = useNavigate();
  console.log(props.username);

  const navMakeTrip = () => {
    navigate("/maketrips");
  };

  const redirect = useNavigate();

  const logOut = () => {
    removeCookie("is_login");
    navigate("/");
  };

  const authCheck = () => {
    //페이지에 들어올 때 쿠키로 사용자 체크
    const token = cookies.is_login;
    console.log(token);
    axios
      .get(
        `https://www.aftertrip.link/api/trip/user/`,
        { token: token },
        {
          headers: {
            authorization: `Bearer ${getCookie("is_login")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);

        //setUsername(response.data.id);
      })
      .catch((error) => {
        console.log(error);
        logOut();
        redirect("/settings");
      });
  };

  useEffect(() => {
    authCheck();
  });

  return (
    <>
      <Layout>
        <TextBox text1={"최근알림"} text2={""} height={"70px"} />
      </Layout>
      <h1
        style={{
          position: "relative",
          left: "5%",
        }}
      >
        {setUsername}님의 여행
      </h1>
      <Layout>
        <ImageBox height={"150px"} text1={""} text2={""} />
      </Layout>
      <Layout>
        <Button
          onClick={logOut}
          text={"로그아웃"}
          backgroundColor={"#D9D9D9"}
          width={"200px"}
          fontColor={"BLACK"}
          position={"fixed"}
          bottom={"5%"}
        />
      </Layout>
      <Layout onClick={navMakeTrip}>
        <Button
          text={"새 여행 만들기"}
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
export default MyTrip;
