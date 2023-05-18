import React, { useState } from "react";
import InputBox from "../../components/common/InputBox";
import styled from "styled-components";
import Button from "../../components/common/Button";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import instance from "../../components/Request";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  position: relative;
  left: 8%;
  color: white;
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

const InputLabel = styled.label`
  padding: 6px 25px;
  width: 85%;
  height: 35px;
  border-radius: 50px;
  color: #4998ef;
  background-color: white;
  cursor: pointer;
  text-align: center;
`;

const Text = styled.div`
  color: white;
  font-size: 15px;
  font-weight:500;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const MakeTrip = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

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

  const navigate = useNavigate();
  const afterUpload = () => {
    navigate(`/grouptrip/${nowGroup}`);
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

    if (!formData.get("thumbnail")) {
      window.alert("썸네일을 첨부해주세요.");
      return;
    }

    await axios;
    instance
      .post(`trips/${nowGroup}/`, formData, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`,
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
        <Text>여행지</Text>
        <InputBox height={"35px"} width={"85%"} onChange={handlePlace} />

        <Text>출발 날짜</Text>
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

        <Text>도착 날짜</Text>
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

        <Text>썸네일 업로드</Text>
        <InputLabel htmlFor="input-file"> 사진 선택 </InputLabel>

        <input
          type="file"
          id="input-file"
          multiple
          onChange={thumbnailUpload}
          accept="image/*"
          style={{ display: "none" }}
        />
        <br />
        <div style={{ backgroundColor: "inherit", width: "70%" }}>
          {thumbnail && (
            <img
              alt=""
              src={imgpreview ? imgpreview : `   `}
              style={{
                margin: "auto",
                height: "150px",
                width: "120%",
                objectFit: "contain",
              }}
            />
          )}
        </div>
      </Layout>
      <Layout1>
        <Button
          text={"새 여행 만들기"}
          width={"85%"}
          fontColor={"white"}
          position={"fixed"}
          bottom={"10%"}
          onClick={() => {
            makeTrip();
            afterUpload();
          }}
        />
      </Layout1>
    </>
  );
};
export default MakeTrip;
