import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextBox from "../../components/common/TextBox";
import Button from "../../components/common/Button";
import { useNavigate, Link } from "react-router-dom";
import instance from "../../components/Request";
import axios from "axios";
import { useSelector } from "react-redux";

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

  let newGroupInfo = [];

  const [groupInfo, setGroupInfo] = useState([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    groupList();

    console.log("useEffect");
  }, []);

  return (
    <>
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
          backgroundColor={"#A4B0D8"}
          width={"200px"}
          height={"50px"}
          fontColor={"white"}
          position={"fixed"}
          bottom={"5%"}
          onClick={navMakeGroup}
        />
      </Layout>
    </>
  );
};
export default Group;
