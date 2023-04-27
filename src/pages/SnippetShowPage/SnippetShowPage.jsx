import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import sendRequest from '../../utilities/send-request'
import hljs from 'highlight.js'

export default function SnippetShowPage({user}) {

    const {snipID} = useParams()

    const [snip, setSnip] = useState({})
    const [cat, setCat] = useState({})

    async function fetchSnip() {
        const response = await sendRequest(`/api/snippets/fetchOne/${snipID}`, 'GET')
        setSnip(response)
    }

    async function fetchCat() {
        if (!snip.category) return  
        const response = await sendRequest(`/api/categories/fetchOne/${snip.category}`, 'GET')
        setCat(response)
    }

    async function handleDelete() {
        const deleteSnip = await sendRequest(`/api/snippets/delete/${snip._id}`, 'DELETE')
        console.log(deleteSnip)
    }
    

    useEffect(() => {
       fetchSnip() 
    },[])

    useEffect(() => {
        fetchCat() 
     },[snip])

  return (
    <div className='mainContent'>
        <link rel="stylesheet" href="/path/to/styles/default.min.css"/>
        <script src="/path/to/highlight.min.js"></script>
        <script>hljs.highlightAll();</script>

        <h1>{snip.title}</h1>
        <div>
            <h3 style = {{color: 'var(--accentOrange'}}>Category</h3>
            <p>{cat.name}</p>
        </div>
        <h3 style = {{color: 'var(--accentOrange'}}>Code</h3>
        <div id="codeContainer" style = {{marginLeft: '18%', border: 'solid white 2px', borderRadius: '10px', padding: '10px', width: '50vw', overflow: 'scroll'}}>
            <pre style = {{textAlign: 'left'}}>
                <code>

                    {snip.body}
                </code>
            </pre>
        </div>
        <h3 style = {{color: 'var(--accentOrange'}}>Description</h3>
        <p>{snip.description}</p>
        {cat.user === user._id ? 
            <div>
                <Link to = {`/snippets-edit/${snip._id}`}><button>Edit</button></Link>
                <a href={`/snippets-list/${cat._id}`}><button onClick={handleDelete}>Delete</button></a>
            </div>
        :
        null
    }
        
    </div>
  )
}
