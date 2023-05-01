import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import sendRequest from '../../utilities/send-request'
import SnippetCard from '../../components/SnippetCard/SnippetCard'

export default function SnippetListPage({user}) {

  const [allSnips, setAllSnips] = useState([])
  const [cat, setCat] = useState({})
  const [catUser, setCatUser] = useState({})



  const { catID } = useParams()
  console.log(catID)

  async function fetchSnips() {
    const allSnips = await sendRequest(`/api/snippets/fetchSnipsForCat/${catID}`, 'GET')
    setAllSnips(allSnips)
  }

  async function fetchCat() {
    const returnCat = await sendRequest(`/api/categories/fetchOne/${catID}`, 'GET')
    setCat(returnCat)
  }

  async function fetchUser() {
    const returnUser = await sendRequest(`/api/users/fetchOneById/${cat.user}`, 'GET')
    console.log(returnUser)
    setCatUser(returnUser)
  }
  

  useEffect(() => {
    fetchCat()
  },[])

  useEffect(() => {
    fetchSnips()
    fetchUser()
  },[cat])

  return (
    <div className='mainContent'>
      <h1>{cat.name}</h1>
      <h4>Created by <span style = {{color: 'var(--accentOrange)'}}>{catUser.username}</span></h4>
      {cat.user === user._id ? <Link to = {`/addSnippetForm/${catID}`}><div className="orangeButton">ADD SNIPPET</div> </Link>: null}
      <div style = {{display: 'flex', flexWrap: 'wrap'}}>
        {allSnips.map((snippet) => {
          return <SnippetCard key = {snippet._id} snippet = {snippet} user = {user}/> 
        })}
      </div>
      {allSnips.length === 0 ? 
      <>
        <hr />
        <h3>Hmm...looks like you haven't added snippets to this bin yet! </h3>
        <h3>Click the above button to add some! 👆</h3>
      </>
      : null}
    </div>
  )
}
