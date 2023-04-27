import React from "react";

export default function ResultPage({ user, searchResults }) {
  console.log(searchResults);

  const { users } = searchResults;
  const { categories } = searchResults;
  const { snippets } = searchResults;

  return (
    <div className="mainContent">
      <div className="resultContainer" style={{ display: "flex" }}>
        <div style={{width:'33%', border: 'solid red 2px'}}>
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              (( )
              </ul>
        </div>
        <div style={{width:'33%', border: 'solid red 2px'} }>
          <h2>Categories</h2>
        </div>
        <div style={{width:'33%', border: 'solid red 2px'}}>
          <h2>Snippets</h2>
        </div>
      </div>
    </div>
  );
}
