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
import BackButton from "../../components/common/BackButton";
import Loading from "../Loading";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const Layout2 = styled.div`
  display: block;
  padding-left: 5%;
  margin-left: 1%;
  padding-top: 15px;
`;

const Layout3 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const GroupTripList = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);
  console.log(JWTtoken);

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

        for (let i = 0; i < response.data.data.trip_list.length; i++) {
          nowGroupTripList.push(response.data.data.trip_list[i]);
        }
        setGroupTripList([...groupTripList, ...nowGroupTripList]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setTimeout(() => groupdetail(), 500);
  }, []);

  if (loading) return <Loading />;
  else
    return (
      <>
        <Layout3>
          <BackButton />
        </Layout3>
        <h2
          style={{
            position: "relative",
            left: "8%",
          }}
        >
          {groupName}의 여행
        </h2>
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
            width={"200px"}
            fontColor={"white"}
            position={"fixed"}
            bottom={"8%"}
            onClick={navMakeTrip}
          />
        </Layout>
      </>
    );
};
export default GroupTripList;
