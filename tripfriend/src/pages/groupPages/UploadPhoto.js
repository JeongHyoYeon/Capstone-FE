import React, { useState } from "react";
import axios from "axios";
import instance from "../../components/Request";
import styled from "styled-components";
import Button from "../../components/common/Button";

const Label = styled.label`
  background: skyblue;
`;

const UploadPhoto = () => {
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

    //setPhoto([...photo, ...photoLists]);

    let photoListsLength = photoLists.length > 100 ? 100 : photoLists.length; //최대 100개

    for (let i = 0; i < photoListsLength; i++) {
      const currentphotoUrl = URL.createObjectURL(photoLists[i]);
      photoUrls.push(currentphotoUrl);
    }

    setPhoto([...photo, ...photoUrls]);
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
      <h1>사진 올리는 페이지</h1>
      <Label htmlFor="input-file">
        <input
          type="file"
          id="input-file"
          multiple
          onChange={photoView}
          accept="image/*"
        />
        {/* <button onClick={photoView}>미리보기</button> */}
      </Label>
      <h3>미리보기</h3>
      {/* <div>
        {photo.map((image, id) => {
          <div className="previewImg" key={id}>
            <img src={image} alt="미리보기" />
          </div>;
        })}
      </div> */}
      {photo.map((item) => (
        <>
          <img
            src={item}
            alt="미리보기"
            style={{ margin: "auto", height: "150px", width: "70%" }}
          />
        </>
      ))}
      <button onClick={sendPhoto}>사진 올리기</button>
    </>
  );
};
export default UploadPhoto;