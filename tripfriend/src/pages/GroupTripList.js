import React from "react";
import { useParams } from "react-router-dom";
const GroupTripList = () => {
  //그룹 아이디
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>그룹 리스트 : {id} </h1>
    </div>
  );
};
export default GroupTripList;
