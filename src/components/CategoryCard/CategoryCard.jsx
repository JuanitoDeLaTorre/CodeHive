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
            <h4 style = {{margin: '4%'}}>-{cat.name}-</h4>
            <hr style = {{margin: '0'}}/>
            <p>{cat.description}</p>
            <p># of snippets: {cat.snips.length}</p>
            {profileName === user.username ?
                <div >
                    <Link to = {`/bins-edit/${cat._id}`}><button className='orangeButton'>EDIT</button></Link>
                    <button className='orangeButton' onClick={handleDelete}>DELETE </button>
                </div>
                :
                null}
        </div>
    </Link>
  )
}
