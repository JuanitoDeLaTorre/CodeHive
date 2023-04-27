import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import './ProfilePage.css'
import sendRequest from '../../utilities/send-request'
import CategoryCard from '../../components/CategoryCard/CategoryCard'


export default function Profile({user}) {

  const [allSnips, setAllSnips] = useState([])
  const [allSnipsIndividual, setAllSnipsIndividual] = useState([])
  const [userProfile, setUserProfile] = useState({})

  const profileName = useParams().name;

  async function getUserProfile() {
    if(!profileName) return
    const returnUser = await sendRequest(`/api/users/fetchOneUser/${profileName}`, 'GET')
    setUserProfile(returnUser)
  
  }

  async function getAllSnips() {
    let id = userProfile._id
    
    if(!userProfile._id) return

    const allSnipsRes = await sendRequest(`/api/snippets/fetchSnipsForUser/${id}`, 'GET')
    setAllSnips(() => {return allSnipsRes})

}

function fillAllSnips() {
  if(allSnips.length == 0) return

  for(let i = 0; i < allSnips.length; i++) {
    for(let j = 0; j < allSnips[i].snips.length; j++) {
      setAllSnipsIndividual(current => [...current, allSnips[i].snips[j]])
  }
}
}

  useEffect(() => {
      getUserProfile()
      setAllSnips([])
      setAllSnipsIndividual([])
  },[])

  useEffect(() => {
    getAllSnips()
  },[userProfile])

  useEffect(() => {
    fillAllSnips()
  },[allSnips])

  return (
    <div className = "mainContent">
        <h1 style = {{fontSize: "3em"}}>Your <span style = {{color: "var(--accentOrange"}}>Bins</span></h1>
        {/* <Link to "/addCatForm"><button>ADD BIN!</button></Link> */}
        {profileName === user.username ? 
          <Link to = "/addCatForm"><button>ADD BIN!</button></Link>
        :
        null
      }
        <div className="categoryContainer">
            {allSnips.map((cat) => {
              // return <li key = {cat._id}>{cat.name}</li>
              return <CategoryCard key = {cat._id} cat={cat}/>
            })}
        </div>
    </div>
  )
}
