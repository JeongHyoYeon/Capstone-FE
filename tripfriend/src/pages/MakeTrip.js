import React, { useState } from "react";
import InputBox from "../components/common/InputBox";
import styled from "styled-components";
import Button from "../components/common/Button";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
//import axios from 'axios';

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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      <Layout>
        <h2>여행지</h2>
        <InputBox height={"35px"} width={"85%"} />
        <h2>출발 날짜</h2>
        <TDatepicker
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          minDate={new Date()}
          startDate={startDate}
          endDate={endDate}
        />
        <h2>도착 날짜</h2>
        <TDatepicker
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          minDate={new Date()}
          startDate={startDate}
          endDate={endDate}
        />
        <h2>사진 추가하기</h2>
      </Layout>
      <Layout1>
        <Button
          text={"새 여행 만들기"}
          backgroundColor={"#D9D9D9"}
          width={"200px"}
          fontColor={"BLACK"}
          position={"fixed"}
          bottom={"5%"}
        />
      </Layout1>
    </>
  );
};
export default MakeTrip;
