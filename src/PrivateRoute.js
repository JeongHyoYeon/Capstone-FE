//페이지 접근 제한
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ authenticated, component: Component }) {
  return authenticated ? (
    Component
  ) : (
    <Navigate to="/login" {...alert("로그인을 해주세요.")} />
  );
}

export default PrivateRoute;
