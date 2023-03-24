import React, { useState } from "react";
import InputBox from "../../components/common/InputBox";
import styled from "styled-components";
import Button from "../../components/common/Button";
import axios from "axios";
import instance from "../../components/Request";
//import { useEffect } from "react";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  position: relative;
  left: 5%;
`;

const Layout1 = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const MakeGroup = () => {
  const [groupName, setgroupName] = useState("");
  // 입력을 받을 id
  let [inputId, setinputId] = useState("");
  //입력 받은 id를 저장할 list
  const [inviteList, setinviteList] = useState([]);
  //새롭게 입력 받은 id를 저장하기
  //let [newInviteList, setnewInviteList] = useState([""]);

  const handlegroupName = (e) => {
    setgroupName(e.target.value);
  };
  const handleinviteId = (e) => {
    setinputId(e.target.value);
  };

  //useEffect(() => setnewInviteList([{ id: inputId }]), [inputId]);

  const addUsers = (e) => {
    setinviteList([...inviteList, { id: inputId }]);
    //setinputId("");
    for (let i = 0; i < inviteList.length; i++) {
      console.log(inviteList[i]);
    }
    console.log(inviteList.length);
  };

  //추가 버튼 누르면 input 초기화되게 만드는 거 나중에 만들기

  //그룹 이름 만드는 함수
  const makegroupName = async (e) => {
    console.log({ groupName });
    await axios;
    instance
      .post(
        "/group/",
        {
          name: groupName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        //handle success
        console.log("success");
        console.log(response);
        localStorage.setItem("groupId", response.data.id);
      })
      .catch((error) => {
        //handle error
        console.log("error:", error.response);
      });
  };

  //다른 유저 초대 함수
  const inviteUser = async (e) => {
    console.log({ inputId });
    var groupId = localStorage.getItem("groupId");
    console.log(groupId);
    await axios;
    instance
      .post(
        "/group/invite/",
        {
          id: groupId,
          invited_user: inputId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        //handle success
        console.log("invite success");
        console.log(response);
      })
      .catch((error) => {
        //handle error
        console.log("error:", error.response);
      });
  };

  return (
    <>
      <Layout>
        <h3>그룹의 이름을 입력하세요.</h3>
        <InputBox height={"35px"} width={"85%"} onChange={handlegroupName} />
        <h3>추가할 친구의 ID를 입력하세요.</h3>
        <InputBox height={"35px"} width={"85%"} onChange={handleinviteId} />
      </Layout>
      <Layout1>
        <h3>
          추가된 아이디:
          {inviteList.map((item) => (
            <>{item.id + " "}</>
          ))}
        </h3>
        {/* <Button
          text={"추가"}
          backgroundColor={"#D9D9D9"}
          width={"80px"}
          fontColor={"BLACK"}
          position={"fixed"}
          bottom={"40%"}
        /> */}
        <button
          type="submit"
          onClick={() => {
            addUsers();
            //inviteUser();
          }}
        >
          추가
        </button>
        <br />
        {/* <Button
          type={"submit"}
          text={"확인"}
          backgroundColor={"#D9D9D9"}
          width={"80px"}
          fontColor={"BLACK"}
          position={"fixed"}
          bottom={"5%"}
          onClick={() => {
            makegroupName();
          }}
        /> */}
        <button
          type="submit"
          onClick={() => {
            makegroupName();
            inviteUser();
          }}
        >
          그룹 만들기
        </button>
      </Layout1>
    </>
  );
};
export default MakeGroup;
