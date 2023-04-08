import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../../components/Request";
import axios from "axios";
import BlankPage from "../BlankPage";
import { useSelector } from "react-redux";

const Layout2 = styled.div`
  display: block;
  padding-left: 4%;
  padding-top: 20px;
`;

const GrouptripDetail = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);
  console.log(JWTtoken);

  //해당 그룹의 아이디
  const { tripId } = useParams();
  console.log(tripId);
  localStorage.setItem("nowGroupTrip", tripId);

  //여행 정보
  const [tripInfo, setTripInfo] = useState({
    id: "",
    group: "",
    place: "",
    departing_date: "",
    arriving_date: "",
    thumbnail: "",
  });

  //날짜별 여행 담는 배열
  const [photoDay, setPhotoDay] = useState([]);

  //여행 정보 가져오는 함수
  const tripDetail = async (e) => {
    //e.preventDefault();
    await axios;
    instance
      .get(
        `/trip/detail/${tripId}/`,

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
        setTripInfo({
          ...tripInfo,
          id: response.data.id,
          group: response.data.group,
          place: response.data.place,
          departing_date: response.data.departing_date,
          arriving_date: response.data.arriving_date,
          thumbnail: response.data.thumbnail,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //그룹 여행 사진이 있는지 확인하는 함수
  const isPhoto = async (e) => {
    await axios;
    instance
      .get(
        `/photo/${tripId}/`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("success");
        console.log(response.data);
        setPhotoDay(response.data);
        console.log(photoDay);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    tripDetail();
    isPhoto();
  }, []);

  if (photoDay[0] == null)
    return (
      // <>
      //    <Layout2 key={tripInfo.id}>
      //     <ImageBox
      //       src={tripInfo.thumbnail}
      //       height={"150px"}
      //       text1={tripInfo.place}
      //       text2={tripInfo.departing_date + " ~ " + tripInfo.arriving_date}
      //     />
      //   </Layout2>
      // </>
      <BlankPage data="사진이" />
    );
  else return <h2>사진 분류</h2>;
};
export default GrouptripDetail;
