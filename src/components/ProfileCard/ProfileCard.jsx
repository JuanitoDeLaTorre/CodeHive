import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import hiveBadge from '../../resources/bee-hive (2).png'
import sendRequest from '../../utilities/send-request'

export default function ProfileCard({user}) {

    const [allCats, setAllCats] = useState([])
    const [numAllSnips, setNumAllSnips] = useState(0)
    const [mostPopular, setMostPopular] = useState([])

    async function fetchCategories () {
        // console.log(user)
        const allCats = await sendRequest(`/api/categories/fetchCats/${user._id}`, "GET")
        setAllCats(allCats)
    }

    async function getNumAllSnipsForUser() {
        let totalSnips = 0;
        let highest = 0;

        for(let i = 0; i < allCats.length; i++) {
            const currentCatNum = await sendRequest(`/api/snippets/fetchSnips/${allCats[i]._id}`, "GET")
            
                if(currentCatNum.length > highest) {
                    highest = currentCatNum.length
                    setMostPopular(allCats[i])
                }

                totalSnips += currentCatNum.length
            }
            setNumAllSnips(totalSnips)
        }
    

    useEffect(() => {
        fetchCategories()
    },[])

    useEffect(() => {
        getNumAllSnipsForUser()
    },[allCats])

    const date = new Date(user.createdAt)
  return (
    <Link to = {`/profile/${user.username}`}>
        <div id = "profileCard">
        <img id = "hiveBadge" src={hiveBadge} alt="" />
        <div style = {{display: "flex", justifyContent: "left", gap: "5%"}}>
            <img id = "profilePicCard" src={user.profilePic} alt="" />
            <h4 style = {{fontWeight: "200", textAlign: "left", marginTop: "5px", marginBottom: "5px"}}>{user.username}</h4>
        </div>
        <p style = {{fontWeight: "200", textAlign: "left", fontSize: "0.7em", color: "rgb(201, 201, 201)"}}>User since {date.toDateString()}.</p> 
        <div style = {{display: "flex", justifyContent: "space-between", marginTop: "30px", marginBottom: "20px", alignItems: "center", fontSize: "0.9em"}}>
            <p>{numAllSnips} total snippets</p>
            <span style = {{fontSize: "2em"}}>/</span>
            <p>Top category: {mostPopular.name}</p>
        </div>
        </div>
    </Link>
  )
}
