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
    <div className="mainContent">
      <div className="resultPageContainer">
        {users.length > 0 && (
          <div id="resultuser" className="resultPageSection">
            <h2>Users</h2>
            {users.map((userLoop) => (
              <div className="resultCard" key={userLoop._id}>
                <h3>{userLoop.username}</h3>
                <p>{userLoop.bio}</p>
                <p>
                  Created on: {new Date(userLoop.createdAt).toDateString()}
                </p>
                {user ? (
                  <Link to={`/profile/${userLoop.username}`}>View profile</Link>
                ) : (
                  <span>View profile</span>
                )}
              </div>
            ))}
          </div>
        )}
        {categories.length > 0 && (
          <div id="resultcategory" className="resultPageSection">
            <h2>Bins</h2>
            {categories.map((categoryLoop) => (
              <div className="resultCard" key={categoryLoop._id}>
                <h3>{categoryLoop.name}</h3>
                <p>Created by: {categoryLoop.user.username}</p>
                <p>{categoryLoop.description}</p>
                {user ? (
                  <Link to={`/snippets-list/${categoryLoop._id}`}>View snippets</Link>
                ) : (
                  <span>View snippets</span>
                )}
              </div>
            ))}
          </div>
        )}
        {snippets.length > 0 && (
          <div id="resultsnippet" className="resultPageSection">
            <h2>Snippets</h2>
            {snippets.map((snippetLoop) => (
              <div className="resultCard" key={snippetLoop._id}>
                <h3>{snippetLoop.title}</h3>
                <p>{snippetLoop.description}</p>
                {user ? (
                  <Link to={`/snippets-show/${snippetLoop._id}`}>View snippet</Link>
                ) : (
                  <span>View snippet</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
