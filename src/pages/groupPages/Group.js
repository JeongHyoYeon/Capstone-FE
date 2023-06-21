import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextBox from "../../components/common/TextBox";
import Button from "../../components/common/Button";
import { useNavigate, Link } from "react-router-dom";
import instance from "../../components/Request";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_TOKEN } from "../../components/modules/slices/tokenSlice";
import Loading from "../Loading";
import { CiCirclePlus } from "react-icons/ci";

/* 페이지 전체 */
const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 30px;
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

const Layout4 = styled.div`
  display: block;
  padding-left: 5%;
  margin-left: 1%;
  color: white;
  padding-top: 50px;
`;

const Group = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

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

  
  const groupList = async (e) => {
    setLoading(true);
    await axios;
    instance
      .get(
        `accounts/groups/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
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
    groupList();
  }, []);

  if (loading) return <Loading />;
  else
    return (
      <>
        <Layout4></Layout4>
        {groupInfo.map(({ group_info, user_in_group }) => (
          <Layout2 key={group_info.id}>
            <Link to={`/grouptrip/${group_info.id}`}>
              <TextBox
                text1={group_info.name}
                text2={user_in_group + " "}
                height={"70px"}
              />
            </Link>
            <Layout3
              onClick={() => {
                navAddMember(group_info.id);
              }}
            >
              <CiCirclePlus size="35px" color="#0969DA" />
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
      </>
    );
};

export default Group;
