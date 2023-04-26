import React from 'react'
import { Link } from 'react-router-dom'
import sendRequest from '../../utilities/send-request'

export default function CategoryCard({cat}) {

    async function handleDelete() {
        console.log("FIRING!")
        const deleteCat = await sendRequest(`/api/categories/delete/${cat._id}`, 'DELETE')
    }
    

  return (
    <div className='categoryCard'>
        <h4>{cat.name}</h4>
        <p>{cat.description}</p>
        <p>Number of snippets: {cat.snips.length}</p>
        <a href = "/profile/Pablo"><button onClick={handleDelete}>DELETE CATEGORY</button></a>
    </div>
  )
}
