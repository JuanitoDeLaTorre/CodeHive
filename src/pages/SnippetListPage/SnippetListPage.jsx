import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import sendRequest from '../../utilities/send-request'
import SnippetCard from '../../components/SnippetCard/SnippetCard'

export default function SnippetListPage({user}) {

  const [allSnips, setAllSnips] = useState([])
  const [cat, setCat] = useState({})



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

  function checkLines() {
    allSnips.forEach((snippet) => {
      const lines = (snippet.body.match(/\n/g) || '').length + 1
      console.log("lines for " + snippet.title + " = " + lines)
      
    })
  }
  

  useEffect(() => {
    fetchCat()
  },[])

  useEffect(() => {
    fetchSnips()
  },[cat])

  return (
    <div className='mainContent'>
      <h1>{cat.name}</h1>
      {allSnips.map((snippet) => {
        return <>
          <SnippetCard key = {snippet._id} snippet = {snippet} user = {user}/> 
          <pre style = {{textAlign: 'left'}}>{snippet.body}</pre>
        </>
      })}
      <button onClick={checkLines}>CHECK LINES</button>
    </div>
  )
}