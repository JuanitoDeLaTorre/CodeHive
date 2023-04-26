import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import './ProfilePage.css'
import sendRequest from '../../utilities/send-request'


export default function Profile() {

  const [allSnips, setAllSnips] = useState([])

  const profileID = useParams().name;
  console.log(profileID)

  async function getAllSnips() {
    const allSnipsRes = await sendRequest(`api/snippets/fetchSnipsForUser/${profileID}`)
  }

  useEffect(() => {
      
  })

  return (
    <div class = "mainContent">
        <h1 style = {{fontSize: "3em"}}>Your <span style = {{color: "var(--accentOrange"}}>Bins</span></h1>
    </div>
  )
}
