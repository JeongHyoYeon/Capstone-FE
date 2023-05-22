import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../../components/Request";
import axios from "axios";
import BlankPage from "../BlankPage";
import { useSelector } from "react-redux";
import PhotoDay from "./sorting/PhotoDay";
import Loading from "../Loading";

const GrouptripDetail = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

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

  //로딩화면 여부
  const [loading, setLoading] = useState(true);

  //여행 정보 가져오는 함수
  const tripDetail = async (e) => {
    //e.preventDefault();
    await axios;
    instance
      .get(
        `trips/detail/${tripId}/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            // "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
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
    setLoading(true);
    await axios;
    instance
      .get(
        `photos/${tripId}/`,

        {
          headers: {
            Authorization: `Bearer ${JWTtoken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setPhotoDay(response.data.data[0].photo);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setTimeout(() => isPhoto(), 300);
    tripDetail();
  }, []);
  if (loading) return <Loading />;
  else if (photoDay.length === 0) return <BlankPage data="사진이" />;
  else return <PhotoDay />;
};
export default GrouptripDetail;
