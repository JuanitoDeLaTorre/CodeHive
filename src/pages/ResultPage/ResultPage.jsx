import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ResultPage.css";

export default function ResultPage({ user, searchResults }) {
  const { users = [], categories = [], snippets = [] } = searchResults;

  useEffect(() => {
    const hideEmptyResults = (name, value) => {
      const resultElement = document.querySelector(`#result${name}`);
      if (value.length === 0 && resultElement) {
        resultElement.style.display = "none";
      }
    };

    hideEmptyResults("user", users);
    hideEmptyResults("category", categories);
    hideEmptyResults("snippet", snippets);
  }, [users, categories, snippets]);

  return (
    <div className="resultMainContent">
      <div className="resultPageContainer">
        {users.length > 0 && (
          <div id="resultuser" className="resultPageSection">
            <h2>Users</h2>
            <ul>
              {users.map((userLoop) => (
                <li key={userLoop._id}>
                  <Link to={`/profile/${userLoop.username}`}>
                    {userLoop.username}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {categories.length > 0 && (
          <div id="resultcategory" className="resultPageSection">
            <h2>Categories</h2>
            <ul>
              {categories.map((categoryLoop) => (
                <li key={categoryLoop._id}>
                  <Link to={`/snippets-list/${categoryLoop._id}`}>
                    {categoryLoop.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {snippets.length > 0 && (
          <div id="resultsnippet" className="resultPageSection">
            <h2>Snippets</h2>
            <ul>
              {snippets.map((snippetLoop) => (
                <li key={snippetLoop._id}>
                  <Link to={`/snippets-show/${snippetLoop._id}`}>
                    {snippetLoop.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
