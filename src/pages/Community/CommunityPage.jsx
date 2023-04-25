import React, {useEffect, useState} from 'react'
import './CommunityPage.css'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import sendRequest from '../../utilities/send-request'


export default function CommunityPage({user}) {

    const [users, setUsers] = useState([])
    const [allCats, setAllCats] = useState([])

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
    }

    async function testFetchCategories () {
        // console.log(user)
        const allCats = await sendRequest(`/api/categories/fetchCats/${user._id}`, "GET")
        setAllCats(allCats)
    }

    async function getNumAllSnipsForUser() {
        let totalSnips = 0;
        let mostPopular = {}

        for(let i = 0; i < allCats.length; i++) {
            const currentCatNum = await sendRequest(`/api/snippets/fetchSnips/${allCats[i]._id}`, "GET")
            
            totalSnips += currentCatNum.length
        }
        console.log(totalSnips)
    }

    async function returnAllSnipsForUser() {
        let allSnips = await sendRequest(`/api/snippets/fetchSnipsForUser/${user._id}`, "GET")
        console.log(allSnips)
    }


  return (
    <div className="mainContent">
        <h1 style = {{fontSize: "3em"}}>See what's <span style = {{color: "var(--accentOrange)"}}>buzzing...</span></h1>
        <hr style = {{border: "solid white 1px"}}/>
        <div id="communityContainer">
            {users.map(userLoop => <ProfileCard key = {userLoop._id} user = {userLoop}/>)}
        </div>
        <button onClick={testAddSnippet}>TEST ADD SNIPPET</button>
        <button onClick={testRemoveSnippet}>REMOVE SNIPPET</button>
        <button onClick={testFetchCategories}>FETCH ALL CATEGORIES</button>
        <button onClick={getNumAllSnipsForUser}>GET NUM OF SNIPPETS FOR USER</button>
        <button onClick={returnAllSnipsForUser}>GET ALL SNIPPETS FOR USER</button>
    </div>
  )
}
