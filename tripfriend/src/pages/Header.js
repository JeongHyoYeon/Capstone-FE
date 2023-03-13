import React from "react";
import "./Header.css";
import { MdPeopleOutline, MdPersonOutline } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-all">
      <div className="brand-Name">
        <h1>AfterTrip</h1>
      </div>
      <nav className="nav-wrap">
        <div>
          <Link to="/groups">
            <MdPeopleOutline size="35px" color="black" />
          </Link>
        </div>
        <div>
          <Link to="/">
            <MdPersonOutline size="30px" color="black" />
          </Link>
        </div>
        <div>
          <Link to="/settings">
            <IoSettingsOutline size="30px" color="black" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
