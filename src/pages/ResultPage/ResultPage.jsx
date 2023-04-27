import React from "react";

export default function ResultPage({ user, searchResults }) {
  console.log(searchResults);

  const { users } = searchResults;
  const { categories } = searchResults;
  const { snippets } = searchResults;


    const names = ['user', 'category', 'snippet']
    const values = [users, categories, snippets]

    for(let i = 0; i < names.length; i++) {
        console.log("The length of " + names[i] + " is " + values[i].length)
        if(!values[i].length) {
            console.log(values[i])
            // console.log(document.querySelector(`#results${names[i]}`))
            document.querySelector(`#result${names[i]}`).style.display = "none";

        }
    }
    

    //  users/categories/snippets + 
    //  users/!categories/!snippets + 
    //  users/categories/!snippets +
    //  !users/categories/snippets +
    //  !users/categories/!snippets + 
    //  !users/!categories/snippets +

   
  return (
    <div className="mainContent">
      <div className="resultContainer" style={{ display: "flex" , justifyContent: "center"}}>
        <div id = "resultuser" style={{width:'33%', border: 'solid red 2px'}}>
          <h2>Users</h2>
          <ul>
            {users.map((userLoop) => {
                return <li key = {userLoop._id}>{userLoop.username}</li>
            })}
            </ul>
        </div>
        <div id = "resultcategory" style={{width:'33%', border: 'solid red 2px'} }>
          <h2>Categories</h2>
          <ul>
            {categories.map((categoryLoop) => {
                return <li key = {categoryLoop._id}>{categoryLoop.name}</li>
            })}
            </ul>
        </div>
        <div id = "resultsnippet" style={{width:'33%', border: 'solid red 2px'}}>
          <h2>Snippets</h2>
          <ul>
            {snippets.map((snippetLoop) => {
                return <li key = {snippetLoop._id}>{snippetLoop.title}</li>
            })}
            </ul>
        </div>
      </div>
    </div>
  );
}
