//초대 목록 페이지
import React from "react";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";
import instance from "../../components/Request";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import Loading from "../Loading";

const Box = styled.div`
  height: 110px;
  width: 92%;
  display: flex;
  justify-content: flex start;
  flex-direction: column;
  color: black;
  background: white;
  outline: #edf1f5 1px solid;
  border-radius: 20px 20px 20px 20px;
  padding-top: 15px;
  box-shadow: 3px 3px 3px lightgrey;
`;

const Text = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: black;
  margin-left: 5px;
`;

const GroupNameText = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #4988ef;
`;

const TextDiv = styled.div`
  display: flex;
  justify-content: flex start;
  flex-direction: row;
  margin: 10px 20px 10px 20px;
`;

const Date = styled.div`
  font-size: 12px;
  margin-left: 20px;
  color: #9e9e9e;
  font-weight: 500;
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const Layout2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Layout3 = styled.div`
  padding-top:50px
  display: flex;
  justify-content: center;
  padding-top: 100px;
`;

const InviteList = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const [inviteList, setInviteList] = useState([]);
  let nowInviteList = [];

  //로딩화면 여부
  const [loading, setLoading] = useState(true);

  //초대 목록 가져오기
  const invite = async (e) => {
    setLoading(true);
    await axios;
    instance
      .get(
        `accounts/invite/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
          },
        }
      )
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          nowInviteList.push(response.data[i]);
        }
        setInviteList([...inviteList, ...nowInviteList]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //초대 수락 함수
  const inviteAccept = async (item) => {
    await axios;
    instance
      .patch(
        `accounts/invite/${item}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
          },
        }
      )
      .then((response) => {
        console.log("inviteList accept");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //초대 삭제 함수
  const inviteDelete = async (item) => {
    await axios;
    instance
      .delete(
        `accounts/invite/${item}/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
          },
        }
      )
      .then((response) => {
        console.log("inviteList delete");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    invite();
  }, []);

  if (loading) return <Loading />;
  else if (inviteList.length === 0)
    return (
      <>
        <Layout3>
          <h2 style={{ fontWeight: "500", color: "white" }}>
            들어온 초대가 없습니다.
          </h2>
        </Layout3>
      </>
    );
  else
    return (
      <>
        {inviteList
          .slice(0)
          .reverse()
          .map((inviteList) => (
            <Layout key={inviteList.user_group.id}>
              <Box>
                <Date>{inviteList.user_group.created_at.split("T", 1)}</Date>

                <TextDiv>
                  <GroupNameText>{inviteList.group_name}</GroupNameText>
                  <Text>{"에 초대되셨습니다."}</Text>
                </TextDiv>
                <Layout2>
                  <Button
                    text={"함께하기"}
                    height={"30px"}
                    width={"40%"}
                    fontsize={"12px"}
                    onmouseout={"..."}
                    onClick={() => {
                      inviteAccept(inviteList.user_group.id);
                      setTimeout(() => window.location.reload(), 300);
                    }}
                  />
                  <Button
                    text={"거절하기"}
                    height={"30px"}
                    width={"40%"}
                    fontsize={"12px"}
                    onmouseout={"..."}
                    onClick={() => {
                      inviteDelete(inviteList.user_group.id);
                      setTimeout(() => window.location.reload(), 300);
                    }}
                  />
                </Layout2>
              </Box>
            </Layout>
          ))}
      </>
    );
};
export default InviteList;
