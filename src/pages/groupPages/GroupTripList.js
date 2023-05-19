import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ImageBox from "../../components/common/ImageBox";
import styled from "styled-components";
import instance from "../../components/Request";
import Button from "../../components/common/Button";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
  width: 100%;
`;

const Layout2 = styled.div`
  display: block;
  padding-left: 5%;
  margin-left: 1%;
  padding-top: 15px;
`;

const GroupName = styled.div`
  color: #4988ef;
  position: relative;
  left: 10%;
  font-size: 25px;
  font-weight: 550;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const GroupMemberDiv = styled.div`
  color: white;
  position: relative;
  left: 10%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const GroupMemberName = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: white;
  margin-right: 10px;
`;

const GroupTripList = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);
  console.log(JWTtoken);

  //그룹 아이디
  const { groupNum } = useParams();
  console.log(groupNum);
  localStorage.setItem("nowGroup", groupNum);

  const [groupName, setGroupName] = useState("");
  const [groupMember, setGroupMember] = useState([]);

  //그룹별 여행 목록
  let nowGroupTripList = [];
  const [groupTripList, setGroupTripList] = useState([]);

  const navigate = useNavigate();
  const navMakeTrip = () => {
    navigate("/maketrips");
  };

  //로딩화면 여부
  const [loading, setLoading] = useState(true);

  // group의 여행 목록
  const groupdetail = async (e) => {
    //e.preventDefault();
    setLoading(true);
    await axios;
    instance
      .get(
        `trips/${groupNum}/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            // "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("success");
        console.log(response.data);
        setGroupName(response.data.data.group_name);
        setGroupMember(response.data.data.group_members);
        for (let i = 0; i < response.data.data.trip_list.length; i++) {
          nowGroupTripList.push(response.data.data.trip_list[i]);
        }
        setGroupTripList([...groupTripList, ...nowGroupTripList]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        window.location.reload();
      });
  };

  useEffect(() => {
    setTimeout(() => groupdetail(), 500);
  }, []);

  if (loading) return <Loading />;
  else
    return (
      <>
        <GroupName>{groupName}의 여행</GroupName>

        <GroupMemberDiv>
          {groupMember.map((item) => (
            <GroupMemberName key={item}> {item} </GroupMemberName>
          ))}
        </GroupMemberDiv>
        {groupTripList.map((trip_list) => (
          <Layout2 key={trip_list.id}>
            <Link to={`/grouptripdetail/${trip_list.id}`}>
              <ImageBox
                src={trip_list.thumbnail}
                height={"150px"}
                text1={trip_list.place}
                text2={
                  trip_list.departing_date + " ~ " + trip_list.arriving_date
                }
              />
            </Link>
          </Layout2>
        ))}

        <Layout>
          <Button
            text={"새 여행 만들기"}
            width={"50%"}
            fontColor={"white"}
            position={"fixed"}
            bottom={"10%"}
            onClick={navMakeTrip}
          />
        </Layout>
      </>
    );
};
export default GroupTripList;
