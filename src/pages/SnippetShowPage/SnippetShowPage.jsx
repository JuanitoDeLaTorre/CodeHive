import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import sendRequest from '../../utilities/send-request'

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
    

    useEffect(() => {
       fetchSnip() 
    },[])

    useEffect(() => {
        fetchCat() 
     },[snip])

  return (
    <div className='mainContent'>
        <h1>{snip.title}</h1>
        <div>
            <h3 style = {{color: 'var(--accentOrange'}}>Category</h3>
            <p>{cat.name}</p>
        </div>
        <h3 style = {{color: 'var(--accentOrange'}}>Code</h3>
        <div id="codeContainer" style = {{marginLeft: '29%', border: 'solid white 2px', borderRadius: '10px', padding: '10px', width: '30vw'}}>
            <pre style = {{textAlign: 'left'}}>
                {snip.body}
            </pre>
        </div>
        <h3 style = {{color: 'var(--accentOrange'}}>Description</h3>
        <p>{snip.description}</p>
    </div>
  )
}
