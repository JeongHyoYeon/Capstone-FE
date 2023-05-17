import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import axios from "axios";
import instance from "../Request";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//전체 모달창
const Container = styled.div`
  /* 모달창 크기 */
  width: 90%;
  height: 40%;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: #fff;
  border: 1px solid grey;
  border-radius: 8px;
`;

const CloseBtn = styled.button`
  position: absolute;
  background-color: white;
  right: 10px;
  top: 10px;
  float: right;
  font-weight: bold;
  color: #777;
  font-size: 20px;
  cursor: pointer;
  border: none;
`;

const Label = styled.label`
  padding: 6px 25px;
  width: 160px;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  padding-top: 100px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const Layout2 = styled.div`
  display: flex;
  justify-content: center;
`;

const Layout3 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const SelectBox = styled.div`
  background-color: #4988ef;
  text-align: center;
  color: white;
  border-radius: 10px 10px 10px 10px;
  width: 150px;
  height: 50px;
  text-align: center;
  font-size: 20px;
  padding: 7px 10px 7px 10px;
  margin: 5px 5px 5px 5px;
  position: absolute;
  top: 30%;
  left: 27%;
`;

const UploadModal = ({ setModalOpen }) => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const tripId = localStorage.getItem("nowGroupTrip");

  const closeModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();

  const changePage = () => {
    setTimeout(() => navigate(`/grouptripdetail/${tripId}`), 300);
    window.location.reload();
  };

  //보낼 사진
  const [photo, setPhoto] = useState([]);

  //사진 상대 경로 (미리보기)
  const photoView = (e) => {
    //들어올 사진 임시저장할 배열
    let photoLists = [];
    //사진 url 저장할 배열
    const photoUrls = [];

    for (let i = 0; i < e.target.files.length; i++) {
      let newImg = e.target.files[i];
      photoLists[i] = newImg;
    }

    setPhoto([...photo, ...photoLists]);

    let photoListsLength = photoLists.length > 100 ? 100 : photoLists.length; //최대 100개

    for (let i = 0; i < photoListsLength; i++) {
      const currentphotoUrl = URL.createObjectURL(photoLists[i]);
      photoUrls.push(currentphotoUrl);
    }

    //setPhoto([...photo, ...photoUrls]);
  };

  //사진 보내기
  const sendPhoto = async (e) => {
    //form data 추가하기
    const imgForm = new FormData();

    for (let i = 0; i < photo.length; i++) {
      imgForm.append("photos", photo[i]);
    }

    await axios;
    instance
      .post(`photos/${tripId}/`, imgForm, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("사진 보내기 성공");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <CloseBtn
        onClick={() => {
          closeModal();
        }}
      >
        x
      </CloseBtn>
      <Layout2>
        <p>사진 올리기</p>
      </Layout2>
      <Layout>
        <SelectBox>사진 선택하기</SelectBox>
        <Label htmlFor="input-file">
          <input
            type="file"
            id="input-file"
            name="photos"
            multiple
            onChange={photoView}
            accept="image/*"
            style={{ display: "none" }}
          />
        </Label>
      </Layout>
      <h4>{photo.length}개의 사진 선택됨</h4>
      <Layout>
        <Button
          text={"선택완료"}
          width={"200px"}
          fontColor={"white"}
          position={"fixed"}
          bottom={"5%"}
          onClick={() => {
            sendPhoto();
            changePage();
            closeModal();
          }}
          type={"submit"}
        />
      </Layout>
    </Container>
  );
};
export default UploadModal;
