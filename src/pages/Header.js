import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
// import { MdPeopleOutline, MdPersonOutline } from "react-icons/md";
// import { IoSettingsOutline } from "react-icons/io5";
// import { Link } from "react-router-dom";

const Header = () => {
  if (window.location.pathname === "/") return null;
  return (
    <div className="header-all">
      <div className="brand-Name">
        <Link to={"/group"}>
          <h2>AfterTrip</h2>
        </Link>
      </div>
    </div>
  );
};

export default Header;
