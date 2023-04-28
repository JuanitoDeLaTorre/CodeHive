import React, {useEffect, useState} from 'react'
import './CommunityPage.css'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import sendRequest from '../../utilities/send-request'


export default function CommunityPage({user}) {

    const [users, setUsers, isLoading] = useState([])
    // const [allCats, setAllCats] = useState([])
    
    async function fetchAllForReal() {
        const returnObj = await sendRequest('/api/users/fetchForCommunityPage', 'GET')
        console.log(returnObj)
        setUsers(returnObj)
      }

    useEffect(() => {
        fetchAllForReal()
      //get all profiles signed up for community feature  
    //   fetchAll()
    },[])


  return ( isLoading ? <p>ALO</p> :
    <div className="mainContent">
        <h1 style = {{fontSize: "3em"}}>See what's <span style = {{color: "var(--accentOrange)"}}>buzzing...</span></h1>
        <hr style = {{border: "solid white 1px"}}/>
        <div id="communityContainer">
            {users.map(userLoop => <ProfileCard key = {userLoop._id} user = {userLoop}/>)}
        </div>
    </div>
  )
}
