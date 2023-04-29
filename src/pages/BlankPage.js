import React from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { ImFileEmpty } from "react-icons/im";

const Layout2 = styled.div`
  display: flex;
  justify-content: center;
  //padding-left: 4%;
  padding-top: 100px;
`;

const BlankPage = (props) => {
  const navigate = useNavigate();

  const changePage = () => {
    navigate("/upload");
  };

  return (
    <>
      <br />
      <br />
      <br />
      <Layout2>
        {/* <img
          className="blank"
          alt="blank"
          src="/BlankIcon.png"
          style={{ width: "140px", height: "140px", opacity: "0.4" }}
        /> */}
        <ImFileEmpty size="100px" color="#3178B9" />
      </Layout2>
      <Layout2>
        <h2>{props.data} 없습니다.</h2>
      </Layout2>
      <Layout2>
        <Button
          text={"사진 올리기"}
          width={"200px"}
          fontColor={"white"}
          //position={"fixed"}
          //bottom={"13%"}
          onClick={changePage}
        />
      </Layout2>
    </>
  );
};

export default BlankPage;
