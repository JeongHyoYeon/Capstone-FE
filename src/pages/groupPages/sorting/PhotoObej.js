import React from "react";
import CategoryHeader from "./CategoryHeader";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";

const PhotoObej = () => {
  return (
    <>
      <CategoryHeader />
      <h1>이곳은 객체분류 페이지입니다.</h1>

      <Button
        text={"사진 올리기"}
        backgroundColor={"#A4B0D8"}
        width={"200px"}
        fontColor={"white"}
        position={"fixed"}
        bottom={"13%"}
        onClick={changePage}
      />
    </>
  );
};
export default PhotoObej;
