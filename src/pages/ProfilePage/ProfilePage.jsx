import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProfilePage.css";
import sendRequest from "../../utilities/send-request";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import hiveBadge from "../../resources/bee-hive (2).png";

export default function Profile({ user }) {
  const [allSnips, setAllSnips] = useState([]);
  const [allSnipsIndividual, setAllSnipsIndividual] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  const profileName = useParams().name;

  async function getUserProfile() {
    if (!profileName) return;
    const returnUser = await sendRequest(
      `/api/users/fetchOneUser/${profileName}`,
      "GET"
    );
    setUserProfile(returnUser);
  }

  async function getAllSnips() {
    let id = userProfile._id;

    if (!userProfile._id) return;

    const allSnipsRes = await sendRequest(
      `/api/snippets/fetchSnipsForUser/${id}`,
      "GET"
    );
    setAllSnips(() => {
      return allSnipsRes;
    });
  }

  function fillAllSnips() {
    if (allSnips.length == 0) return;

    for (let i = 0; i < allSnips.length; i++) {
      for (let j = 0; j < allSnips[i].snips.length; j++) {
        setAllSnipsIndividual((current) => [...current, allSnips[i].snips[j]]);
      }
    }
  }

  useEffect(() => {
    getUserProfile();
    setAllSnips([]);
    setAllSnipsIndividual([]);
  }, []);

  useEffect(() => {
    getAllSnips();
  }, [userProfile]);

  useEffect(() => {
    fillAllSnips();
  }, [allSnips]);

  return (
    <div className="mainContent">
      {profileName === user.username ? (
        <h1 style={{ fontSize: "3em" }}>
          Your <span style={{ color: "var(--accentOrange" }}>Bins</span>
        </h1>
      ) : (
        <h1 style={{ fontSize: "3em" }}>
          {profileName}'s{" "}
          <span style={{ color: "var(--accentOrange" }}>Bins</span>
        </h1>
      )}

      {/* /* <Link to "/addCatForm"><button>ADD BIN!</button></Link> */}
      {profileName === user.username ? (
        <Link to="/addCatForm">
          <div className="orangeButton">ADD BIN</div>
        </Link>
      ) : null}
      <div
        id="profileCard"
        style={{ position: "absolute", top: "80px", left: "155px" }}
      >
        <div style={{ display: "flex", justifyContent: "left", gap: "5%" }}>
          <img id="profilePicCard" src={user.profile_pic} alt="" />
          <h4
            style={{
              fontWeight: "200",
              textAlign: "left",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          >
            {user.username}
          </h4>
        </div>
        <p
          style={{
            fontWeight: "200",
            textAlign: "left",
            color: "rgb(201, 201, 201)",
            fontSize: "15px",
            marginTop: "10px",
          }}
        >
          User since: {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            marginBottom: "20px",
            alignItems: "center",
            fontSize: "0.9em",
          }}
        >
          <p> total snippets: {allSnipsIndividual.length}</p>
        </div>
      </div>

      
      <hr />
      {allSnips.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "var(--accentOrange",
            fontSize: "25px",
          }}
        >
          Oopsie! It looks like this bee hive is a little empty. Click on the
          adorable 'Add Bin' button to give these bees a new home 🐝🏠🌸
        </p>
      ) : (
        <div className="categoryContainer">
          {allSnips.map((cat) => {
            return (
              <CategoryCard
                key={cat._id}
                profileName={profileName}
                user={user}
                cat={cat}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
