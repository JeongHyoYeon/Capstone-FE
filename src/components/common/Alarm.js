//새로운 초대 유무 알려주는 아이콘
import React, { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import styled from "styled-components";
import { useSelector } from "react-redux";
import instance from "../../components/Request";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AlarmBtn = styled.div`
  border: none;
  //background-color: #eaedf2;
  background-color: none;
  display: flex;
  justify-content: flex-end;
  padding-right: 8%;
  position: relative;
`;

const AlarmNum = styled.div`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: white;
  background-color: red;
  height: 18px;
  width: 18px;
  padding-top: 10%;
  text-align: center;
  border-radius: 50px 50px 50px 50px;
  position: absolute;
  right: 0;
  top: 0px;
`;

const Alarm = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();

  const toInviteList = () => {
    navigate("/invite");
  };

  const [numInvite, setNumInvite] = useState("");

  //새롭게 들어온 초대 목록 수
  const inviteNum = async (e) => {
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
        setNumInvite(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    inviteNum();
  }, []);
  return (
    <>
      <AlarmBtn
        onClick={() => {
          toInviteList();
        }}
      >
        <BiBell size={"30px"} color="white" />
        <AlarmNum>{numInvite}</AlarmNum>
      </AlarmBtn>
    </>
  );
};
export default Alarm;
