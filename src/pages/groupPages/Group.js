import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextBox from "../../components/common/TextBox";
import Button from "../../components/common/Button";
import { useNavigate, Link } from "react-router-dom";
import instance from "../../components/Request";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_TOKEN } from "../../components/modules/slices/tokenSlice";
import Space from "../../components/common/Space";
import Alarm from "../../components/common/Alarm";
import Loading from "../Loading";

/* 페이지 전체 */
const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 0px;
`;

/* 최근 알림, 그룹목록 흰박스 */
const Layout2 = styled.div`
  display: block;
  padding-left: 5%;
  margin-left: 1%;
  padding-top: 15px;
  position: relative;
`;

/* 친구추가 + 버튼 */
const Layout3 = styled.div`
  position: absolute;
  top: 35%;
  right: 10%;
`;

const Group = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  var userName = localStorage.getItem("name");

  let newGroupInfo = [];

  const [groupInfo, setGroupInfo] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    dispatch(DELETE_TOKEN(JWTtoken));
    navigate("/login");
  };

  //로딩화면 여부
  const [loading, setLoading] = useState(true);

  const navMakeGroup = () => {
    navigate("/makegroups");
  };

  //그룹 생성 후 새로운 멤버 추가 페이지
  const navAddMember = (item) => {
    navigate(`/group/${item}`);
  };

  const authCheck = async (e) => {
    await axios;
    instance
      .get(
        `accounts/groups/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            //Content-Type: application/json,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        logOut();
      });
  };

  const groupList = async (e) => {
    setLoading(true);
    await axios;
    instance
      .get(
        `accounts/groups/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            // "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        //let info = { data: [{ group_info: {}, user_in_group: {} }] };
        console.log(response.data.data);

        for (let i = 0; i < response.data.data.length; i++) {
          newGroupInfo.push(response.data.data[i]);
        }
        setGroupInfo([...groupInfo, ...newGroupInfo]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    authCheck();
    groupList();
  }, []);

  if (loading) return <Loading />;
  else
    return (
      <>
        <Layout2>
          <Alarm />
          <h2>{userName}님의 그룹</h2>
        </Layout2>
        {groupInfo.map(({ group_info, user_in_group }) => (
          <Layout2 key={group_info.id}>
            <Link to={`/grouptrip/${group_info.id}`}>
              <TextBox
                text1={group_info.name}
                text2={user_in_group + " "}
                height={"70px"}
              />
            </Link>
            <Layout3>
              <Button
                text={"+"}
                width={"40px"}
                height={"40px"}
                fontColor={"white"}
                onClick={() => {
                  navAddMember(group_info.id);
                }}
              />
            </Layout3>
          </Layout2>
        ))}
        <Layout>
          <Button
            text={"새 그룹 만들기"}
            width={"200px"}
            height={"50px"}
            fontColor={"white"}
            position={"fixed"}
            bottom={"8%"}
            onClick={navMakeGroup}
          />
        </Layout>
        <Layout>
          <h4
            style={{
              //align-items: "flex-end",
              // bottom: "20px",
              color: "#626262",
              textDecoration: "underline",
              position: "fixed",
              bottom: groupInfo.length <= 6 ? "0px" : "auto",
              top: groupInfo.length <= 6 ? "auto" : "calc(90% + 10px)",
            }}
            onClick={logOut}
          >
            로그아웃
          </h4>
        </Layout>
        <Space />
      </>
    );
};

export default Group;
