import React from "react";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-services"
import "../components.css";
import hive from '../../resources/hiveIcon.png'

import sendRequest from "../../utilities/send-request";



const NavBar = ({ user, setUser}) => {

  function handleLogout (){
    userService.logout()
    setUser(null);
  }

  async function categoryAddTest (){
      const data = await sendRequest("/api/categories/create","POST", {name: "TESTING"})
      console.log(data)
  }

  return (
    <>
    <header>
      <Link to = "/">
        <div id="logoAndTitle" style = {{display: "flex", justifyContent: "center", alignItems: "center", margin: "0", gap: "8px"}}>
          <div style = {{display: "flex", justifyContent: "center", alignItems: "center", margin: "0", gap: "8px"}}>
            <span style = {{fontSize: "2em", color: "var(--accentOrange"}}>&#60;</span>
            <img src={hive} id = "hiveLogo" alt="" />
            <span style = {{fontSize: "2em", color: "var(--accentOrange"}}>/&#62;</span>
          </div>
          <h1 id = "headerTitle" style = {{fontFamily: "Pathway Gothic One"}}>CODE <span style = {{color: "var(--accentOrange)"}}>HIVE</span></h1>
        </div>
      </Link>

      <input id = "searchBar" placeholder = "Search for snippets, categories..." type="text" />
      <nav>
        <ul>
          <Link to = "/community"><li id = "navElement">Community</li></Link>
          
          {user ? 
          <>
            <li style = {{color: "var(--accentOrange)"}}>/</li>
            <Link to = {`/profile/${user._id}`}><li id = "navElement">Your Bins</li></Link>
            <li style = {{color: "var(--accentOrange)", marginLeft: "0"}}>/</li>
            <Link to = ""><li id = "navElement">Quick Add +</li></Link>
            <li style = {{color: "var(--accentOrange)"}}>/</li>
            <Link to = "/"><li id = "navElement" onClick={handleLogout}>Logout, <span style = {{color: "var(--accentOrange)"}}>{user.username}</span></li></Link> 
          </>
          
          : <Link to = "/signin"><li id = "navElement"><button id = "loginButtonNav">Login/Sign Up</button></li></Link>}
          {/* <li id = "navElement" onClick={categoryAddTest}>CAT TEST!</li> */}
        </ul>
        
      </nav>
      
    </header>
    <hr style = {{margin: "0"}}/>
    </>
  );
};

export default NavBar;
