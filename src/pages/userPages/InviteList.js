import React from "react";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";
import instance from "../../components/Request";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { ImFileEmpty } from "react-icons/im";
import BackButton from "../../components/common/BackButton";

const Box = styled.div`
  height: 100px;
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
  box-shadow: 3px 3px 3px lightgrey;
`;

const Text = styled.div`
  font-size: 13px;
  font-weight: bold;
  padding-bottom: 12px;
  margin-left: 20px;
  color: black;
`;

const TextDate = styled.div`
  font-size: 10px;
  margin-left: 20px;
  padding-bottom: 5px;
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
  display: flex;
  justify-content: center;

  padding-top: 100px;
`;

const Layout4 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const InviteList = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const [inviteList, setInviteList] = useState([]);
  let nowInviteList = [];

  //버튼 클릭시

  //초대 목록 가져오기
  const invite = async (e) => {
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
        console.log("inviteList success");
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          nowInviteList.push(response.data[i]);
        }

        for (let i = 0; i < nowInviteList.length; i++) {
          console.log(nowInviteList[i]);
        }
        setInviteList([...inviteList, ...nowInviteList]);
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
        console.log(response.data);
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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    invite();
  }, []);

  if (inviteList.length === 0)
    return (
      <>
        <Layout4>
          <BackButton />
        </Layout4>
        <br />
        <br />
        <br />
        <Layout3>
          <ImFileEmpty size="100px" color="#3178B9" />
        </Layout3>
        <Layout3>
          <h2>들어온 초대가 없습니다.</h2>
        </Layout3>
      </>
    );
  else
    return (
      <>
        <Layout4>
          <BackButton />
        </Layout4>
        {inviteList
          .slice(0)
          .reverse()
          .map((inviteList) => (
            <Layout key={inviteList.user_group.id}>
              <Box>
                <TextDate>
                  {inviteList.user_group.created_at.split("T", 1)}
                </TextDate>
                <Text>{inviteList.group_name + "에 초대되셨습니다."}</Text>
                <Layout2>
                  <Button
                    text={"함께하기"}
                    height={"30px"}
                    fontsize={"13px"}
                    onClick={() => {
                      inviteAccept(inviteList.user_group.id);
                      window.location.reload();
                    }}
                  />
                  <Button
                    text={"거절하기"}
                    height={"30px"}
                    fontsize={"13px"}
                    onClick={() => {
                      inviteDelete(inviteList.user_group.id);
                      window.location.reload();
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
