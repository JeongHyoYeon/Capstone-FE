import React, { useState } from "react";
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
  const [trip, setTrip] = useState([]);

  const tripDetail = async (e) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* <Layout2 key={}>
         
            <ImageBox
              src={trip_list.thumbnail}
              height={"150px"}
              text1={trip_list.place}
              text2={trip_list.departing_date + " ~ " + trip_list.arriving_date}
            />
          
        </Layout2> */}
      <h1>{tripId}</h1>
    </>
  );
};
export default GrouptripDetail;
