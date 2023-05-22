import React, { useState } from "react";
import InputBox from "../../components/common/InputBox";
import styled from "styled-components";
import Button from "../../components/common/Button";
import axios from "axios";
import instance from "../../components/Request";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 10%;
  position: relative;
  left: 6%;
`;

const Layout2 = styled.div`
  margin-bottom: 10%;
`;

const Layout3 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const MakeGroup = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const [groupName, setgroupName] = useState("");

  const handlegroupName = (e) => {
    setgroupName(e.target.value);
  };

  //group페이지로 돌아가는 함수
  const navigate = useNavigate();
  const changePage = () => {
    navigate(`/group`);
  };

  //그룹 이름 만드는 함수
  const makegroupName = async (e) => {
    console.log({ groupName });
    await axios;
    instance
      .post(
        "accounts/groups/",
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
        console.log(response.data[0].group.id);
        localStorage.setItem("groupId", response.data[0].group.id);
      })
      .catch((error) => {
        //handle error
        console.log("error:", error);
      });
  };

  return (
    <>
      <Layout>
        <Layout2>
          <InputBox
            placeholder="그룹의 이름을 입력하세요."
            height={"50px"}
            width={"85%"}
            padding={"10px"}
            onChange={handlegroupName}
          />
        </Layout2>

        <Button
          type={"submit"}
          text={"그룹 생성"}
          width={"85%"}
          fontColor={"white"}
          onClick={() => {
            makegroupName();
            window.alert("그룹이 생성되었습니다.");
            changePage();
          }}
        />
      </Layout>
    </>
  );
};

export default MakeGroup;
