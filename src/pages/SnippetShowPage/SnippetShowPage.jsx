import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import sendRequest from '../../utilities/send-request'
import './SnippetShowPage.css'
// import hljs from 'highlight.js'

export default function SnippetShowPage({user}) {

    let hljs = require('highlight.js/lib/common');
    const navigate = useNavigate()

    const {snipID} = useParams()

    const [snip, setSnip] = useState({})
    const [cat, setCat] = useState({})
    const [catsForUser, setCatsForUser] = useState([])
    const [destinationCat, setDestinationCat] = useState('')
    const [copied, setCopied] = useState(false)

    async function fetchSnip() {
        const response = await sendRequest(`/api/snippets/fetchOne/${snipID}`, 'GET')
        setSnip(response)
    }

    async function fetchCat() {
        if (!snip.category) return  
        const response = await sendRequest(`/api/categories/fetchOne/${snip.category}`, 'GET')
        setCat(response)
    }

    async function fetchCatsForUser() {
        const cats = await sendRequest(`/api/categories/fetchCats/${user._id}`, 'GET')
        setCatsForUser(cats)
        setDestinationCat(cats[0]._id)
    }

    async function handleDelete() {
        const deleteSnip = await sendRequest(`/api/snippets/delete/${snip._id}`, 'DELETE')
        console.log(deleteSnip)
    }

    function copyCode() {
        navigator.clipboard.writeText(snip.body)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    async function handleAddToBin(e) {
        e.preventDefault()
        const copySnip = await sendRequest(`/api/snippets/copy/${destinationCat}/${snip._id}`, 'POST')
        console.log(copySnip)
        navigate(`/profile/${user.username}`)
    }

    function showForm() {
        document.querySelector('#copyForm').style.display = 'flex'
        document.querySelector('#showButton').style.display = 'none'
    }
        

    useEffect(() => {
        hljs.highlightAll();
      },[]);
    

    useEffect(() => {
       fetchCatsForUser()
       fetchSnip() 
    },[])

    useEffect(() => {
        fetchCat() 
     },[snip])

  return (
    <div className='mainContent'>
        <link rel="stylesheet" href="/path/to/styles/default.min.css"/>
        <script src="/path/to/highlight.min.js"></script>

        <h1>{snip.title}</h1>
        <div>
            <h3 style = {{color: 'var(--accentOrange'}}>Category</h3>
            <p><Link to = {`/snippets-list/${cat._id}`}>{cat.name}</Link></p>
        </div>
        <h3 style = {{color: 'var(--accentOrange'}}>Code</h3>
        <div id="codeContainer" style = {{marginLeft: '18%', border: 'solid white 2px', borderRadius: '10px', padding: '10px', width: '50vw', overflow: 'scroll'}}>
            <pre style = {{textAlign: 'left'}}>
                <code id = "codeBox" className='language-javascript' customStyle = {{backgroundColor: 'transparent'}}>

                    {snip.body}
                </code>
            </pre>
        {!copied ? 
        <div onClick={copyCode} className="orangeButton" style = {{marginRight: '4%'}}>📋 Copy Code</div>
        :
        <div onClick={copyCode} className="orangeButton" style = {{marginRight: '4%'}}>✔ Copied!</div>}
        </div>
        <div>
            <h3 style = {{color: 'var(--accentOrange'}}>Description</h3>
            <p>{snip.description}</p>
        </div>
        {cat.user === user._id ? 
            <div style = {{display: 'flex', justifyContent: 'center', gap: '2px'}}>
                {/* <Link to = {`/snippets-edit/${snip._id}`}><button>Edit</button></Link>
                <a href={`/snippets-list/${cat._id}`}><button onClick={handleDelete}>Delete</button></a> */}

                <Link to = {`/snippets-edit/${snip._id}`}><div className="orangeButton">Edit Snippet</div></Link>
                <a href={`/snippets-list/${cat._id}`}><div onClick = {handleDelete} className="orangeButton">Delete Snippet</div></a>

            </div>
        :
        <div className="orangeButton" id = "showButton" onClick = {showForm}>Add To My Bins</div>
    }
        <form id = "copyForm" action="" style = {{display: 'none', justifyContent: 'center', gap: '2px', alignItems: 'center'}}>
            <select
                id="category"
                value={destinationCat}
                onChange={(e) => setDestinationCat(e.target.value)}
                
                >
                {catsForUser.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>  
                ))}
            </select>
            <div className="orangeButton" onClick={handleAddToBin}>Add</div>
        </form>

    </div>
  )
}
