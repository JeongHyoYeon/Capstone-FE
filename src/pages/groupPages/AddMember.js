//그룹에 멤버 추가하기
import React, { useState } from "react";
import InputBox from "../../components/common/InputBox";
import styled from "styled-components";
import Button from "../../components/common/Button";
import axios from "axios";
import instance from "../../components/Request";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";

/* 이름입력 & +버튼이 들어갈 공간 */
const Layout1 = styled.div`
  display: flex;
  align-content: space-evenly;
  margin-bottom: 20px;
`;

/* 친구추가 + 버튼 */
const Layout2 = styled.div`
  margin-left: 5%;
  padding-top: 2%;
`;

/* 초대한 회원 이름 박스 */
const Layout3 = styled.div`
  background-color: white;
  border-color: #3178b9;
  color: #4988ef;
  border-radius: 10px 10px 10px 10px;
  width: auto;
  text-align: center;
  font-size: 20px;
  padding: 7px 10px 7px 10px;
  margin: 5px 5px 5px 5px;
`;

/* 초대한 회원 이름 박스가 나열될 공간 */
const Layout4 = styled.div`
  display: felx;
  justify-content: space-evenly;
  position: relative;
  margin-right: 100px;
  margin-bottom: 200px;
  height: auto;
  flex-wrap: wrap;
`;

/* 초대를 보낸 회원 text */
const Layout5 = styled.div`
  color: white;
  margin-bottom: 20px;
  font-size: 18px;
`;

/* 초대를 보낸 회원 + 목록 + 초대완료버튼 */
const Layout6 = styled.div`
  width: 100%;
`;



const AddMember = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  let [inputId, setinputId] = useState(""); // 입력을 받을 id
  const [inviteList, setinviteList] = useState([]); //입력 받은 id를 저장할 list

  /* handle invite ID */
  const handleinviteId = (e) => {
    setinputId(e.target.value);
  };

  const onReset = (e) => {
    setinputId("");
  };

  const navigate = useNavigate();

  const changePage = () => {
    navigate(`/group`);
  };


  //다른 유저 초대 함수
  const inviteUser = async (e) => {
   
    var groupId = localStorage.getItem("groupId");
    console.log(groupId);
    await axios;
    instance
      .post(
        "accounts/invite/",
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
        window.alert("초대가 보내졌습니다.");
        addUsers(inputId);
        onReset();
      })
      .catch((error) => {
        //handle error
        console.log("error:", error);
        if (error == "AxiosError: Request failed with status code 400")
          window.alert("존재하지 않는 회원입니다.");
        else if (error.response.data[0] == "이미 보낸 초대입니다.") {
          window.alert("이미 보낸 초대입니다");
        } else if (
          error.response.data[0] == "본인에게 초대를 보낼 수 없습니다."
        ) {
          window.alert("본인에게 초대를 보낼 수 없습니다");
        }
      });
  };

  return (
    <div>
      <Layout1>
        <InputBox
          placeholder="추가할 친구의 ID를 입력하세요."
          height={"50px"}
          width={"75%"}
          value={inputId}
          onChange={handleinviteId}
        />
        <Layout2
          onClick={() => {
            inviteUser();
          }}
        >
          <CiCirclePlus size="35px" color="#4988ef" />
        </Layout2>
      </Layout1>
      <Layout4>
        {inviteList.map((item) => (
          <Layout3 key={item.id}>{item.id + " "}</Layout3>
        ))}
      </Layout4>

      <Button
        text={"초대 완료"}
        width={"85%"}
        fontColor={"white"}
        position={"fixed"}
        bottom={"8%"}
        onClick={() => {
          changePage();
        }}
      />
    </div>
  );
};
export default AddMember;
