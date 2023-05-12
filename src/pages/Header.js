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
      {/* <nav className="nav-wrap">
        <div>
          <Link to="/groups">
            <MdPeopleOutline size="25px" color="#a4b1d9" />
          </Link>
        </div>
        <div>
          <Link to="/">
            <MdPersonOutline size="25px" color="#a4b0d9" />
          </Link>
        </div>
        <div>
          <Link to="/settings">
            <IoSettingsOutline size="25px" color="#a4b0d9" />
          </Link>
        </div>
      </nav> */}
    </div>
  );
};

export default Header;
