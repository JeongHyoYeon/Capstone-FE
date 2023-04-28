import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextBox from "../../components/common/TextBox";
import Button from "../../components/common/Button";
import { useNavigate, Link } from "react-router-dom";
import instance from "../../components/Request";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_TOKEN } from "../../components/modules/slices/tokenSlice";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const Layout2 = styled.div`
  display: block;
  padding-left: 5%;
  margin-left: 1%;
  padding-top: 20px;
`;

const Group = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);
  console.log(JWTtoken);

  var userName = localStorage.getItem("name");

  let newGroupInfo = [];

  const [groupInfo, setGroupInfo] = useState([]);
  const [newInvite, setNewInvite] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    dispatch(DELETE_TOKEN(JWTtoken));
    navigate("/login");
  };

  const navMakeGroup = () => {
    navigate("/makegroups");
  };

  const groupList = async (e) => {
    await axios;
    instance
      .get(
        `/group/`,

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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //초대목록
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
        setNewInvite(response.data[length]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    groupList();
    checkInvite();
  }, []);

  if (newInvite == null) {
    return (
      <>
        <Layout2>
          <Link to={"/invite"}>
            <TextBox
              text1={"최근알림"}
              text2={"들어온 초대가 없습니다."}
              height={"70px"}
            />
          </Link>
        </Layout2>
        <Layout2>
          <h2>{userName}님의 여행</h2>
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
          </Layout2>
        ))}

        <Layout>
          <Button
            text={"새 그룹 만들기"}
            width={"200px"}
            height={"50px"}
            fontColor={"white"}
            position={"fixed"}
            bottom={"12%"}
            onClick={navMakeGroup}
          />
        </Layout>
        <Layout>
          <h3
            style={{
              position: "fixed",
              bottom: "5%",
              textDecoration: "underline",
            }}
            onClick={logOut}
          >
            로그아웃
          </h3>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Layout2>
        <Link to={"/invite"}>
          <TextBox
            text1={"최근알림"}
            text2={newInvite.group_name + "에  초대되었습니다."}
            height={"70px"}
          />
        </Link>
      </Layout2>
      <Layout2>
        <h2>{userName}님의 여행</h2>
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
        </Layout2>
      ))}
      <Layout>
        <Button
          text={"새 그룹 만들기"}
          width={"200px"}
          height={"50px"}
          fontColor={"white"}
          position={"fixed"}
          bottom={"12%"}
          onClick={navMakeGroup}
        />
      </Layout>
      <Layout>
        <h3
          style={{
            position: "fixed",
            bottom: "5%",
            textDecoration: "underline",
          }}
          onClick={logOut}
        >
          로그아웃
        </h3>
      </Layout>
    </>
  );
};
export default Group;
