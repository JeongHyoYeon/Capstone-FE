import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageBox from "../components/common/ImageBox";
import styled from "styled-components";
import instance from "../components/Request";
import Button from "../components/common/Button";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const GroupTripList = () => {
  //그룹 아이디
  const { groupNum } = useParams();
  console.log(groupNum);
  localStorage.setItem("nowGroup", groupNum);

  const [groupName, setGroupName] = useState("");

  const navigate = useNavigate();
  const navMakeTrip = () => {
    navigate("/maketrips");
  };

  // group의 여행 목록
  const groupdetail = async (e) => {
    await axios;
    instance
      .get(
        `/trip/${groupNum}/`,

        {
          headers: {
            //Authorization: `Bearer ${localToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("success");
        console.log(response.data);
        setGroupName(response.data.data.group_name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    groupdetail();
  });

  return (
    <>
      <h1
        style={{
          position: "relative",
          left: "5%",
        }}
      >
        {groupName}의 여행
      </h1>
      <Layout>
        <ImageBox height={"150px"} text1={""} text2={""} />
      </Layout>
      <Layout onClick={navMakeTrip}>
        <Button
          text={"새 여행 만들기"}
          backgroundColor={"#D9D9D9"}
          width={"200px"}
          fontColor={"BLACK"}
          position={"fixed"}
          bottom={"5%"}
        />
      </Layout>
    </>
  );
};
export default GroupTripList;
