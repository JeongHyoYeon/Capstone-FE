import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Alarm from "../../src/components/common/Alarm";
import BackButton from "../components/common/BackButton";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  if (location.pathname === "/") return null;
  else if (location.pathname === "/group/")
    return (
      <div className="header-all">
        <div className="brand-Name">
          <Link to={"/group"}>
            <h2 style={{ fontWeight: "800" }}>AfterTrip</h2>
          </Link>
          <div className="alarm">
            <Alarm />
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="header-all">
        <div className="back-btn">
          <BackButton />
        </div>
        <div className="brand-Name">
          <Link to={"/group"}>
            <h2 style={{ fontWeight: "800" }}>AfterTrip</h2>
          </Link>
          <div className="alarm">
            <Alarm />
          </div>
        </div>
      </div>
    );
};

export default Header;
