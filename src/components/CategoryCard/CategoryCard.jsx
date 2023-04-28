import React from 'react'
import { Link } from 'react-router-dom'
import sendRequest from '../../utilities/send-request'

export default function CategoryCard({cat, user, profileName}) {

    async function handleDelete(e) {
        e.preventDefault()
        const deleteCat = await sendRequest(`/api/categories/delete/${cat._id}`, 'DELETE')
        window.location.replace(`/profile/${user.username}`);
    }    


  return (
    <Link to = {`/snippets-list/${cat._id}`}>
        <div className='categoryCard'>
            <h4>{cat.name}</h4>
            <p>{cat.description}</p>
            <p>Number of snippets: {cat.snips.length}</p>
            {profileName === user.username ?
                <div style = {{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                    <Link to = {`/bins-edit/${cat._id}`}><button>EDIT</button></Link>
                    <button onClick={handleDelete}>DELETE </button>
                </div>
                :
                null}
        </div>
    </Link>
  )
}
