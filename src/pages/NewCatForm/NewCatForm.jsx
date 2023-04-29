import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NewCatForm.css";
import sendRequest from "../../utilities/send-request";

export default function NewCatForm({ user }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("firing");
    const data = {
      name,
      description,
      user: user._id,
    };

    const newCat = await sendRequest("/api/categories/create", "POST", data);
    console.log(newCat);
    const cancel = document.querySelector("#cancel");
    //   cancel.click();

    navigate(`/profile/${user.username}`);
  }

  return (
    <div className="mainContent">
      <h1>
        Create{" "}
        <span style={{ color: "var(--accentOrange)", marginBottom: "0" }}>
          Bin
        </span>
      </h1>
      {/* <h1 id = "success" style = {{opacity: "0"}}>SUCCESS!</h1> */}
      <form onSubmit={handleSubmit} id="newCatForm" className="catForm">
        <div>
          <p>Name</p>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <p>Description</p>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div id="button" className="orangeButton" onClick={handleSubmit}>
          Submit
        </div>
        <Link to={`/profile/${user.username}`}>
          <div className="orangeButton" id="cancel">
            Cancel
          </div>
        </Link>
      </form>
    </div>
  );
}
