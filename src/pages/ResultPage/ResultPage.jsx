import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ResultPage.css";

export default function ResultPage({ user, searchResults }) {
  const { users = [], categories = [], snippets = [] } = searchResults;

  const hideEmptyResults = (name, value) => {
    const resultElement = document.querySelector(`#result${name}`);
    if (value.length === 0 && resultElement) {
      resultElement.style.display = "none";
    }
  };
  useEffect(() => {
    hideEmptyResults("user", users);
    hideEmptyResults("category", categories);
    hideEmptyResults("snippet", snippets);
  }, [users, categories, snippets]);
  console.log(categories);

  return (
    <div className="resultMainContent">
      <div className="resultPageContainer">
        {users.length > 0 && (
          <div id="resultuser" className="resultPageSection">
            <h2>Users</h2>
            {users.map((userLoop) => (
              <Link to={`/profile/${userLoop.username}`}>
                <div className="resultCard" key={userLoop._id}>
                  <h3>{userLoop.username}</h3>
                  <p>{userLoop.bio}</p>
                  <p>
                    Created on: {new Date(userLoop.createdAt).toDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
        {categories.length > 0 && (
          <div id="resultcategory" className="resultPageSection">
            <h2>Bins</h2>
            {categories.map((categoryLoop) => (
              <Link to={`/snippets-list/${categoryLoop._id}`}>
                <div className="resultCard" key={categoryLoop._id}>
                  <h3>{categoryLoop.name}</h3>
                  
                  <p>Created by: {categoryLoop.user.username}</p>
                  <p>{categoryLoop.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        {snippets.length > 0 && (
          <div id="resultsnippet" className="resultPageSection">
            <h2>Snippets</h2>
            {snippets.map((snippetLoop) => (
              <Link to={`/snippets-show/${snippetLoop._id}`}>
                <div className="resultCard" key={snippetLoop._id}>
                  <h3>{snippetLoop.title}</h3>
                  <p>{snippetLoop.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
