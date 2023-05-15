import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextBox from "../../components/common/TextBox";
import Button from "../../components/common/Button";
import { useNavigate, Link } from "react-router-dom";
import instance from "../../components/Request";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_TOKEN } from "../../components/modules/slices/tokenSlice";
//import Modal from "react-modal";

/* 페이지 전체 */
const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

/* 최근 알림 흰박스 */
const Layout2 = styled.div`
  display: block;
  padding-left: 5%;
  margin-left: 1%;
  padding-top: 20px;
  position: relative;
`;

/* 그룹 목록 흰박스 */
const Layout4 = styled.div`
  margin-top: 15%;
  display: block;
  padding-left: 5%;
  margin-left: 1%;
  padding-top: 20px;
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
  const [newInvite, setNewInvite] = useState("");
  //모달창
  //const [modalIsOpen, setModalIsOpen] = useState(false);

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
        `accounts/invite/`,

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
    authCheck();
    groupList();
    checkInvite();
  }, []);

  if (newInvite == null) {
    return (
      <>
        <Layout4>
          <Link to={"/invite"}>
            <TextBox
              text1={"최근알림"}
              text2={"들어온 초대가 없습니다."}
              height={"70px"}
            />
          </Link>
        </Layout4>
        <Layout2>
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
                width={"45px"}
                height={"45px"}
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
            bottom={"5%"}
            onClick={navMakeGroup}
          />
        </Layout>
        <Layout>
          <h3
            style={{
              //align-items: "flex-end",
              // bottom: "20px",
              textDecoration: "underline",
              position: "fixed",
              bottom: groupInfo.length <= 6 ? "10px" : "auto",
              top: groupInfo.length <= 6 ? "auto" : "calc(93% + 0px)",
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
              width={"45px"}
              height={"45px"}
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
          bottom={"12%"}
          onClick={navMakeGroup}
        />
     
        <h5
          style={{
            textDecoration: "underline",
            position: "fixed",
            bottom: groupInfo.length <= 6 ? "10px" : "auto",
            top: groupInfo.length <= 6 ? "auto" : "calc(100% + 30px)",
          }}
          onClick={logOut}
        >
          로그아웃
        </h5>
      </Layout>
    </>
  );
};
export default Group;