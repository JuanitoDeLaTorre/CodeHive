import React from 'react'
import hiveBadge from '../../resources/bee-hive (2).png'

export default function ProfileCard({user}) {
  return (
    <div id = "profileCard">
      <img id = "hiveBadge" src={hiveBadge} alt="" />
      <h4 style = {{fontWeight: "200", textAlign: "left", marginTop: "5px", marginBottom: "5px"}}>JP Haddad</h4> 
      <p style = {{fontWeight: "200", textAlign: "left", fontSize: "0.7em", color: "rgb(201, 201, 201)"}}>User since April, 24th, 2023.</p> 
      <div style = {{display: "flex", justifyContent: "space-between", marginTop: "30px", marginBottom: "20px", alignItems: "center", fontSize: "0.9em"}}>
        <p>7 total snippets</p>
        <span style = {{fontSize: "2em"}}>/</span>
        <p>Top category: Python</p>
      </div>
    </div>
  )
}
