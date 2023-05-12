import React, { useState } from "react";
import InputBox from "../../components/common/InputBox";
import styled from "styled-components";
import Button from "../../components/common/Button";
import axios from "axios";
import instance from "../../components/Request";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
`;

const Layout2 = styled.div`
  margin-left: 5%;
`;

const Layout3 = styled.div`
  background-color: white;
  border-style: solid;
  border-color: #3178b9;
  border-radius: 10px 10px 10px 10px;
  width: 80px;
  text-align: center;
  font-size: 20px;
  margin: 4px;
`;

const Layout4 = styled.p`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const AddMember = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  // 입력을 받을 id
  let [inputId, setinputId] = useState("");
  //입력 받은 id를 저장할 list
  const [inviteList, setinviteList] = useState([]);

  const handleinviteId = (e) => {
    setinputId(e.target.value);
  };

  const navigate = useNavigate();

  const changePage = () => {
    navigate(`/group`);
  };

  //추가하는 그룹 멤버 임시 저장
  const addUsers = (e) => {
    setinviteList([...inviteList, { id: inputId }]);
    //setinputId("");
    for (let i = 0; i < inviteList.length; i++) {
      console.log(inviteList[i]);
    }
    console.log(inviteList.length);
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
        window.alert("초대가 보내졌습니다.");
        console.log(response);
        addUsers(inputId);
      })
      .catch((error) => {
        //handle error
        console.log("error:", error);
        if (error == "AxiosError: Request failed with status code 400")
          window.alert("존재하지 않는 회원입니다.");
      });
  };

  return (
    <>
      <Layout>
        <InputBox
          placeholder="추가할 친구의 ID를 입력하세요."
          height={"50px"}
          width={"70%"}
          onChange={handleinviteId}
        />
        <Layout2>
          <Button
            text={"+"}
            width={"50px"}
            fontColor={"white"}
            onClick={() => {
              inviteUser();
            }}
          />
        </Layout2>
      </Layout>
      <br />
      <h3>초대한 회원</h3>
      <Layout4>
        {inviteList.map((item) => (
          <Layout3>{item.id + " "}</Layout3>
        ))}
      </Layout4>
      <br />
      <Button
        text={"초대완료"}
        width={"85%"}
        fontColor={"white"}
        // position={"fixed"}
        // bottom={"40%"}
        onClick={() => {
          changePage();
        }}
      />
    </>
  );
};
export default AddMember;
