import React, { useState } from "react";
import InputBox from "../../components/common/InputBox";
import styled from "styled-components";
import Button from "../../components/common/Button";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import instance from "../../components/Request";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  position: relative;
  left: 5%;
`;

const Layout1 = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  padding-top: 20px;
`;

const TDatepicker = styled(DatePicker)`
  width: 85%;
  height: 35px;
  box-sizing: border-box;
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid lightGrey;
`;

const MakeTrip = () => {
  //여행 장소
  const [place, setPlace] = useState("");
  //날짜
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //이미지 배열
  const [thumbnail, setThumbnail] = useState([]);
  const [imgpreview, setImgpreview] = useState("");

  var nowGroup = localStorage.getItem("nowGroup");

  //도착장소 지정
  const handlePlace = (e) => {
    setPlace(e.target.value);
  };

  //날짜만 추출하기
  const getDateOnly = (item) => {
    var month = item.getMonth() + 1;
    var year = item.getFullYear();
    var day = item.getDate();

    var string = year + "-" + month + "-" + day;
    return string;
  };

  //이미지 담기 , 이미지 미리보기
  const thumbnailUpload = (e) => {
    const uploadImg = e.target.files[0];
    setThumbnail(uploadImg);

    let objectUrl = URL.createObjectURL(e.target.files[0]);
    setImgpreview(objectUrl);
  };

  const makeTrip = async (e) => {
    const formData = new FormData();

    formData.append("thumbnail", thumbnail);

    formData.append("place", JSON.stringify(place));
    formData.append("departing_date", JSON.stringify(getDateOnly(startDate)));
    formData.append("arriving_date", JSON.stringify(getDateOnly(endDate)));

    for (let value of formData.values()) {
      console.log(value);
    }

    for (let key of formData.keys()) {
      console.log(key);
    }

    await axios;
    instance
      .post(`/trip/${nowGroup}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("success");
        console.log(response);
        localStorage.removeItem("nowGroup");
      })
      .catch((error) => {
        console.log(getDateOnly(startDate), getDateOnly(endDate));
        console.log(error);
      });
  };

  return (
    <>
      <Layout>
        <h2>여행지</h2>
        <InputBox height={"35px"} width={"85%"} onChange={handlePlace} />
        <h2>출발 날짜</h2>
        <TDatepicker
          type="data"
          locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <h2>도착 날짜</h2>
        <TDatepicker
          type="date"
          locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
        />
        <h2>사진 추가하기</h2>
        <input
          type="file"
          multiple
          onChange={thumbnailUpload}
          accept="image/*"
        />
        <h3>미리보기</h3>
        <div>
          {thumbnail && (
            <img
              alt=""
              src={imgpreview}
              style={{ margin: "auto", height: "150px", width: "70%" }}
            />
          )}
        </div>
      </Layout>
      <Layout1>
        <Button
          text={"새 여행 만들기"}
          backgroundColor={"#A4B0D8"}
          width={"200px"}
          fontColor={"white"}
          position={"fixed"}
          bottom={"10%"}
          onClick={() => {
            makeTrip();
          }}
        />
      </Layout1>
    </>
  );
};
export default MakeTrip;
