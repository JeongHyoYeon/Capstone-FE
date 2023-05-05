import React, { useState } from "react";
import axios from "axios";
import instance from "../../components/Request";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Button from "../../components/common/Button";
import { BsCloudUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton";

const Label = styled.label`
  padding: 6px 25px;
  width: 160px;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  padding-top: 100px;
  display: flex;
  justify-content: center;
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

const UploadPhoto = () => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();

  const changePage = () => {
    navigate(`/grouptripdetail/${tripId}`);
  };

  //보낼 사진
  const [photo, setPhoto] = useState([]);

  //여행 id
  var tripId = localStorage.getItem("nowGroupTrip");

  //사진 상대 경로 (미리보기)
  const photoView = (e) => {
    //들어올 사진 임시저장할 배열
    let photoLists = [];
    //사진 url 저장할 배열
    const photoUrls = [];
    console.log(e.target.files);

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

    for (let value of imgForm.values()) {
      console.log(value + "\n");
    }

    await axios;
    instance
      .post(`/photo/${tripId}/`, imgForm, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("success");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Layout3>
        <BackButton />
      </Layout3>
      <Layout>
        <Label htmlFor="input-file">
          <BsCloudUpload size="200px" color="#3178B9" />
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
      <Layout2>
        <h2>사진 올리기</h2>
      </Layout2>
      <Layout>
        <h4>{photo.length}개의 사진 선택됨</h4>
      </Layout>
      <Layout>
        <Button
          text={"선택완료"}
          width={"200px"}
          fontColor={"white"}
          position={"fixed"}
          bottom={"13%"}
          onClick={() => {
            sendPhoto();
            changePage();
          }}
          type={"submit"}
        />
      </Layout>
    </>
  );
};
export default UploadPhoto;
