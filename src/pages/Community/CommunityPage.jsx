import React, {useEffect} from 'react'
import './CommunityPage.css'
import ProfileCard from '../../components/ProfileCard/ProfileCard'

export default function CommunityPage() {

    const users = []

    useEffect(() => {
      //get all profiles signed up for community feature  
    },[])

  return (
    <div className="mainContent">
        <h1 style = {{fontSize: "3em"}}>See what's <span style = {{color: "var(--accentOrange)"}}>buzzing...</span></h1>
        <hr style = {{border: "solid white 1px"}}/>
        <div id="communityContainer">
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
        </div>
    </div>
  )
}