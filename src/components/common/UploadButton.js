import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import instance from "../../components/Request";
import { useSelector } from "react-redux";
import Button from "../../components/common/Button";
import styled from "styled-components";

const Label = styled.label`
  padding: 6px 25px;
  width: 50px;
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
  position: relative;
`;

const Layout2 = styled.div`
  position: absolute;
`;

const UploadButton = (props) => {
  const JWTtoken = useSelector((state) => state.authToken.accessToken);

  const navigate = useNavigate();
  //사진 업로드 후 그룹 사진 목록으로 이동
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

  // //사진 보내기
  // const sendPhoto = async (e) => {
  //   //form data 추가하기
  //   const imgForm = new FormData();

  //   for (let i = 0; i < photo.length; i++) {
  //     imgForm.append("photos", photo[i]);
  //   }

  //   for (let value of imgForm.values()) {
  //     console.log(value + "\n");
  //   }

  //   await axios;
  //   instance
  //     .post(`/photo/${tripId}/`, imgForm, {
  //       headers: {
  //         Authorization: `Bearer ${JWTtoken}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((response) => {
  //       console.log("success");
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //};
  return (
    <>
      <Layout>
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

        <Layout2>
          <Button
            text={props.text}
            width={props.width}
            fontColor={"white"}
            position={props.position}
            bottom={props.bottom}
            onClick={() => {
              //sendPhoto();
              photoView();
              changePage();
            }}
            type={"submit"}
          />
        </Layout2>
      </Layout>
    </>
  );
};

export default UploadButton;