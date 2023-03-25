import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageBox from "../../components/common/ImageBox";
import styled from "styled-components";
import instance from "../../components/Request";
import axios from "axios";

const Layout2 = styled.div`
  display: block;
  padding-left: 4%;
  padding-top: 20px;
`;

const GrouptripDetail = () => {
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

  const tripDetail = async (e) => {
    //e.preventDefault();
    await axios;
    instance
      .get(
        `/trip/detail/${tripId}/`,

        {
          headers: {
            "Content-Type": "application/json",
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

  useEffect(() => {
    tripDetail();
  }, []);
  return (
    <>
      <Layout2 key={tripInfo.id}>
        <ImageBox
          src={tripInfo.thumbnail}
          height={"150px"}
          text1={tripInfo.place}
          text2={tripInfo.departing_date + " ~ " + tripInfo.arriving_date}
        />
      </Layout2>
    </>
  );
};
export default GrouptripDetail;
