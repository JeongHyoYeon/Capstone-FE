import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import TextBox from "../../components/common/TextBox";
import ImageBox from "../../components/common/ImageBox";
import instance from "../../components/Request";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
//import { useCookies } from "react-cookie";

// const Layout = styled.div`
//   display: flex;
//   justify-content: center;
//   align-content: space-evenly;
//   padding-top: 20px;
// `;

const Layout = styled.div`
  display: block;
  padding-left: 4%;
  padding-top: 10px;
`;

const MyTrip = (props) => {
  //const [cookies, getCookie, removeCookie] = useCookies(["is_login"]);
  //getCookie("is_login");
  //store에 있는 토큰 꺼내기
  const JWTtoken = useSelector((state) => state.authToken.accessToken);
  console.log(JWTtoken);

  var userName = localStorage.getItem("name");
  // var localToken = localStorage.getItem("accessToken");
  // console.log(localToken);

  //내 여행 목록
  let nowMyTripList = [];
  const [MyTripList, setMyTripList] = useState([]);

  const redirect = useNavigate();

  const logOut = () => {
    redirect("/login");
  };

  const [newInvite, setNewInvite] = useState("");

  const authCheck = async (e) => {
    //페이지에 들어올 때 쿠키로 사용자 체크
    //const token = cookies.is_login;
    // const token = localToken;
    // console.log(token);
    console.log(JWTtoken);
    await axios;
    instance
      .get(
        `/trip/user/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            //Content-Type: application/json,
          },
        }
      )
      .then((response) => {
        console.log(response.data);

        for (let i = 0; i < response.data.data.length; i++) {
          nowMyTripList.push(response.data.data[i]);
        }
        setMyTripList([...MyTripList, ...nowMyTripList]);
      })
      .catch((error) => {
        console.log(error);
        logOut();

        //redirect("/login");
      });
  };

  const checkInvite = async (e) => {
    await axios;
    instance
      .get(
        `/group/invite/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            //Content-Type: application/json,
          },
        }
      )
      .then((response) => {
        let length = response.data.length - 1;
        console.log(response.data[length]);
        setNewInvite(response.data[length]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    authCheck();
    checkInvite();
  }, []);

  if (newInvite == null) {
    return (
      <>
        <Layout>
          <TextBox
            text1={"최근알림"}
            text2={"들어온 초대가 없습니다."}
            height={"70px"}
          />
        </Layout>
        <h2
          style={{
            position: "relative",
            left: "5%",
          }}
        >
          {userName}님의 여행
        </h2>
        {MyTripList.slice(0)
          .reverse()
          .map((item) => (
            <Layout key={item.trip_info.id}>
              <Link to={`/grouptripdetail/${item.trip_info.id}`}>
                <ImageBox
                  src={item.trip_info.thumbnail}
                  height={"150px"}
                  text1={item.trip_info.place}
                  text2={
                    item.trip_info.departing_date +
                    " ~ " +
                    item.trip_info.arriving_date
                  }
                />
              </Link>
            </Layout>
          ))}
      </>
    );
  }
  return (
    <>
      <Layout>
        <TextBox
          text1={"최근알림"}
          text2={newInvite.group_name + "에  초대되었습니다."}
          height={"70px"}
        />
      </Layout>
      <h2
        style={{
          position: "relative",
          left: "5%",
        }}
      >
        {userName}님의 여행
      </h2>
      {MyTripList.slice(0)
        .reverse()
        .map((item) => (
          <Layout key={item.trip_info.id}>
            <Link to={`/grouptripdetail/${item.trip_info.id}`}>
              <ImageBox
                src={item.trip_info.thumbnail}
                height={"150px"}
                text1={item.trip_info.place}
                text2={
                  item.trip_info.departing_date +
                  " ~ " +
                  item.trip_info.arriving_date
                }
              />
            </Link>
          </Layout>
        ))}
    </>
  );
};

export default MyTrip;
