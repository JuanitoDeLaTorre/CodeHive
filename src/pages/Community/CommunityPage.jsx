import React, {useEffect, useState} from 'react'
import './CommunityPage.css'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import sendRequest from '../../utilities/send-request'

export default function CommunityPage() {

    const [users, setUsers] = useState([])

    useEffect(() => {
      //get all profiles signed up for community feature  
      fetchAll()
    },[])

    async function fetchAll () {
        setUsers([])
        const allUsers = await sendRequest('/api/users/fetchUsers')
        setUsers(allUsers)
    }

    function testAddSnippet () {
        const newSnippet = sendRequest('/api/snippets/create', 'POST', 
        {
            title: "Test Snippet",
            category: "6446cfefd3e2eb74cdbbf097",
            body: "This is a test snippet",
            description: "This is used to sort through an array of objects and output the best one."
        }
        
        )
    }

    function testRemoveSnippet () {
        const removeSnippet = sendRequest('/api/snippets/delete/64480a595fa0670b1c4400c4', 'DELETE')
        console.log(removeSnippet)
    }

  return (
    <div className="mainContent">
        <h1 style = {{fontSize: "3em"}}>See what's <span style = {{color: "var(--accentOrange)"}}>buzzing...</span></h1>
        <hr style = {{border: "solid white 1px"}}/>
        <div id="communityContainer">
            {users.map(user => <ProfileCard key = {user._id} user = {user}/>)}
        </div>
        <button onClick={testAddSnippet}>TEST ADD SNIPPET</button>
        <button onClick={testRemoveSnippet}>REMOVE SNIPPET</button>
    </div>
  )
}
