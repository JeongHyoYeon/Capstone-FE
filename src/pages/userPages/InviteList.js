import React from "react";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";
import instance from "../../components/Request";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Box = styled.div`
  height: 80px;
  width: 92%;
  display: flex;
  flex-direction: row;
  justify-content: flex start;
  flex-direction: column;
  color: black;
  background: white;
  outline: #edf1f5 1px solid;
  border-radius: 20px 20px 20px 20px;
  padding-top: 15px;
`;

const Text = styled.div`
  font-size: 13px;
  font-weight: bold;
  padding-bottom: 7px;
  margin-left: 20px;
`;

const TextDate = styled.div`
  font-size: 10px;
  margin-left: 20px;
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const InviteList = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const [inviteList, setInviteList] = useState([]);
  let nowInviteList = [];

  //초대 목록 가져오기
  const invite = async (e) => {
    await axios;
    instance
      .get(`/group/invite/`, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`,
        },
      })
      .then((response) => {
        console.log("inviteList success");
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i]);
          nowInviteList.push(response.data[i]);
          console.log(nowInviteList[i]);
        }
        setInviteList([...inviteList, nowInviteList]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    invite();
  }, []);

  return (
    <>
      {inviteList
        .slice(0)
        .reverse()
        .map((user_group, group_name) => (
          <Layout>
            <Box>
              <TextDate>{user_group.created_at}</TextDate>
              <Text>{group_name}</Text>
              <Button text={"함께하기"} />
              <Button text={"거절하기"} />
            </Box>
          </Layout>
        ))}
    </>
  );
};
export default InviteList;
