import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import TextBox from "../components/common/TextBox";
import ImageBox from "../components/common/ImageBox";
import instance from "../components/Request";
import { useNavigate } from "react-router-dom";
//import { useCookies } from "react-cookie";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const MyTrip = (props) => {
  //const [cookies, getCookie, removeCookie] = useCookies(["is_login"]);
  //getCookie("is_login");
  var userName = localStorage.getItem("name");
  var localToken = localStorage.getItem("accessToken");
  console.log(localToken);
  //const [userName, setUsername] = useState(null);

  const redirect = useNavigate();

  const logOut = () => {
    //removeCookie("is_login");
    // localStorage.removeItem("id");
    // localStorage.removeItem("accesstoken");
    // localStorage.removeItem("refreshToken");
    //localStorage.clear();
    redirect("/login");
  };

  const authCheck = async (e) => {
    //페이지에 들어올 때 쿠키로 사용자 체크
    //const token = cookies.is_login;
    // const token = localToken;
    // console.log(token);
    await axios;
    instance
      .get(
        `/trip/user/`,

        {
          headers: {
            //Authorization: `Bearer ${localToken}`,
            "Content-Type": "application/json",
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
        //redirect("/login");
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
        {userName}님의 여행
      </h1>
      <Layout>
        <ImageBox height={"150px"} text1={""} text2={""} />
      </Layout>
    </>
  );
};
export default MyTrip;
