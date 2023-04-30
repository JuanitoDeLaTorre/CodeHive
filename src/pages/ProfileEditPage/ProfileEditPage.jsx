import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import sendRequest from '../../utilities/send-request'

export default function ProfileEditPage({user}) {

    const [profilePic, setProfilePic] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [communityPref, setCommunityPref] = useState(true)

    const [userChange, setUserChange] = useState(user)

    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()

        const updateUser = await sendRequest(`api/users/update/${user._id}`, 'PUT', 
        userChange,
        )
        console.log(updateUser)

        // navigate(`/profile/${user.username}`)
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setUserChange({
          ...userChange,
          [e.target.name]: value,
        });
      };

      const handleChangeBox = (e) => {
        const value = userChange['communityPref'];
        setUserChange({...userChange, communityPref: !value})
      };

    useEffect(() => {
     setUserChange(user)
    },[])


  return (
    <div className = "mainContent">
        <h1>Edit Profile for <span style = {{color: 'var(--accentOrange)'}}>{user.username}</span></h1>
        <form onSubmit={handleSubmit} id="newCatForm" className="catForm">
        <div>
          <p>Name</p>
          <input
            type="text"
            id="name"
            name='username'
            value={userChange.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Email</p>
          <input
            id="email"
            name='email'
            value={userChange.email}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <p>Community Opt-in</p>
          {userChange.communityPref ? <p style = {{color: 'green', fontSize: '0.7em'}}>Yes, I consent to having my code snippets displayed on the community page.</p> : <p style = {{color: "rgb(241, 80, 80)", fontSize: '0.7em'}}>No, I do not consent to having my code snippets displayed on the community page.</p>}
          {userChange.communityPref ? 
          <input
            type='checkbox'
            id="checkbox"
            name = "communityPref"
            value={userChange.communityPref}
            onChange={handleChangeBox}
            checked
          ></input>
          :
          <input
            type='checkbox'
            id="checkbox"
            name = "communityPref"
            value={userChange.communityPref}
            onChange={handleChangeBox}
          ></input>}
        </div>
        
        <div>
          <p>Profile Picture URL</p>
          <input
            id="profilePicURL"
            name = "profilePic"
            value={userChange.profilePic}
            onChange={handleChange}
          ></input>
        <p>(Preview)</p>
        <img src={userChange.profilePic} id = "profilePicCard" style = {{transform: 'scale(5)', margin: '70px'}} alt="" />
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
  )
}
