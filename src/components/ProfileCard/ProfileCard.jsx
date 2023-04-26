import React from 'react'
import { Link } from 'react-router-dom'
import hiveBadge from '../../resources/bee-hive (2).png'

export default function ProfileCard({user}) {

    const date = new Date(user.createdAt)
  return (
    <Link to = {`/profile/${user.username}`}>
        <div id = "profileCard">
        <img id = "hiveBadge" src={hiveBadge} alt="" />
        <div style = {{display: "flex", justifyContent: "left", gap: "5%"}}>
            <img id = "profilePicCard" src={user.profilePic} alt="" />
            <h4 style = {{fontWeight: "200", textAlign: "left", marginTop: "5px", marginBottom: "5px"}}>{user.username}</h4>
        </div>
        <p style = {{fontWeight: "200", textAlign: "left", fontSize: "0.7em", color: "rgb(201, 201, 201)"}}>User since {date.toDateString()}.</p> 
        <div style = {{display: "flex", justifyContent: "space-between", marginTop: "30px", marginBottom: "20px", alignItems: "center", fontSize: "0.9em"}}>
            <p>7 total snippets</p>
            <span style = {{fontSize: "2em"}}>/</span>
            <p>Top category: Python</p>
        </div>
        </div>
    </Link>
  )
}
