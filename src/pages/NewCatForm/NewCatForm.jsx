import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

import sendRequest from '../../utilities/send-request';

export default function NewCatForm({user}) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

async function handleSubmit (e){
  e.preventDefault();

    console.log("firing")
  const data = {
    name,
    description,
    user: user._id
  };


  const newCat = await sendRequest('/api/categories/create', 'POST', data)
  console.log(newCat);
  const cancel = document.querySelector('#cancel');
//   cancel.click();

  navigate(`/profile/${user.username}`)


};


return (
    <div className="mainContent">
            <h1 id = "success" style = {{opacity: "0"}}>SUCCESS!</h1>
            <form onSubmit = {handleSubmit} id = "newCatForm">
                <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
            <Link to = {`/profile/${user.username}`}><button id = "cancel">Cancel</button></Link>
    </div>
        
);
}
