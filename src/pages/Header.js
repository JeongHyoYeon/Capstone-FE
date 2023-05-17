import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Alarm from "../../src/components/common/Alarm";

const Header = () => {
  if (window.location.pathname === "/") return null;
  return (
    <div className="header-all">
      <div className="brand-Name">
        <Link to={"/group"}>
          <h2 style={{ fontWeight: "900" }}>AfterTrip</h2>
        </Link>
        <div className="alarm">
          <Alarm />
        </div>
      </div>
    </div>
  );
};

export default Header;
