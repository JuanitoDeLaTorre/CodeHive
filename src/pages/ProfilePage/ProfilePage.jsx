import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import './ProfilePage.css'
import sendRequest from '../../utilities/send-request'


export default function Profile() {

  const [allSnips, setAllSnips] = useState([])
  const [allSnipsIndividual, setAllSnipsIndividual] = useState([])
  const [userID, setUserID] = useState('')

  const profileID = useParams().name;
  console.log(profileID)

  async function getUserID() {
    setUserID(userID._id)
  
  }

  async function getAllSnips() {
    console.log("firing")
    const allSnipsRes = await sendRequest(`/api/snippets/fetchSnipsForUser/${profileID}`, 'GET')
    setAllSnips(allSnipsRes)

    for(let i = 0; i < allSnips.length; i++) {
      for(let j = 0; j < allSnips[i].snips.length; j++) {
        setAllSnipsIndividual(current => [...current, allSnips[i].snips[j]])
    }
  }
}

  useEffect(() => {
      // getUserID()
      setAllSnips([])
      setAllSnipsIndividual([])
      getAllSnips()
  },[])

  return (
    <div class = "mainContent">
        <h1 style = {{fontSize: "3em"}}>Your <span style = {{color: "var(--accentOrange"}}>Bins</span></h1>
        <ul>
          {allSnips.map((cat) => {
            return <li key = {cat._id}>{cat.name}</li>
          })}
        </ul>
    </div>
  )
}
