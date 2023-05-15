import React, { useState, useEffect } from "react";
import InputBox from "../../components/common/InputBox";
import styled from "styled-components";
import Button from "../../components/common/Button";
import axios from "axios";
import instance from "../../components/Request";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* 이름입력 & +버튼이 들어갈 공간 */
const Layout = styled.div`
  display: flex;
  align-content: space-evenly;
`;

/* 친구추가 + 버튼 */
const Layout2 = styled.div`
  margin-left: 5%;
`;

/* 초대한 회원 이름 박스 */
const Layout3 = styled.div`
  background-color: white;
  border-color: #3178b9;
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
  margin: 5px 150px 50px 5px;
  height: auto;
  flex-wrap: wrap;
`;


/* 이름박스 옆에 엑스표
  근데 이렇게 만들면 안되고
  이름박스+엑스표를 하나의 컴포넌트로 만들고
  거기에 usrid 값을 저장해둬야할듯.

  아니면 엑스 눌렀을때 그것의 부모가 가지고 있는 text의 값을 읽어오거나...
*/
const Layout5 = styled.div`
  position: relative;
  right: -50px;
  bottom: 30px;
`;

var isAlreadyExist = true;

const AddMember = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  let [inputId, setinputId] = useState(""); // 입력을 받을 id
  const [inviteList, setinviteList] = useState([]); //입력 받은 id를 저장할 list

  /* handle invite ID */
  const handleinviteId = (e) => {
    setinputId(e.target.value);
  };


  const navigate = useNavigate();

  const changePage = () => {
    navigate(`/group`);
  };

  /* 추가하는 그룹 멤버 임시 저장 */
  const addUsers = (e) => {
    // 동일한 이름을 다시 입력했을 경우 저장안되게.
    isAlreadyExist = false;
    for (let i = 0; i < inviteList.length; i++) {
      if( inviteList[i].id === inputId) {
        isAlreadyExist = true;
        //!!! 이미 초대를 보냈습니다.
      }
    }
    console.log("add전 list 길이 = ", inviteList.length);

    if (isAlreadyExist === false) {
      console.log("추가");
      setinviteList([...inviteList, { id: inputId }]); //이게 느림. 다른 버튼 클릭했을 때 실행됨.
    }

    // console
    for (let i = 0; i < inviteList.length; i++) {
      console.log(inviteList[i]);
    }
    console.log("add후 list 길이 = ", inviteList.length);
  };

  /*
  //임시 저장 리스트에서 삭제
  const deleteUsers = (id) => {
    console.log(id);
    for (let i = 0; i < inviteList.length; i++) {
      if( inviteList[i].id === id) {
        inviteList.splice(i,1);
        i--;
      }
    }
    
    //console
    console.log("삭제한 id = ", id);
    for (let i = 0; i < inviteList.length; i++) {
      console.log(inviteList[i]);
    }
    console.log("list 길이 = ", inviteList.length);
  };
  */

  //다른 유저 초대 함수
  const inviteUser = async (e) => {
    //console.log({ inputId });
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
      <div>
      <Layout>
        <InputBox
          placeholder="추가할 친구의 ID를 입력하세요."
          height={"50px"}
          width={"75%"}
          onChange={handleinviteId}
        />
        <Layout2>
          <Button
            text={"+"}
            width={"40px"}
            height={"40px"}
            fontColor={"white"}
            onClick={() => {
              inviteUser();
            }}
          />
        </Layout2>
      </Layout>
      
      <h3>초대한 회원</h3>
      <Layout4>
        {inviteList.map((item) => (
          <Layout3 key={item.id}>
            {item.id + " "} 
          </Layout3>
        ))}
      </Layout4>
      </div>

      <Button
        text={"초대 완료"}
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
