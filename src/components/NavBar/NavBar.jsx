import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as userService from "../../utilities/users-services";
import "../components.css";
import hive from "../../resources/hiveIcon.png";

import sendRequest from "../../utilities/send-request";

const NavBar = ({ user, setUser, setSearchResults }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();


  document.addEventListener('keydown', (event) => {

    if(event.key === 'Enter' && query.length > 0) {
      handleSearch(event)
    }
})



  async function handleSearch(event) {
    event.preventDefault();
    const response = await sendRequest(`/api/search/${query}`, "GET");
    setResults(response);
    setSearchResults(response);
    navigate("/results");
    setQuery("");
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  async function categoryAddTest() {
    const data = await sendRequest("/api/categories/create", "POST", {
      name: "TESTING",
    });
    console.log(data);
  }

  return (
    <>
      <header>
        <Link to="/">
          <div
            id="logoAndTitle"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "2em", color: "var(--accentOrange" }}>
                &#60;
              </span>
              <img src={hive} id="hiveLogo" alt="" />
              <span style={{ fontSize: "2em", color: "var(--accentOrange" }}>
                /&#62;
              </span>
            </div>
            <h1 id="headerTitle" style={{ fontFamily: "Pathway Gothic One" }}>
              CODE <span style={{ color: "var(--accentOrange)" }}>HIVE</span>
            </h1>
          </div>
        </Link>

        <form style={{ display: "flex" , gap: '10px', alignItems: 'center'}}>
          <input
            id="searchBar"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {/* <button id="searchButton" type="submit">
            Search
          </button> */}
          <div onClick={handleSearch} className="orangeButton" style = {{textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Search</div>
        </form>
        <nav>
          <ul>
            <Link to="/community">
              <li id="navElement">Community</li>
            </Link>

            {user ? (
              <>
                <li style={{ color: "var(--accentOrange)" }}>/</li>
                {/* <Link to={`/profile/${user.username}`}> */}
                 <a href={`/profile/${user.username}`}><li id="navElement">Your Bins</li></a> 
                {/* </Link> */}
                <li style={{ color: "var(--accentOrange)", marginLeft: "0" }}>
                  /
                </li>
                <Link to="/addSnippetForm/1">
                  <li id="navElement">Quick Add +</li>
                </Link>
                <li style={{ color: "var(--accentOrange)" }}>/</li>
                <div  style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', gap : "10px"}}>
                  <div id = "profilePicContainer" style = {{position: 'relative'}}>
                    <Link to = "/profileEdit"><img src = {user.profilePic} id = "profilePicCard"/></Link>
                    <div id = "tagHover">Edit Profile</div>
                  </div>
                  <Link to="/">
                    <li id="navElement" onClick={handleLogout}>
                      Logout,{" "}
                      <span style={{ color: "var(--accentOrange)" }}>
                        {user.username}
                      </span>
                    </li>
                  </Link>

                </div>
              </>
            ) : (
              <Link to="/signin">
                <li>
                  {/* <button id="loginButtonNav">Login/Sign Up</button> */}
                  <div className="orangeButton">Login/Sign Up</div>
                </li>
              </Link>
            )}
            {/* <li id = "navElement" onClick={categoryAddTest}>CAT TEST!</li> */}
          </ul>
        </nav>
      </header>
      <hr style={{ margin: "0" }} />
    </>
  );
};

export default NavBar;
