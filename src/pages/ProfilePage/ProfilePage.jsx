import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Profile() {

  const {name} = useParams();
  console.log(name)

  return (
    <div class = "mainContent">
        <h1 style = {{fontSize: "3em"}}>Your <span style = {{color: "var(--accentOrange"}}>Bins</span></h1>
    </div>
  )
}
