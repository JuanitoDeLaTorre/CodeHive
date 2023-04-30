import React, {useEffect, useState} from 'react'
import './CommunityPage.css'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import sendRequest from '../../utilities/send-request'
import ripple from '../../resources/ripple.svg'




export default function CommunityPage({user}) {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // const [allCats, setAllCats] = useState([])
    
    async function fetchAllForReal() {
        const returnObj = await sendRequest('/api/users/fetchForCommunityPage', 'GET')
        console.log(returnObj)
        setUsers(returnObj)
        setIsLoading(false)
      
      }

    useEffect(() => {
        fetchAllForReal()
      //get all profiles signed up for community feature  
    //   fetchAll()
    },[])


  return (
    <div className="mainContent">
        <h1 style = {{fontSize: "3em"}}>Our community is the  <span style = {{color: "var(--accentOrange)"}}>bee's knees!</span></h1>
        <hr style = {{border: "solid white 1px"}}/>
        {isLoading && 
          <img src={ripple} alt="" />
        }
        {users && <div id="communityContainer">
            {users.map(userLoop => <ProfileCard key = {userLoop._id} user = {userLoop}/>)}
        </div>}
    </div>
  )
}
