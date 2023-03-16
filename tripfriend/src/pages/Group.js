import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextBox from "../components/common/TextBox";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import instance from "../components/Request";
import axios from "axios";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const Group = () => {
  const [groupName, setgroupName] = useState("");
  const navigate = useNavigate();

  const navMakeGroup = () => {
    navigate("/makegroups");
  };
  const groupList = async (e) => {
    //페이지에 들어올 때 쿠키로 사용자 체크
    //const token = cookies.is_login;
    await axios;
    instance
      .get(
        `/group/`,

        {
          // headers: {
          //   authorization: `Bearer ${token}`,
          // },
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        //console.log(response.data);
        setgroupName(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    groupList();
  });

  return (
    <>
      {groupName &&
        groupName.map(({ name }) => (
          <Layout>
            <TextBox text1={name} text2={""} height={"70px"} />
          </Layout>
        ))}
      <Layout onClick={navMakeGroup}>
        <Button
          text={"새 그룹 만들기"}
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
export default Group;
