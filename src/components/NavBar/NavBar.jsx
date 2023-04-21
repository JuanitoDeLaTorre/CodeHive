import React from "react";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-services"
const NavBar = ({ user, setUser}) => {
  function handleLogout (){
    userService.logout()
    setUser(null);
  }
  return (
    <nav>
      <Link to="/orders">Order History</Link> &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link>&nbsp; | &nbsp;
      <span>UserName: {user && user.name}</span>
      <Link to="" onClick={handleLogout}>
        Log Out{" "}
      </Link>
    </nav>
  );
};

export default NavBar;
