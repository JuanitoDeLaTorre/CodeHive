import React from "react";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-services"
import "../components.css";
import hive from './hiveIcon.png'



const NavBar = ({ user, setUser}) => {
  function handleLogout (){
    userService.logout()
    setUser(null);
  }
  return (
    <>
    <header>
      <Link to = "">
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
          <Link to = ""><li id = "navElement">Community</li></Link>
          
          {user ? 
          <>
            <Link to = ""><li id = "navElement">Your Snippets</li></Link>
            <Link to = ""><li id = "navElement" onClick={handleLogout}>Logout</li></Link> 
          </>
          
          : <Link to = ""><li>Login</li></Link>}
        </ul>
        
      </nav>
      
    </header>
    <hr style = {{margin: "0"}}/>
    </>
  );
};

export default NavBar;
