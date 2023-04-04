import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ImageBox from "../../components/common/ImageBox";
import styled from "styled-components";
import instance from "../../components/Request";
import Button from "../../components/common/Button";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const Layout2 = styled.div`
  display: block;
  padding-left: 4%;
  padding-top: 20px;
`;

const GroupTripList = () => {
  //그룹 아이디
  const { groupNum } = useParams();
  console.log(groupNum);
  localStorage.setItem("nowGroup", groupNum);

  const [groupName, setGroupName] = useState("");
  //그룹별 여행 목록
  let nowGroupTripList = [];
  const [groupTripList, setGroupTripList] = useState([]);

  const navigate = useNavigate();
  const navMakeTrip = () => {
    navigate("/maketrips");
  };

  // group의 여행 목록
  const groupdetail = async (e) => {
    //e.preventDefault();
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

        for (let i = 0; i < response.data.data.trip_list.length; i++) {
          nowGroupTripList.push(response.data.data.trip_list[i]);
        }
        setGroupTripList([...groupTripList, ...nowGroupTripList]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    groupdetail();
  }, []);

  return (
    <>
      <h1
        style={{
          position: "relative",
          left: "8%",
        }}
      >
        {groupName}의 여행
      </h1>
      {groupTripList.map((trip_list) => (
        <Layout2 key={trip_list.id}>
          <Link to={`/grouptripdetail/${trip_list.id}`}>
            <ImageBox
              src={trip_list.thumbnail}
              height={"150px"}
              text1={trip_list.place}
              text2={trip_list.departing_date + " ~ " + trip_list.arriving_date}
            />
          </Link>
        </Layout2>
      ))}

      <Layout>
        <Button
          text={"새 여행 만들기"}
          backgroundColor={"#A4B0D8"}
          width={"200px"}
          fontColor={"white"}
          position={"fixed"}
          bottom={"13%"}
          onClick={navMakeTrip}
        />
      </Layout>
    </>
  );
};
export default GroupTripList;
