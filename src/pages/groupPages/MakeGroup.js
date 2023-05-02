import React, { useState } from "react";
import InputBox from "../../components/common/InputBox";
import styled from "styled-components";
import Button from "../../components/common/Button";
import axios from "axios";
import instance from "../../components/Request";
import { useSelector } from "react-redux";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  position: relative;
  left: 6%;
`;

// const Layout1 = styled.div`
//   display: flex;
//   justify-content: center;
//   align-content: space-evenly;
//   padding-top: 20px;
// `;

const MakeGroup = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const [groupName, setgroupName] = useState("");
  // 입력을 받을 id
  let [inputId, setinputId] = useState("");
  //입력 받은 id를 저장할 list
  const [inviteList, setinviteList] = useState([]);
  //새롭게 입력 받은 id를 저장하기
  //let [newInviteList, setnewInviteList] = useState([""]);

  //그룹에 아이디 추가하는 화면 보이게 하기
  const [visible, setvisible] = useState(false);

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
            Authorization: `Bearer ${JWTtoken}`,
            // "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        //handle success
        console.log("success");
        console.log(response);
        console.log(response.data[0].group.id);
        localStorage.setItem("groupId", response.data[0].group.id);
      })
      .catch((error) => {
        //handle error
        console.log("error:", error);
      });
  };

  //다른 유저 초대 함수
  const inviteUser = async (e) => {
    //console.log({ inputId });
    var groupId = localStorage.getItem("groupId");
    console.log(groupId);
    await axios;
    instance
      .post(
        "/group/invite/",
        {
          group: groupId,
          user: inputId,
        },
        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
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
        console.log("error:", error);
        window.alert(error);
      });
  };

  return (
    <>
      <br />
      <br />
      <br />
      <Layout>
        <InputBox
          placeholder="그룹의 이름을 입력하세요."
          height={"50px"}
          width={"85%"}
          onChange={handlegroupName}
        />
        <br />
        <Button
          type={"submit"}
          text={"그룹 만들기"}
          width={"85%"}
          fontColor={"white"}
          // position={"fixed"}
          // bottom={"5%"}
          onClick={() => {
            makegroupName();

            setvisible(!visible);
            //inviteUser();
          }}
        />
        <br />
        <br />
        <InputBox
          placeholder="추가할 친구의 ID를 입력하세요."
          height={"50px"}
          width={"85%"}
          onChange={handleinviteId}
        />
        <br />
        <h3>
          추가된 아이디:
          {inviteList.map((item) => (
            <>{item.id + " "}</>
          ))}
        </h3>
        <br />
        <br />
        <Button
          text={"추가"}
          width={"85%"}
          fontColor={"white"}
          // position={"fixed"}
          // bottom={"40%"}
          onClick={() => {
            addUsers();
            inviteUser();
          }}
        />
      </Layout>
    </>
  );
};

export default MakeGroup;
